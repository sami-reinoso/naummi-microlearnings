import { atom, read, update } from 'claude-code'
import type { Atom, EngineInterface, Register } from 'claude-code'

import type { Creating, Exam, Pass, Progress, Settings, Sync, View } from '../types'
import { GEN_SYSTEM, buildCustomRoutes, cleanCustomList } from './custom'
import { FOX as FOX_IMG, FOX_BOX, PLANT, PLANT_BOX } from './fox-art'
import { INTER_FACES } from './inter-font'
import { PRESETS, PROJECT_FILE, loadBrand, loadProject, paletteCss } from './brand'
import type { Brand, BrandOptions } from './brand'
import { CUSTOM, DEFAULT_ROUTE, LEVEL_NAMES, TOPICS, allRoutes, prerequisite, routeById, searchRoutes, trackName } from './routes'
import type { Route } from './routes'
import { AREAS, FAMILIES, caminoById } from './caminos'
import type { Camino } from './caminos'

// La página publicada guarda el progreso en tu espacio privado de esta base.
const ARTIFACT = 'https://claude.ai/artifact/SYzMTGDceMDtrVZ9EkygWS'
const COLLECTION = 'data/users/me'
const SETTINGS_DOC = 'microdosis-ajustes'
const CUSTOM_DOC = 'microdosis-mis-rutas'
// Certificados: colección compartida de la página, legible para quien verifique un código.
const CERTS = 'certificados'
const PASS_RATIO = 0.75
const PANE = 'microdosis'

// La ruta variada usa el mismo documento que la página publicada.
const docOf = (routeId: string) => (routeId === 'variado' ? 'microdosis' : `microdosis-${routeId}`)

const EMPTY: Progress = { cur: 0, done: {}, ans: {}, at: 0 }
const START: Settings = { active: DEFAULT_ROUTE, shown: [DEFAULT_ROUTE], at: 0 }

const byRoute = atom({ plugin: 'microdosis', key: 'byRoute' } as const, {} as Record<string, Progress>)
const settings = atom({ plugin: 'microdosis', key: 'prefs' } as const, START) as unknown as Atom<Settings>
const sync = atom({ plugin: 'microdosis', key: 'sync' } as const, 'cargando' as Sync)
const view = atom({ plugin: 'microdosis', key: 'view' } as const, 'paso' as View)
const query = atom({ plugin: 'microdosis', key: 'query' } as const, '')
const expanded = atom({ plugin: 'microdosis', key: 'expanded' } as const, {} as Record<string, string>)
const creating = atom({ plugin: 'microdosis', key: 'creating' } as const, null as Creating | null) as unknown as Atom<Creating | null>
// Cambia cuando cambian las rutas propias, para redibujar el panel.
const customCount = atom({ plugin: 'microdosis', key: 'customCount' } as const, 0)
const exam = atom({ plugin: 'microdosis', key: 'exam' } as const, null as Exam | null) as unknown as Atom<Exam | null>

// Marca: logo, nombre y sistema de diseño, inyectables desde la configuración del mod (ver brand.ts).
// Hasta que se lee la configuración, el sistema de Claude.
let brand: Brand = { ...PRESETS.claude!, messages: {}, routes: [], warnings: [] }
// Cambia cuando se carga la marca, para redibujar el panel.
const brandRev = atom({ plugin: 'microdosis', key: 'brandRev' } as const, 0)
// Tarjetas destacadas del panel: borde de acento y, si el sistema lo trae, fondo teñido.
const highlight = () => ({ borderColor: brand.theme.panelAccent, ...(brand.theme.panelTint ? { backgroundColor: brand.theme.panelTint } : {}) })
// Mensajes: los del proyecto si los trae; si no, los de la mascota; sin mascota, neutros.
const cheer = {
  finished: () => brand.messages.finished ?? (brand.mascot ? `¡Ruta terminada! ${brand.mascot} está feliz.` : '¡Ruta terminada!'),
  right: () => brand.messages.correct ?? (brand.mascot ? `¡Bien! ${brand.mascot} está orgulloso.` : '¡Bien!'),
  wrong: (answer: string) => (brand.messages.wrong ?? 'Casi. Era «{respuesta}».').replace(/\{respuesta\}/g, answer),
  creating: () =>
    brand.messages.creating ??
    `${brand.mascot ? `${brand.mascot} está armando` : 'Se están armando'} tres niveles con paradas y examen. Tarda alrededor de un minuto; podés seguir usando Claude mientras tanto.`,
}
// Rutas por defecto del proyecto, ya validadas. La primera es la que se abre.
let projectRoutes: string[] = []
const startRoute = () => projectRoutes[0] ?? DEFAULT_ROUTE

// «vue» se entiende como el primer nivel de la pista, «vue-1».
function resolveRoute(ref: string): string | null {
  const all = allRoutes()
  const exact = all.find(r => r.id === ref)
  if (exact) return exact.id
  const track = all.filter(r => r.track === ref || (r.trackName ?? '').toLowerCase() === ref.toLowerCase()).sort((a, b) => (a.level ?? 0) - (b.level ?? 0))
  return track[0]?.id ?? null
}

// Suma al panel las rutas del proyecto y, si la ruta activa no es una de ellas, abre la primera.
// No se sube a la nube: es la vista de este proyecto, no un cambio de la persona.
async function applyProjectRoutes($: EngineInterface) {
  const ids: string[] = []
  const unknown: string[] = []
  for (const ref of brand.routes) {
    const id = resolveRoute(ref)
    if (!id) unknown.push(ref)
    else if (!ids.includes(id)) ids.push(id)
  }
  if (unknown.length) $.ui.toast(`Microdosis: ${PROJECT_FILE} nombra rutas que no existen: ${unknown.join(', ')}`)
  projectRoutes = ids
  if (!ids.length) return
  await update($, settings, s => ({
    ...s,
    shown: [...ids, ...s.shown.filter(x => !ids.includes(x))],
    active: ids.includes(s.active) ? s.active : ids[0]!,
  }))
  await showStatus($)
}

const versions: Record<string, number> = {}
let chain: Promise<unknown> = Promise.resolve()

const countDone = (p: Progress) => Object.values(p.done).filter(Boolean).length

function mergeProgress(a: Progress, b: Progress, size: number): Progress {
  const newer = (b.at ?? 0) > (a.at ?? 0) ? b : a
  return {
    cur: Math.min(size - 1, Math.max(0, newer.cur ?? 0)),
    done: { ...a.done, ...b.done },
    ans: { ...b.ans, ...a.ans },
    at: Math.max(a.at ?? 0, b.at ?? 0),
  }
}

function cleanProgress(raw: unknown): Progress | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  return {
    cur: typeof r.cur === 'number' ? r.cur : 0,
    done: (r.done && typeof r.done === 'object' ? r.done : {}) as Record<string, boolean>,
    ans: (r.ans && typeof r.ans === 'object' ? r.ans : {}) as Record<string, number>,
    at: typeof r.at === 'number' ? r.at : 0,
  }
}

function cleanSettings(raw: unknown): Settings | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const known = new Set(allRoutes().map(x => x.id))
  const shown = Array.isArray(r.shown) ? r.shown.filter((x): x is string => typeof x === 'string' && known.has(x)) : []
  const active = typeof r.active === 'string' && known.has(r.active) ? r.active : DEFAULT_ROUTE
  const obj = (v: unknown) => (v && typeof v === 'object' ? v : {})
  return {
    active,
    shown: shown.length ? shown : [active],
    at: typeof r.at === 'number' ? r.at : 0,
    passes: obj(r.passes) as Record<string, Pass>,
    attempts: obj(r.attempts) as Record<string, number>,
    certName: typeof r.certName === 'string' ? r.certName : '',
    welcomed: r.welcomed === true,
    ...(typeof r.path === 'string' && caminoById(r.path) ? { path: r.path } : {}),
  }
}

async function progressOf($: EngineInterface, routeId: string): Promise<Progress> {
  return (await read($, byRoute))[routeId] ?? EMPTY
}

// --- Nube: la misma base que usa la página, a través de la herramienta ArtifactData.

async function pull($: EngineInterface): Promise<Record<string, unknown>> {
  const r = await $.tool.call({ tool: 'ArtifactData', action: 'list', url: ARTIFACT, collection: COLLECTION })
  if (r.deny || r.isError) throw new Error(r.deny ?? r.text ?? 'sin acceso')
  const rows: Record<string, unknown> = {}
  for (const line of String(r.text ?? '').split('\n')) {
    if (!line.startsWith('{"id":"microdosis')) continue
    const row = JSON.parse(line) as { id: string; data?: unknown; version?: number }
    rows[row.id] = row.data
    if (typeof row.version === 'number') versions[row.id] = row.version
  }
  return rows
}

async function push($: EngineInterface, doc: string, data: Record<string, unknown>): Promise<void> {
  const call = () =>
    $.tool.call({
      tool: 'ArtifactData', action: 'set', url: ARTIFACT, collection: COLLECTION, doc_id: doc, data,
      ...(versions[doc] ? { if_version: versions[doc] } : {}),
    })
  let r = await call()
  let text = String(r.text ?? '')
  if (r.isError || r.deny || !/committed/.test(text)) {
    // Otra pantalla guardó antes: refrescar la versión y reintentar una vez.
    await pull($)
    r = await call()
    text = String(r.text ?? '')
    if (r.isError || r.deny || !/committed/.test(text)) throw new Error(text || 'no se pudo guardar')
  }
  const m = text.match(/version (\d+)/)
  if (m) versions[doc] = Number(m[1])
}

// Guarda en esta compu y, si hay conexión, en claude.ai. `what` es una ruta o 'ajustes'.
function save($: EngineInterface, what: string) {
  chain = chain
    .then(async () => {
      if (what === 'mis-rutas') {
        await $.store.set('custom-routes', CUSTOM)
        if ((await read($, sync)) === 'local') return
        await push($, CUSTOM_DOC, { routes: CUSTOM, at: Date.now() })
        await update($, sync, () => 'nube' as Sync)
        return
      }
      const isSettings = what === 'ajustes'
      const data = isSettings ? await read($, settings) : await progressOf($, what)
      await $.store.set(isSettings ? 'settings' : `route:${what}`, data)
      await showStatus($)
      if ((await read($, sync)) === 'local') return
      await push($, isSettings ? SETTINGS_DOC : docOf(what), { ...data })
      await update($, sync, () => 'nube' as Sync)
    })
    .catch(async () => {
      await update($, sync, () => 'local' as Sync)
    })
  return chain
}

function setCustom(list: Route[]) {
  CUSTOM.splice(0, CUSTOM.length, ...list)
}

async function load($: EngineInterface) {
  // 0) Rutas propias primero: los ajustes pueden apuntar a una de ellas.
  setCustom(cleanCustomList(await $.store.get('custom-routes')))
  await update($, customCount, () => CUSTOM.length)
  // 1) Lo guardado en esta compu (la versión 0.1 guardaba la ruta variada como 'progress').
  const local: Record<string, Progress> = {}
  for (const r of allRoutes()) {
    const p = cleanProgress(await $.store.get(`route:${r.id}`)) ?? (r.id === 'variado' ? cleanProgress(await $.store.get('progress')) : null)
    if (p) local[r.id] = p
  }
  const localSettings = cleanSettings(await $.store.get('settings'))
  await update($, byRoute, cur => ({ ...cur, ...local }))
  if (localSettings) await update($, settings, () => localSettings)
  await showStatus($)

  // 2) Lo guardado en claude.ai, unido con lo local.
  try {
    const rows = await pull($)
    const toPush: string[] = []
    // Rutas propias de la nube: se suman a las locales (las mismas ids no se duplican).
    const remoteCustom = cleanCustomList((rows[CUSTOM_DOC] as { routes?: unknown } | undefined)?.routes)
    const ids = new Set(CUSTOM.map(r => r.id))
    const merged = [...CUSTOM, ...remoteCustom.filter(r => !ids.has(r.id))]
    if (merged.length !== CUSTOM.length) { setCustom(merged); await $.store.set('custom-routes', CUSTOM); await update($, customCount, () => CUSTOM.length) }
    if (CUSTOM.length > remoteCustom.length) toPush.push('mis-rutas')
    const fresh = cleanSettings(await $.store.get('settings'))
    if (fresh) await update($, settings, s => ({ ...s, active: fresh.active, shown: fresh.shown, path: fresh.path }))
    for (const r of allRoutes()) {
      const remote = cleanProgress(rows[docOf(r.id)])
      const mine = (await read($, byRoute))[r.id]
      if (!remote && !mine) continue
      const merged = remote && mine ? mergeProgress(mine, remote, r.steps.length) : (remote ?? mine)!
      await update($, byRoute, cur => ({ ...cur, [r.id]: merged }))
      await $.store.set(`route:${r.id}`, merged)
      if (!remote || JSON.stringify(remote) !== JSON.stringify(merged)) toPush.push(r.id)
    }
    const remoteSettings = cleanSettings(rows[SETTINGS_DOC])
    const mineSettings = await read($, settings)
    // Los exámenes aprobados nunca se pierden al unir: se suman los de ambos lados.
    const passes = { ...(remoteSettings?.passes ?? {}), ...(mineSettings.passes ?? {}) }
    if (remoteSettings && remoteSettings.at > mineSettings.at) await update($, settings, () => ({ ...remoteSettings, passes }))
    else if (mineSettings.at > (remoteSettings?.at ?? -1)) toPush.push('ajustes')
    if (Object.keys(passes).length !== Object.keys(mineSettings.passes ?? {}).length) await update($, settings, s => ({ ...s, passes }))
    await update($, sync, () => 'nube' as Sync)
    await showStatus($)
    for (const id of toPush) void save($, id)
  } catch {
    await update($, sync, () => 'local' as Sync)
  }
}

async function showStatus($: EngineInterface) {
  const s = await read($, settings)
  const route = routeById(s.active)
  const p = await progressOf($, route.id)
  $.ui.status(`Microdosis · ${route.name} ${countDone(p)}/${route.steps.length} · ${route.steps[Math.min(p.cur, route.steps.length - 1)][1]}`)
}

// --- Acciones sobre la ruta activa

async function changeActive($: EngineInterface, fn: (p: Progress, route: Route) => Progress) {
  const route = routeById((await read($, settings)).active)
  await update($, byRoute, cur => ({ ...cur, [route.id]: fn(cur[route.id] ?? EMPTY, route) }))
  void save($, route.id)
}

const go = ($: EngineInterface, i: number) =>
  changeActive($, (p, r) => ({ ...p, cur: Math.max(0, Math.min(r.steps.length - 1, i)), at: Date.now() }))

const answer = ($: EngineInterface, i: number) =>
  changeActive($, p =>
    p.ans[p.cur] != null ? p : { ...p, ans: { ...p.ans, [p.cur]: i }, done: { ...p.done, [p.cur]: true }, at: Date.now() },
  )

// Avanza a la siguiente parada. En la última, si quedan pendientes lleva a la primera que falta.
async function next($: EngineInterface) {
  let pending = 0
  let finished = false
  await changeActive($, (p, r) => {
    const done: Record<string, boolean> = { ...p.done, [p.cur]: true }
    const last = r.steps.length - 1
    if (p.cur < last) return { ...p, done, cur: p.cur + 1, at: Date.now() }
    const missing = r.steps.map((_, i) => i).filter(i => !done[i])
    pending = missing.length
    finished = pending === 0
    return { ...p, done, cur: pending ? missing[0]! : p.cur, at: Date.now() }
  })
  if (pending) $.ui.toast(pending === 1 ? 'Te queda 1 parada: te llevo a ella.' : `Te quedan ${pending} paradas: te llevo a la primera.`)
  else if (finished) $.ui.toast(cheer.finished())
}

async function random($: EngineInterface) {
  const route = routeById((await read($, settings)).active)
  const p = await progressOf($, route.id)
  const left = route.steps.map((_, i) => i).filter(i => !p.done[i] && i !== p.cur)
  if (left.length) await go($, left[Math.floor(Math.random() * left.length)])
}

// --- Rutas: cuáles se muestran y cuál está activa

async function setSettings($: EngineInterface, fn: (s: Settings) => Settings) {
  await update($, settings, s => ({ ...fn(s), at: Date.now() }))
  void save($, 'ajustes')
}

const isOpenFor = (passes: Record<string, Pass>, r: Route) => {
  const pre = prerequisite(r)
  return !pre || !!passes[pre]
}

const openRoute = async ($: EngineInterface, id: string) => {
  const s = await read($, settings)
  const r = routeById(id)
  if (!isOpenFor(s.passes ?? {}, r)) {
    $.ui.toast(`Se habilita al aprobar ${routeById(prerequisite(r)!).name}`)
    return
  }
  await setSettings($, st => ({ ...st, active: id, shown: st.shown.includes(id) ? st.shown : [...st.shown, id] }))
  await update($, view, () => 'paso' as View)
}

const toggleShown = ($: EngineInterface, id: string) =>
  setSettings($, s => {
    if (!s.shown.includes(id)) return { ...s, shown: [...s.shown, id] }
    if (s.shown.length === 1) return s
    const shown = s.shown.filter(x => x !== id)
    return { ...s, shown, active: s.active === id ? shown[0]! : s.active }
  })

// --- Caminos: conjuntos de rutas por rol (ver caminos.ts)

// Una ruta cuenta como hecha en un camino si aprobaste su examen o, si no tiene examen, hiciste todas las paradas.
const routeComplete = (r: Route, p: Progress | undefined, passes: Record<string, Pass>) =>
  r.exam ? !!passes[r.id] : countDone(p ?? EMPTY) >= r.steps.length

function caminoProgress(c: Camino, all: Record<string, Progress>, passes: Record<string, Pass>) {
  const routes = c.routes.map(id => routeById(id))
  const done = routes.filter(r => routeComplete(r, all[r.id], passes))
  const next = routes.find(r => !routeComplete(r, all[r.id], passes))
  return { routes, done: done.length, total: routes.length, next, stops: routes.reduce((n, r) => n + r.steps.length, 0) }
}

async function chooseCamino($: EngineInterface, id: string) {
  const c = caminoById(id)
  if (!c) return
  const passes = (await read($, settings)).passes ?? {}
  const { next } = caminoProgress(c, await read($, byRoute), passes)
  await setSettings($, s => ({ ...s, path: id }))
  if (next) await openRoute($, next.id)
  else await update($, view, () => 'paso' as View)
  $.ui.toast(next ? `Camino «${c.name}». Arrancás con ${next.name}.` : `Ya completaste «${c.name}».`)
}

const leaveCamino = ($: EngineInterface) => setSettings($, s => ({ ...s, path: undefined }))

// --- Rutas propias: /nueva-ruta y «+ Crear ruta»

async function createRoute($: EngineInterface, rawTopic: string) {
  const topic = rawTopic.trim()
  if (!topic) {
    $.ui.toast('Escribí de qué querés la ruta, por ejemplo «SQL para análisis de datos»')
    return
  }
  if ((await read($, creating))?.status === 'generando') return
  await update($, creating, () => ({ topic, status: 'generando' as const }))
  await update($, view, () => 'rutas' as View)
  const r = await $.model.complete({
    model: 'sonnet', system: GEN_SYSTEM, maxTokens: 16000, timeoutMs: 240000,
    prompt: `Tema de la ruta: ${topic}\n\nArmá la ruta completa siguiendo el formato.`,
  }).catch(() => null)
  if (!r || !r.isAnswered) {
    await update($, creating, () => ({ topic, status: 'error' as const, msg: 'No se pudo generar la ruta. Probá de nuevo en un momento.' }))
    return
  }
  const built = buildCustomRoutes(r.text, topic)
  if ('error' in built) {
    await update($, creating, () => ({ topic, status: 'error' as const, msg: `${built.error} Probá de nuevo.` }))
    return
  }
  setCustom([...CUSTOM, ...built.routes])
  await update($, customCount, () => CUSTOM.length)
  void save($, 'mis-rutas')
  await update($, creating, () => null)
  await update($, query, () => '')
  await openRoute($, built.routes[0]!.id)
  $.ui.toast(`Ruta «${built.routes[0]!.trackName}» creada. Está en Rutas › Mis rutas.`)
}

async function deleteCustomTrack($: EngineInterface, track: string) {
  const gone = new Set(CUSTOM.filter(r => r.track === track).map(r => r.id))
  setCustom(CUSTOM.filter(r => r.track !== track))
  await update($, customCount, () => CUSTOM.length)
  await setSettings($, s => {
    const shown = s.shown.filter(id => !gone.has(id))
    const safe = shown.length ? shown : [DEFAULT_ROUTE]
    return { ...s, shown: safe, active: gone.has(s.active) ? safe[0]! : s.active }
  })
  void save($, 'mis-rutas')
  $.ui.toast('Ruta borrada.')
}

// --- Examen de nivel y certificado

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j]!, b[i]!]
  }
  return b
}

async function startExam($: EngineInterface, routeId: string) {
  const r = routeById(routeId)
  if (!r.exam) return
  await update($, exam, () => ({ routeId, order: shuffle(r.exam!.map((_, i) => i)), answers: [] }))
  await update($, view, () => 'examen' as View)
}

async function answerExam($: EngineInterface, choice: number) {
  const ex = await read($, exam)
  if (!ex || ex.result) return
  const answers = [...ex.answers, choice]
  if (answers.length < ex.order.length) {
    await update($, exam, () => ({ ...ex, answers }))
    return
  }
  const r = routeById(ex.routeId)
  const score = ex.order.reduce((acc, q, k) => acc + (r.exam![q]![2] === answers[k] ? 1 : 0), 0)
  const total = ex.order.length
  const passed = score / total >= PASS_RATIO
  await update($, settings, s => ({ ...s, attempts: { ...(s.attempts ?? {}), [r.id]: (s.attempts?.[r.id] ?? 0) + 1 }, at: Date.now() }))
  await update($, exam, () => ({ ...ex, answers, result: { score, total, passed } }))
  void save($, 'ajustes')
}

function makeCode(): string {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const b = new Uint8Array(8)
  crypto.getRandomValues(b)
  return 'MD-' + Array.from(b, x => A[x % A.length]).join('')
}

// Emite el certificado: queda en tus ajustes y en la colección pública de la página, con su código.
async function issueCert($: EngineInterface, rawName: string) {
  const ex = await read($, exam)
  if (!ex?.result?.passed || ex.result.code) return
  const name = rawName.trim()
  if (!name) {
    $.ui.toast('Escribí el nombre que va en el certificado')
    return
  }
  const r = routeById(ex.routeId)
  const s = await read($, settings)
  const code = makeCode()
  const at = Date.now()
  const attempts = s.attempts?.[r.id] ?? 1
  const pass: Pass = { score: ex.result.score, total: ex.result.total, at, code, attempts }
  await update($, settings, st => ({ ...st, certName: name, passes: { ...(st.passes ?? {}), [r.id]: pass }, at: Date.now() }))
  await update($, exam, e => (e && e.result ? { ...e, result: { ...e.result, code } } : e))
  void save($, 'ajustes')
  const r2 = await $.tool.call({
    tool: 'ArtifactData', action: 'set', url: ARTIFACT, collection: CERTS, doc_id: code,
    data: {
      code, name, routeId: r.id, route: r.name, track: r.track ?? '', level: r.level ?? 0,
      score: pass.score, total: pass.total, pct: Math.round((pass.score / pass.total) * 100),
      attempts, issuedAt: new Date(at).toISOString(), issuer: brand.name === 'Microdosis' ? 'Microdosis' : `Microdosis · ${brand.name}`, version: 1,
    },
  }).catch(() => null)
  if (!r2 || r2.isError || r2.deny) $.ui.toast('El certificado quedó en tus ajustes, pero no se pudo registrar en claude.ai. Probá de nuevo más tarde.')
}

// Nombre corto para las pestañas: «Vue 3 · N1» en vez de «Vue 3 · Fundamentos».
const shortName = (r: Route) => (r.track && r.level ? `${trackName(r)} · N${r.level}` : r.name)

// --- Cabecera: tarjeta con el zorrito (o el logo inyectado), el avance y el recorrido por tramos.
// Los colores salen de la marca como variables CSS, con su variante oscura si la tiene (ver brand.ts).

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// El zorrito de Naummi abrazando su libro, con su plantita al lado, parados en el piso.
// Coordenadas: píxeles de la ilustración original, escalados a la cabecera.
const SCENE = { k: 0.2061, x: 440.5, y: 2, ox: FOX_BOX[0]!, oy: FOX_BOX[1]! }
const at = (px: number, py: number): [number, number] => [SCENE.x + (px - SCENE.ox) * SCENE.k, SCENE.y + (py - SCENE.oy) * SCENE.k]
const box = (b: number[]) => {
  const [x, y] = at(b[0]!, b[1]!)
  return { x, y, w: (b[2]! - b[0]!) * SCENE.k, h: (b[3]! - b[1]!) * SCENE.k }
}
const f = (n: number) => n.toFixed(1)

// Destellos alrededor de (cx, cy) cuando la respuesta es correcta.
function sparks(cx: number, cy: number): string {
  return [[-34, -18], [30, -26], [-40, 12], [38, 8], [0, -44]]
    .map(([dx, dy], i) => `<circle cx="${f(cx + dx!)}" cy="${f(cy + dy!)}" r="2" style="fill:var(--${i % 2 ? 'accentSoft' : 'spark'})" opacity="0">
  <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="${(0.1 + i * 0.12).toFixed(2)}s" repeatCount="3"/>
  <animate attributeName="r" values="1;3;1" dur="1.2s" begin="${(0.1 + i * 0.12).toFixed(2)}s" repeatCount="3"/>
</circle>`).join('')
}

function foxScene(cheer: boolean): string {
  const fox = box(FOX_BOX), plant = box(PLANT_BOX)
  const [fx, fy] = at(700, 604) // entre las patas
  const [px, py] = at(890, 617) // base de la maceta
  const [hx, hy] = at(655, 200) // cabeza
  return `<ellipse cx="${f(fx - 4)}" cy="${f(fy + 1)}" rx="76" ry="8" fill="url(#floor)"/>
<ellipse cx="${f(fx)}" cy="${f(fy + 0.5)}" rx="26" ry="3.8" style="fill:var(--shadow)" opacity="0.55"/>
<ellipse cx="${f(px)}" cy="${f(py + 0.3)}" rx="12" ry="2.6" style="fill:var(--shadow)" opacity="0.5"/>
<g transform="translate(${f(fx)} ${f(fy)})"><g>
  <animateTransform attributeName="transform" type="scale" values="1 1;1.006 1.014;1 1" keyTimes="0;0.5;1" dur="3.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>
  <image href="${FOX_IMG}" x="${f(fox.x - fx)}" y="${f(fox.y - fy)}" width="${f(fox.w)}" height="${f(fox.h)}"/>
</g></g>
<g>
  <animateTransform attributeName="transform" type="rotate" values="-2.2 ${f(px)} ${f(py)};2.2 ${f(px)} ${f(py)};-2.2 ${f(px)} ${f(py)}" dur="4.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>
  <image href="${PLANT}" x="${f(plant.x)}" y="${f(plant.y)}" width="${f(plant.w)}" height="${f(plant.h)}"/>
</g>
${cheer ? sparks(hx, hy) : ''}`
}

// Logo inyectado: centrado en la caja de la derecha, sin deformarse, flotando apenas.
function logoScene(logo: string, cheer: boolean, W: number): string {
  const bw = 112, bh = 84, cx = W - 78, cy = 58
  return `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>
  <image href="${esc(logo)}" x="${f(cx - bw / 2)}" y="${f(cy - bh / 2)}" width="${bw}" height="${bh}" preserveAspectRatio="xMidYMid meet"/>
</g>
${cheer ? sparks(cx, cy - 10) : ''}`
}

function heroSvg(route: Route, p: Progress, cheer = false): string {
  const W = 560, H = 140
  const t = brand.theme
  const total = route.steps.length
  const n = countDone(p)
  const pct = Math.round((n / total) * 100)
  const leg = route.steps[p.cur][0]
  const sans = `font-family="${esc(t.displayFont)}"`
  const mono = `font-family="${esc(t.monoFont)}"`

  // La barra se llena de izquierda a derecha con las paradas hechas; un punto marca dónde estás.
  const x0 = 20, y = 127, groupGap = 7
  const gaps = route.legs.length - 1
  const tickW = (W - 2 * x0 - groupGap * gaps) / total
  const ticks: string[] = []
  let curX = x0
  route.steps.forEach((s, i) => {
    const x = x0 + i * tickW + s[0] * groupGap
    const pad = Math.min(0.8, tickW * 0.12)
    if (i === p.cur) curX = x + tickW / 2
    ticks.push(`<rect x="${f(x + pad)}" y="${y - 3.5}" width="${f(tickW - 2 * pad)}" height="7" rx="1.5" style="fill:var(--${i < n ? 'accent' : 'track'})"/>`)
  })
  ticks.push(`<circle cx="${f(curX)}" cy="${y - 8.5}" r="2.2" style="fill:var(--text)"/>`)

  const headline = n === total ? '¡Ruta completa!' : `Parada ${p.cur + 1}`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs><style>${t.fontFaces}${paletteCss(t)}</style>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--bg)"/><stop offset="1" style="stop-color:var(--bg2)"/></linearGradient>
  <radialGradient id="floor" cx="0.5" cy="0.5" r="0.5"><stop offset="0" style="stop-color:var(--accentSoft);stop-opacity:0.16"/><stop offset="1" style="stop-color:var(--accentSoft);stop-opacity:0"/></radialGradient>
  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" style="stop-color:var(--accent);stop-opacity:0.35"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" rx="${t.radius}" fill="url(#bg)"/>
<circle cx="${W - 66}" cy="60" r="62" fill="url(#glow)"/>
${brand.logo ? logoScene(brand.logo, cheer, W) : foxScene(cheer)}
<text x="20" y="26" ${mono} font-size="9.5" letter-spacing="1.6" style="fill:var(--accentSoft)">${esc(route.name.toUpperCase())}</text>
<text x="20" y="56" ${sans} font-size="23" font-weight="700" letter-spacing="-0.5" style="fill:var(--text)">${esc(headline)}</text>
<text x="20" y="76" ${sans} font-size="12.5" style="fill:var(--textMuted)">${n} de ${total} hechas · ${pct}%</text>
<text x="20" y="${y - 15}" ${mono} font-size="8.5" letter-spacing="1" style="fill:var(--accentSoft)">${esc(route.legs[leg].toUpperCase())}</text>
${ticks.join('')}
</svg>`
}

export const register: Register = (on, options) => {
  on('session.start', async ($, e, nxt) => {
    // Marca y rutas del proyecto (.claude/microlearnings.json), encima de los ajustes del mod.
    const branded = loadProject($).then(async project => {
      const b = await loadBrand($, options as BrandOptions, project.config)
      brand = { ...b, theme: b.id === 'naummi' ? { ...b.theme, fontFaces: INTER_FACES } : b.theme }
      for (const w of [...(project.error ? [project.error] : []), ...b.warnings]) $.ui.toast(`Microdosis: ${w}`)
      await update($, brandRev, n => n + 1)
    })
    await $.command.register({ name: 'microdosis', description: 'Abrir el panel de Microdosis' })
    await $.command.register({ name: 'ok', description: 'Marcar hecho el paso de Microdosis y pasar al siguiente' })
    await $.command.register({ name: 'nueva-ruta', description: 'Crear una ruta de Microdosis sobre un tema, en tres niveles con examen', argumentHint: 'tema' })
    await $.command.register({ name: 'camino', description: 'Elegir un camino de Microdosis: rutas armadas por rol, como Frontend Vue Jr, Ssr o Sr' })
    void $.ui.open({ id: PANE, title: 'Microdosis' })
    // Las rutas del proyecto se aplican después de leer el progreso guardado, para no pisarlo.
    void Promise.all([branded, load($)]).then(() => applyProjectRoutes($))
    return nxt(e)
  })

  on('command.run', { command: 'microdosis' }, async $ => {
    await $.ui.open({ id: PANE, title: 'Microdosis' })
    return { text: 'Panel de Microdosis abierto.' }
  })

  on('command.run', { command: 'camino' }, async $ => {
    await update($, view, () => 'caminos' as View)
    await $.ui.open({ id: PANE, title: 'Microdosis' })
    return { text: 'Elegí tu camino en el panel de Microdosis.' }
  })

  on('command.run', { command: 'nueva-ruta' }, async ($, e) => {
    if (!e.args.trim()) return { text: 'Escribí el tema: /nueva-ruta SQL para análisis de datos' }
    await $.ui.open({ id: PANE, title: 'Microdosis' })
    void createRoute($, e.args)
    return { text: `Creando la ruta «${e.args.trim()}» en el panel de Microdosis. Tarda alrededor de un minuto.` }
  })

  on('command.run', { command: 'ok' }, async $ => {
    const route = routeById((await read($, settings)).active)
    const before = await progressOf($, route.id)
    await next($)
    await $.ui.open({ id: PANE, title: 'Microdosis' })
    const after = await progressOf($, route.id)
    return { text: `Hecho: ${route.steps[before.cur][1]}. Sigue: ${route.steps[after.cur][1]}.` }
  })

  // Mientras Claude trabaja: un "para llevarte" de lo que ya viste en tus rutas, para repasar.
  on('ui.render', { component: 'Spinner' }, async ($, e, nxt) => {
    const s = await read($, settings)
    const all = await read($, byRoute)
    const pool: string[] = []
    for (const id of s.shown) {
      const route = routeById(id)
      const p = all[id] ?? EMPTY
      route.steps.forEach((st, i) => p.done[i] && pool.push(st[3]))
    }
    if (!pool.length) {
      const route = routeById(s.active)
      pool.push(route.steps[(all[route.id] ?? EMPTY).cur][3])
    }
    return nxt({ ...e, props: { ...e.props, message: pool[Math.floor(Math.random() * pool.length)] } })
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const els = $.ui.resolve(e)
    const { Box, Text, Button } = els
    const Svg = 'Svg' in els ? els.Svg : null
    const Input = 'Input' in els ? els.Input : null
    const Code = 'Code' in els ? els.Code : null
    const Link = 'Link' in els ? els.Link : null
    await read($, brandRev) // redibuja cuando se carga la marca
    const s = await read($, settings)
    const all = await read($, byRoute)
    const sy = await read($, sync)
    const v = await read($, view)
    const passes = s.passes ?? {}
    const certUrl = (code: string) => `${ARTIFACT}#cert-${code}`
    const syncText =
      sy === 'nube' ? 'Sincronizado con claude.ai' : sy === 'local' ? 'Guardado en esta compu' : 'Conectando con claude.ai…'
    const footer = (
      <Text size="footnote" color="subtle">
        <Text color={sy === 'nube' ? 'success' : 'subtle'}>●</Text> {syncText}
      </Text>
    )
    const certLink = (code: string, label: string) =>
      Link ? <Link key={`cert-${code}`} href={certUrl(code)} label={label} /> : <Text color="claude">{label}: {certUrl(code)}</Text>

    await read($, customCount)
    // --- Bienvenida: solo la primera vez
    if (!s.welcomed && v === 'paso') {
      const welcome = (then: () => Promise<unknown>) => () => void setSettings($, st => ({ ...st, welcomed: true })).then(then)
      return (
        <Box flexDirection="column" gap={2} paddingX={1} paddingY={1}>
          {Svg && <Svg source={heroSvg(routeById(startRoute()), EMPTY)} alt={brand.logo ? `Logo de ${brand.name}` : "El zorrito de Microdosis con su libro y su plantita"} />}
          <Text size="title" weight="bold">{brand.messages.welcomeTitle ?? 'Hola, soy Microdosis'}</Text>
          <Text>{brand.messages.welcomeText ?? 'Aprendés de a poquito, sin salir de Claude: cada parada se lee en un minuto o tres y termina con una pregunta rápida. Hay rutas de cultura general, tecnología, comunicación, idiomas y más.'}</Text>
          <Text>Las rutas por niveles terminan con un examen. Si lo aprobás, te llevás un certificado que podés compartir en LinkedIn.</Text>
          <Box flexDirection="row" gap={1} flexWrap="wrap">
            <Button key="w-start" label={`Empezar con ${shortName(routeById(startRoute()))}`} variant="primary" onPress={welcome(() => openRoute($, startRoute()))} />
            <Button key="w-caminos" label="◇ Elegir mi camino" variant="secondary" onPress={welcome(() => update($, view, () => 'caminos' as View))} />
            <Button key="w-routes" label="⌕ Elegir una ruta" variant="secondary" onPress={welcome(() => update($, view, () => 'rutas' as View))} />
          </Box>
          <Text size="footnote" color="subtle">Un camino es un conjunto de rutas armado para un rol, como Frontend con Vue Jr, Ssr o Sr.</Text>
          <Text size="footnote" color="subtle">¿No está el tema que buscás? En Rutas podés crear el tuyo, o escribí /nueva-ruta y el tema.</Text>
        </Box>
      )
    }

    // --- Examen
    const ex = await read($, exam)
    if (v === 'examen' && ex) {
      const r = routeById(ex.routeId)
      const total = ex.order.length
      const need = Math.ceil(total * PASS_RATIO)
      const header = (
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text size="caption" mono color="claude">EXAMEN · {r.name.toUpperCase()}</Text>
          <Button key="exit" label="Salir" variant="secondary" onPress={() => void update($, exam, () => null).then(() => update($, view, () => 'rutas' as View))} />
        </Box>
      )
      if (!ex.result) {
        const k = ex.answers.length
        const [q, opts] = r.exam![ex.order[k]!]!
        return (
          <Box flexDirection="column" gap={2} paddingX={1} paddingY={1}>
            {header}
            <Text size="footnote" color="subtle">Pregunta {k + 1} de {total} · aprobás con {need} de {total}</Text>
            <Text size="title" weight="bold">{q}</Text>
            <Box flexDirection="column" gap={1}>
              {opts.map((o, i) => (
                <Button key={`ex-${k}-${i}`} label={o} hotkey={String(i + 1)} variant="secondary" onPress={() => void answerExam($, i)} />
              ))}
            </Box>
            <Text size="footnote" color="subtle">Las respuestas se corrigen al final. Las preguntas no son las mismas de las paradas.</Text>
          </Box>
        )
      }
      const { score, passed, code } = ex.result
      const missed = ex.order.filter((q, i) => r.exam![q]![2] !== ex.answers[i]).map(q => r.exam![q]![0])
      const next = allRoutes().find(x => x.track && x.track === r.track && x.level === (r.level ?? 0) + 1)
      const cam = caminoById(s.path)
      const camNext = cam ? caminoProgress(cam, all, passes).next : undefined
      return (
        <Box flexDirection="column" gap={2} paddingX={1} paddingY={1}>
          {header}
          <Text size="title" weight="bold">{passed ? '¡Aprobado!' : 'Todavía no'}</Text>
          <Text>{score} de {total} correctas · {Math.round((score / total) * 100)} %{passed ? '' : ` · necesitás ${need}`}</Text>
          {missed.length > 0 && (
            <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} borderStyle="round" borderColor="subtle">
              <Text size="caption" mono color="subtle">PARA REPASAR</Text>
              {missed.map(m => <Text>· {m}</Text>)}
            </Box>
          )}
          {passed && !code && (
            <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} {...highlight()} borderStyle="round">
              <Text size="caption" mono color="claude">CERTIFICADO</Text>
              <Text>Escribí tu nombre como querés que figure. Se registra con fecha, puntaje y un código de verificación.</Text>
              {Input ? (
                <Input key="cert-name" label="Nombre completo" value={s.certName ?? ''} submitLabel="Emitir certificado" onSubmit={value => void issueCert($, value)} />
              ) : (
                <Button key="cert-go" label="Emitir certificado" variant="primary" onPress={() => void issueCert($, s.certName || 'Sin nombre')} />
              )}
            </Box>
          )}
          {passed && code && (
            <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} {...highlight()} borderStyle="round">
              <Text size="caption" mono color="claude">CERTIFICADO EMITIDO</Text>
              <Text weight="semibold">{code}</Text>
              {certLink(code, 'Ver y compartir el certificado')}
              {next && <Text size="footnote" color="subtle">Se habilitó {next.name}.</Text>}
            </Box>
          )}
          <Box flexDirection="row" gap={1} flexWrap="wrap">
            {!passed && <Button key="retry" label="Reintentar" variant="primary" onPress={() => void startExam($, r.id)} />}
            {!passed && <Button key="review" label="Volver a las paradas" variant="secondary" onPress={() => void update($, exam, () => null).then(() => openRoute($, r.id))} />}
            {passed && camNext && camNext.id !== r.id && camNext.id !== next?.id &&<Button key="next-camino" label={`Seguir el camino: ${shortName(camNext)}`} variant="primary" onPress={() => void update($, exam, () => null).then(() => openRoute($, camNext.id))} />}
            {passed && next && <Button key="next-level" label={`Empezar ${LEVEL_NAMES[next.level ?? 1]}`} variant="primary" onPress={() => void update($, exam, () => null).then(() => openRoute($, next.id))} />}
            {passed && <Button key="to-routes" label="Ir a Rutas" variant="secondary" onPress={() => void update($, exam, () => null).then(() => update($, view, () => 'rutas' as View))} />}
          </Box>
        </Box>
      )
    }

    // --- Elige tu camino: familias por rol, con niveles (Jr, Ssr, Sr…) y la lista de rutas de cada uno
    if (v === 'caminos') {
      const exp = await read($, expanded)
      const mine = caminoById(s.path)
      const icon = (r: Route, isNext: boolean) => {
        if (routeComplete(r, all[r.id], passes)) return { mark: '✓', color: 'success' }
        if (isNext) return { mark: '▸', color: 'claude' }
        const d = countDone(all[r.id] ?? EMPTY)
        return { mark: d ? '◐' : '○', color: 'subtle' }
      }
      const routeList = (c: Camino) => {
        const pr = caminoProgress(c, all, passes)
        return (
          <Box flexDirection="column">
            {pr.routes.map(r => {
              const ic = icon(r, r.id === pr.next?.id)
              const d = countDone(all[r.id] ?? EMPTY)
              const extra = routeComplete(r, all[r.id], passes) ? '' : r.exam && d >= r.steps.length ? ' · falta examen' : d ? ` · ${d}/${r.steps.length}` : ''
              return (
                <Text key={`cr-${c.id}-${r.id}`} color={ic.color === 'subtle' ? undefined : ic.color}>
                  <Text color={ic.color}>{ic.mark}</Text>  {shortName(r)}<Text color="subtle">{extra}</Text>
                </Text>
              )
            })}
          </Box>
        )
      }
      const familyCard = (fam: (typeof FAMILIES)[number]) => {
        const sel = fam.caminos.find(c => c.id === exp[`camino:${fam.id}`]) ?? fam.caminos.find(c => c.id === s.path) ?? fam.caminos[0]!
        const pr = caminoProgress(sel, all, passes)
        const isMine = s.path === sel.id
        const famMine = fam.caminos.some(c => c.id === s.path)
        const doneLevels = fam.caminos.filter(c => { const x = caminoProgress(c, all, passes); return x.done === x.total }).length
        return (
          <Box key={`fam-${fam.id}`} flexDirection="column" gap={1} paddingX={2} paddingY={1} borderStyle="round" borderColor={famMine ? brand.theme.panelAccent : 'subtle'}>
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
              <Text size="heading" weight="semibold">{fam.name}</Text>
              <Text size="caption" mono color="subtle">{doneLevels}/{fam.caminos.length} COMPLETOS</Text>
            </Box>
            <Text size="footnote" color="subtle">{fam.blurb}</Text>
            <Box flexDirection="row" gap={1} flexWrap="wrap">
              {fam.caminos.map(c => {
                const x = caminoProgress(c, all, passes)
                const label = `${x.done === x.total ? '✓ ' : c.id === s.path ? '● ' : ''}${c.label}`
                return <Button key={`cl-${c.id}`} label={label} variant={c.id === sel.id ? 'primary' : 'secondary'} onPress={() => void update($, expanded, m => ({ ...m, [`camino:${fam.id}`]: c.id }))} />
              })}
            </Box>
            <Box flexDirection="column" gap={1} paddingTop={1}>
              <Text weight="semibold">{sel.blurb}</Text>
              <Text size="footnote" color="subtle">{pr.total} rutas · {pr.stops} paradas · {pr.done}/{pr.total} hechas</Text>
              {routeList(sel)}
              <Box flexDirection="row" gap={1} flexWrap="wrap">
                {isMine ? (
                  pr.next && <Button key={`cgo-${sel.id}`} label={`Seguir: ${shortName(pr.next)}`} variant="primary" onPress={() => void openRoute($, pr.next!.id)} />
                ) : (
                  <Button key={`cpick-${sel.id}`} label={pr.done === pr.total ? 'Elegir (ya completo)' : 'Elegir este camino'} variant="primary" onPress={() => void chooseCamino($, sel.id)} />
                )}
                {isMine && <Text size="footnote" color="claude">Es tu camino</Text>}
              </Box>
            </Box>
          </Box>
        )
      }
      const minePr = mine ? caminoProgress(mine, all, passes) : null
      return (
        <Box flexDirection="column" gap={2} paddingX={1} paddingY={1}>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text size="title" weight="bold">Elegí tu camino</Text>
            <Button key="back" label="← Volver" variant="secondary" onPress={() => void update($, view, () => 'paso' as View)} />
          </Box>
          <Text color="subtle">Conjuntos de rutas armados para un rol y un nivel. Elegí uno y te voy llevando ruta por ruta. Lo que hacés en una ruta cuenta para todos los caminos que la incluyen.</Text>
          {mine && minePr && (
            <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} {...highlight()} borderStyle="round">
              <Text size="caption" mono color="claude">TU CAMINO</Text>
              <Text weight="semibold">{mine.name}</Text>
              <Text size="footnote" color="subtle">{minePr.done} de {minePr.total} rutas · {minePr.next ? `sigue ${minePr.next.name}` : '¡completo!'}</Text>
              <Box flexDirection="row" gap={1} flexWrap="wrap">
                {minePr.next && <Button key="mine-go" label="Seguir" variant="primary" onPress={() => void openRoute($, minePr.next!.id)} />}
                <Button key="mine-leave" label="Dejar el camino" variant="secondary" onPress={() => void leaveCamino($)} />
              </Box>
            </Box>
          )}
          {AREAS.map(area => (
            <Box key={`area-${area}`} flexDirection="column" gap={1}>
              <Text size="caption" mono color="claude">{area.toUpperCase()}</Text>
              {FAMILIES.filter(f => f.area === area).map(familyCard)}
            </Box>
          ))}
          <Text size="footnote" color="subtle">✓ hecha · ▸ la que sigue · ◐ empezada · ○ pendiente. Las rutas con examen cuentan como hechas al aprobarlo. Dejar un camino no borra tu avance.</Text>
          {footer}
        </Box>
      )
    }

    // --- Rutas: buscador, temas y niveles
    if (v === 'rutas') {
      const q = await read($, query)
      const exp = await read($, expanded)
      const creatingNow = await read($, creating)
      const found = searchRoutes(q)
      const info = (r: Route) => {
        const p = all[r.id] ?? EMPTY
        const d = countDone(p)
        return { d, isShown: s.shown.includes(r.id), isActive: s.active === r.id, open: isOpenFor(passes, r), pass: passes[r.id], allDone: d >= r.steps.length }
      }
      // Acciones de una ruta o nivel: seguir, sumar/quitar del panel, examen, certificado.
      const actions = (r: Route) => {
        const { d, isShown, isActive, open, pass, allDone } = info(r)
        if (!open) return <Text size="footnote" color="subtle">🔒 Se habilita al aprobar {shortName(routeById(prerequisite(r)!))}.</Text>
        return (
          <Box flexDirection="column" gap={1}>
            <Box flexDirection="row" gap={1} flexWrap="wrap">
              {!isActive && <Button key={`go-${r.id}`} label={d ? 'Seguir' : 'Empezar'} variant="primary" onPress={() => void openRoute($, r.id)} />}
              {r.exam && !pass && allDone && <Button key={`exam-${r.id}`} label="Rendir examen" variant="primary" onPress={() => void startExam($, r.id)} />}
              {!(isShown && s.shown.length === 1) && (
                <Button key={`toggle-${r.id}`} label={isShown ? 'Quitar del panel' : 'Sumar al panel'} variant="secondary" onPress={() => void toggleShown($, r.id)} />
              )}
            </Box>
            {pass && certLink(pass.code, `Certificado ${pass.code} · ${pass.score}/${pass.total}`)}
          </Box>
        )
      }
      const statusOf = (r: Route) => {
        const { d, isActive, open, pass } = info(r)
        if (!open) return { text: 'BLOQUEADA', color: 'subtle' }
        if (pass) return { text: 'APROBADA', color: 'success' }
        if (d >= r.steps.length) return { text: r.exam ? 'FALTA EXAMEN' : 'TERMINADA', color: 'success' }
        if (isActive) return { text: 'EN CURSO', color: 'claude' }
        return { text: d ? `${d}/${r.steps.length}` : 'NUEVA', color: 'subtle' }
      }
      // Pista con niveles: una tarjeta, fichas N1 · N2 · N3 y el nivel elegido desplegado.
      const trackCard = (t: string, levels: Route[]) => {
        const fallback = levels.find(r => info(r).open && !info(r).pass) ?? levels[levels.length - 1]!
        const sel = levels.find(r => r.id === exp[t]) ?? fallback
        const anyShown = levels.some(r => s.shown.includes(r.id))
        const st = statusOf(sel)
        return (
          <Box key={`track-${t}`} flexDirection="column" gap={1} paddingX={2} paddingY={1} borderStyle="round" borderColor={anyShown ? brand.theme.panelAccent : 'subtle'}>
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
              <Text size="heading" weight="semibold">{trackName(levels[0]!)}</Text>
              <Text size="caption" mono color="subtle">{levels.filter(r => info(r).pass).length}/{levels.length} NIVELES</Text>
            </Box>
            {levels[0]!.custom && (
              <Box flexDirection="row" gap={1} alignItems="center" justifyContent="space-between">
                <Text size="footnote" color="subtle">Creada con IA: revisá el contenido antes de usarla como referencia.</Text>
                <Button key={`del-${t}`} label="Borrar" variant="secondary" onPress={() => void deleteCustomTrack($, t)} />
              </Box>
            )}
            <Box flexDirection="row" gap={1} flexWrap="wrap">
              {levels.map(r => {
                const i = info(r)
                const label = `${i.pass ? '✓ ' : !i.open ? '🔒 ' : ''}${LEVEL_NAMES[r.level ?? 1]}`
                return <Button key={`lvl-${r.id}`} label={label} variant={r.id === sel.id ? 'primary' : 'secondary'} onPress={() => void update($, expanded, m => ({ ...m, [t]: r.id }))} />
              })}
            </Box>
            <Box flexDirection="column" gap={1} paddingTop={1}>
              <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Text weight="semibold" dimColor={!info(sel).open}>{sel.blurb}</Text>
              </Box>
              <Text size="footnote" color="subtle">{sel.pace} · <Text color={st.color}>{st.text}</Text></Text>
              {actions(sel)}
            </Box>
          </Box>
        )
      }
      // Ruta suelta: tarjeta compacta.
      const looseCard = (r: Route) => {
        const st = statusOf(r)
        const shown = s.shown.includes(r.id)
        return (
          <Box key={`loose-${r.id}`} flexDirection="column" gap={1} paddingX={2} paddingY={1} borderStyle="round" borderColor={shown ? brand.theme.panelAccent : 'subtle'}>
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
              <Text size="heading" weight="semibold">{r.name}</Text>
              <Text size="caption" mono color={st.color}>{st.text}</Text>
            </Box>
            <Text color="subtle">{r.blurb}</Text>
            <Text size="footnote" color="subtle">{r.pace}</Text>
            {actions(r)}
          </Box>
        )
      }
      const sections = TOPICS.map(topic => {
        const inTopic = found.filter(r => r.topic === topic)
        if (!inTopic.length) return null
        const tracks = [...new Set(inTopic.filter(r => r.track).map(r => r.track!))]
        return (
          <Box key={`topic-${topic}`} flexDirection="column" gap={1}>
            <Text size="caption" mono color="claude">{topic.toUpperCase()}</Text>
            {tracks.map(t => trackCard(t, allRoutes().filter(r => r.track === t).sort((a, b) => (a.level ?? 0) - (b.level ?? 0))))}
            {inTopic.filter(r => !r.track).map(looseCard)}
          </Box>
        )
      })
      return (
        <Box flexDirection="column" gap={2} paddingX={1} paddingY={1}>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text size="title" weight="bold">Rutas</Text>
            <Box flexDirection="row" gap={1}>
              <Button key="to-caminos" label="◇ Caminos" variant="secondary" onPress={() => void update($, view, () => 'caminos' as View)} />
              <Button key="back" label="← Volver" variant="secondary" onPress={() => void update($, view, () => 'paso' as View)} />
            </Box>
          </Box>
          {!q && !s.path && (
            <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} {...highlight()} borderStyle="round">
              <Text weight="semibold">◇ Elegí tu camino</Text>
              <Text size="footnote" color="subtle">Rutas ya armadas por rol: Frontend con Vue, Backend .NET, Datos, Diseño, Product Manager, Liderazgo… en Jr, Ssr y Sr.</Text>
              <Button key="caminos-cta" label="Ver caminos" variant="primary" onPress={() => void update($, view, () => 'caminos' as View)} />
            </Box>
          )}
          {Input && (
            <Input key="search" placeholder="Buscar: vue, git, oratoria, avanzado…" value={q} submitLabel="Limpiar" onInput={val => void update($, query, () => val)} onSubmit={() => void update($, query, () => '')} />
          )}
          {creatingNow?.status === 'generando' ? (
            <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} {...highlight()} borderStyle="round">
              <Text size="caption" mono color="claude">CREANDO RUTA</Text>
              <Text weight="semibold">«{creatingNow.topic}»</Text>
              <Text size="footnote" color="subtle">{cheer.creating()}</Text>
            </Box>
          ) : (
            <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} borderStyle="round" borderColor="subtle">
              <Text weight="semibold">+ Crear una ruta</Text>
              <Text size="footnote" color="subtle">{found.length === 0 && q ? `No hay rutas de «${q}». ` : ''}Escribí un tema y se arma en tres niveles, con examen y certificado.</Text>
              {Input && <Input key="create" placeholder="Ej.: SQL para análisis de datos, negociación, React" value={found.length === 0 ? q : ''} submitLabel="Crear ruta" onSubmit={val => void createRoute($, val)} />}
              {creatingNow?.status === 'error' && <Text size="footnote" color="error">{creatingNow.msg}</Text>}
            </Box>
          )}
          {found.length === 0 ? null : sections}
          {Link && <Link key="perfil" href={`${ARTIFACT}#perfil`} label="Ver mi perfil público de certificados" />}
          <Text size="footnote" color="subtle">Las rutas con niveles terminan cada nivel con un examen; se aprueba con el {Math.round(PASS_RATIO * 100)} % y habilita el siguiente.</Text>
          {footer}
        </Box>
      )
    }

    // --- Vista del paso
    const route = routeById(s.active)
    const total = route.steps.length
    const p = all[route.id] ?? EMPTY
    const cur = Math.min(p.cur, total - 1)
    const [, title, body, take, q, opts, right] = route.steps[cur]!
    const picked = p.ans[cur]
    const n = countDone(p)
    const pass = passes[route.id]
    const camino = caminoById(s.path)
    const camPr = camino ? caminoProgress(camino, all, passes) : null

    // Pestañas en una sola línea: dos visibles, la activa siempre entre ellas; ‹ › pasan a la ruta anterior o siguiente.
    const VISIBLE = 2
    const idx = Math.max(0, s.shown.indexOf(route.id))
    const start = Math.max(0, Math.min(idx === 0 ? 0 : idx - 1, s.shown.length - VISIBLE))
    const tabs = s.shown.slice(start, start + VISIBLE)
    const prevId = s.shown[(idx - 1 + s.shown.length) % s.shown.length]!
    const nextId = s.shown[(idx + 1) % s.shown.length]!

    const paragraphs = body.split('\n\n').map((par, i) => {
      if (par.startsWith('```')) {
        const lines = par.split('\n')
        const language = lines[0]!.slice(3).trim() || undefined
        const source = lines.slice(1, lines[lines.length - 1]!.startsWith('```') ? -1 : undefined).join('\n')
        return Code ? <Code key={`code-${cur}-${i}`} source={source} language={language} /> : <Text mono>{source}</Text>
      }
      return <Text>{par}</Text>
    })

    return (
      <Box flexDirection="column" gap={2} paddingX={1} paddingY={1}>
        <Box flexDirection="row" gap={1} alignItems="center" justifyContent="space-between">
          <Box flexDirection="row" gap={1} alignItems="center">
            {s.shown.length > VISIBLE && <Button key="tab-prev" label="‹" variant="secondary" onPress={() => void openRoute($, prevId)} />}
            {tabs.map(id => (
              <Button key={`tab-${id}`} label={shortName(routeById(id))} variant={id === route.id ? 'primary' : 'secondary'} onPress={() => void openRoute($, id)} />
            ))}
            {s.shown.length > VISIBLE && <Button key="tab-next" label="›" variant="secondary" onPress={() => void openRoute($, nextId)} />}
          </Box>
          <Button key="routes" label="⌕ Rutas" variant="secondary" onPress={() => void update($, view, () => 'rutas' as View)} />
        </Box>

        {camino && camPr && (
          <Box flexDirection="row" gap={1} alignItems="center" justifyContent="space-between" flexWrap="wrap">
            <Text size="footnote" color="subtle">
              <Text color="claude">◇</Text> {camino.name} · {camPr.next ? `${camPr.done}/${camPr.total} rutas` : '¡camino completo!'}
            </Text>
            <Box flexDirection="row" gap={1}>
              {camPr.next && camPr.next.id !== route.id && !!route.exam && routeComplete(route, p, passes) && (
                <Button key="cam-next" label={`Seguir: ${shortName(camPr.next)}`} variant="primary" onPress={() => void openRoute($, camPr.next!.id)} />
              )}
              <Button key="cam-view" label="Ver camino" variant="secondary" onPress={() => void update($, view, () => 'caminos' as View)} />
            </Box>
          </Box>
        )}

        {!Svg ? (
          <Box flexDirection="column">
            <Text bold color="claude">{route.name} · Parada {cur + 1}</Text>
            <Text color="subtle">{'▮'.repeat(n)}{'▯'.repeat(total - n)} {n}/{total}</Text>
          </Box>
        ) : (
          <Svg source={heroSvg(route, { ...p, cur }, picked === right)} alt={`${route.name}: parada ${cur + 1}, ${n} de ${total} hechas`} />
        )}

        {n >= total && !pass && (
          <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} {...highlight()} borderStyle="round">
            <Text weight="semibold">{route.exam ? '¡Terminaste las paradas! Ahora el examen del nivel.' : '¡Terminaste esta ruta!'}</Text>
            <Text size="footnote" color="subtle">
              {route.exam ? `8 preguntas nuevas · aprobás con ${Math.ceil(route.exam.length * PASS_RATIO)} · al aprobar, certificado y siguiente nivel.` : 'Podés repasar cuando quieras o elegir otra ruta.'}
            </Text>
            <Box flexDirection="row" gap={1} flexWrap="wrap">
              {route.exam && <Button key="exam-now" label="Rendir examen" variant="primary" onPress={() => void startExam($, route.id)} />}
              {!route.exam && camPr?.next && camPr.next.id !== route.id && <Button key="cam-next-fin" label={`Seguir el camino: ${shortName(camPr.next)}`} variant="primary" onPress={() => void openRoute($, camPr.next!.id)} />}
              <Button key="other-route" label="Elegir otra ruta" variant={route.exam ? 'secondary' : 'primary'} onPress={() => void update($, view, () => 'rutas' as View)} />
            </Box>
          </Box>
        )}
        {pass && (
          <Box flexDirection="row" gap={1} alignItems="center">
            <Text size="footnote" color="success">Nivel aprobado {pass.score}/{pass.total} ·</Text>
            {certLink(pass.code, `certificado ${pass.code}`)}
          </Box>
        )}

        <Box flexDirection="column" gap={1}>
          <Text size="title" weight="bold">{title}</Text>
          {paragraphs}
        </Box>

        <Box flexDirection="column" gap={1}>
          <Text size="caption" mono color="subtle">PREGUNTA RÁPIDA</Text>
          <Text weight="semibold">{q}</Text>
          {picked == null ? (
            <Box flexDirection="column" gap={1}>
              {opts.map((o, i) => (
                <Button key={`opt-${route.id}-${cur}-${i}`} label={o} hotkey={String(i + 1)} variant="secondary" onPress={() => void answer($, i)} />
              ))}
            </Box>
          ) : (
            <Box flexDirection="column" gap={1}>
              {opts.map((o, i) => (
                <Text color={i === right ? 'success' : i === picked ? 'error' : 'subtle'} weight={i === right ? 'semibold' : 'regular'}>
                  {i === right ? '✓' : i === picked ? '✗' : '·'}  {o}
                </Text>
              ))}
              <Text size="footnote" color={picked === right ? 'success' : 'subtle'}>
                {picked === right ? cheer.right() : cheer.wrong(opts[right]!)}
              </Text>
            </Box>
          )}
        </Box>

        {picked != null && (
          <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} {...highlight()} borderStyle="round">
            <Text size="caption" mono color="claude">PARA LLEVARTE</Text>
            <Text weight="medium">{take}</Text>
          </Box>
        )}

        <Box flexDirection="row" gap={1} alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Box flexDirection="row" gap={1} flexWrap="wrap">
            {cur > 0 && <Button key="prev" label="← Anterior" variant="secondary" onPress={() => void go($, cur - 1)} />}
            {!route.track && <Button key="rand" label="Al azar" variant="secondary" onPress={() => void random($)} />}
          </Box>
          <Button
            key="next"
            label={cur === total - 1 ? (picked == null ? 'Saltar y terminar' : 'Terminar ruta') : picked == null ? 'Saltar →' : 'Siguiente →'}
            variant={picked == null ? 'secondary' : 'primary'}
            onPress={() => void next($)}
          />
        </Box>

        {footer}
      </Box>
    )
  })
}
