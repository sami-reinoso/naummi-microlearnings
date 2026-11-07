import { atom, read, update } from 'claude-code'
import type { Atom, EngineInterface, Register } from 'claude-code'

import type { Progress, Settings, Sync, View } from '../types'
import { FOX as FOX_IMG, FOX_BOX, PLANT, PLANT_BOX } from './fox-art'
import { INTER_FACES } from './inter-font'
import { DEFAULT_ROUTE, ROUTES, routeById } from './routes'
import type { Route } from './routes'

// La página publicada guarda el progreso en tu espacio privado de esta base.
const ARTIFACT = 'https://claude.ai/artifact/SYzMTGDceMDtrVZ9EkygWS'
const COLLECTION = 'data/users/me'
const SETTINGS_DOC = 'microdosis-ajustes'
const PANE = 'microdosis'

// La ruta variada usa el mismo documento que la página publicada.
const docOf = (routeId: string) => (routeId === 'variado' ? 'microdosis' : `microdosis-${routeId}`)

const EMPTY: Progress = { cur: 0, done: {}, ans: {}, at: 0 }
const START: Settings = { active: DEFAULT_ROUTE, shown: [DEFAULT_ROUTE], at: 0 }

const byRoute = atom({ plugin: 'microdosis', key: 'byRoute' } as const, {} as Record<string, Progress>)
const settings = atom({ plugin: 'microdosis', key: 'prefs' } as const, START) as unknown as Atom<Settings>
const sync = atom({ plugin: 'microdosis', key: 'sync' } as const, 'cargando' as Sync)
const view = atom({ plugin: 'microdosis', key: 'view' } as const, 'paso' as View)

// Paleta Naummi: azul profundo, turquesa y el verde del zorrito.
const NIGHT = '#0f2a3d'
const NIGHT_2 = '#16405a'
const FOX = '#34D399'
const MINT = '#a7f0d6'
const TINT = 'rgba(52, 211, 153, 0.10)'
// Tipografía de la cabecera: Inter, incrustada en el SVG (ver inter-font.ts).
const DISPLAY_FONT = "'Inter Microdosis','Inter',-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif"

// Silueta del zorrito de Naummi, trazada sobre el logo (lienzo 1024).
const FOX_PATH =
  'M350 88 C385 84 452 138 490 186 L570 186 C608 138 668 88 705 87 C738 95 748 205 738 305 C755 330 782 360 776 386 C768 410 726 432 694 453 C700 530 700 600 662 660 C656 700 655 750 660 795 C700 788 728 762 748 763 C770 768 768 815 735 852 C682 912 590 950 470 953 C300 956 182 880 178 742 C176 625 258 540 366 458 C330 440 290 412 285 386 C290 360 312 335 324 308 C310 222 318 108 350 88 Z'

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
  const known = new Set(ROUTES.map(x => x.id))
  const shown = Array.isArray(r.shown) ? r.shown.filter((x): x is string => typeof x === 'string' && known.has(x)) : []
  const active = typeof r.active === 'string' && known.has(r.active) ? r.active : DEFAULT_ROUTE
  return { active, shown: shown.length ? shown : [active], at: typeof r.at === 'number' ? r.at : 0 }
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

async function load($: EngineInterface) {
  // 1) Lo guardado en esta compu (la versión 0.1 guardaba la ruta variada como 'progress').
  const local: Record<string, Progress> = {}
  for (const r of ROUTES) {
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
    for (const r of ROUTES) {
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
    if (remoteSettings && remoteSettings.at > mineSettings.at) await update($, settings, () => remoteSettings)
    else if (mineSettings.at > (remoteSettings?.at ?? -1)) toPush.push('ajustes')
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

const next = ($: EngineInterface) =>
  changeActive($, (p, r) => ({ ...p, done: { ...p.done, [p.cur]: true }, cur: Math.min(r.steps.length - 1, p.cur + 1), at: Date.now() }))

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

const openRoute = ($: EngineInterface, id: string) =>
  setSettings($, s => ({ ...s, active: id, shown: s.shown.includes(id) ? s.shown : [...s.shown, id] })).then(() =>
    update($, view, () => 'paso' as View),
  )

const toggleShown = ($: EngineInterface, id: string) =>
  setSettings($, s => {
    if (!s.shown.includes(id)) return { ...s, shown: [...s.shown, id] }
    if (s.shown.length === 1) return s
    const shown = s.shown.filter(x => x !== id)
    return { ...s, shown, active: s.active === id ? shown[0] : s.active }
  })

// --- Cabecera: tarjeta azul noche con el zorrito, el avance y el recorrido por tramos.

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// El zorrito de Naummi abrazando su libro, con su plantita al lado, parados en el piso.
// Coordenadas: píxeles de la ilustración original, escalados a la cabecera.
const SCENE = { k: 0.2712, x: 209, y: 8, ox: FOX_BOX[0]!, oy: FOX_BOX[1]! }
const at = (px: number, py: number): [number, number] => [SCENE.x + (px - SCENE.ox) * SCENE.k, SCENE.y + (py - SCENE.oy) * SCENE.k]
const box = (b: number[]) => {
  const [x, y] = at(b[0]!, b[1]!)
  return { x, y, w: (b[2]! - b[0]!) * SCENE.k, h: (b[3]! - b[1]!) * SCENE.k }
}

function foxScene(cheer: boolean): string {
  const fox = box(FOX_BOX), plant = box(PLANT_BOX)
  const [fx, fy] = at(700, 604) // entre las patas
  const [px, py] = at(890, 621) // base de la maceta
  const [hx, hy] = at(655, 200) // cabeza
  const sparks = cheer
    ? [[-34, -18], [30, -26], [-40, 12], [38, 8], [0, -44]]
        .map(([dx, dy], i) => `<circle cx="${(hx + dx!).toFixed(1)}" cy="${(hy + dy!).toFixed(1)}" r="2" fill="${i % 2 ? MINT : '#f7d76b'}" opacity="0">
  <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="${(0.1 + i * 0.12).toFixed(2)}s" repeatCount="3"/>
  <animate attributeName="r" values="1;3;1" dur="1.2s" begin="${(0.1 + i * 0.12).toFixed(2)}s" repeatCount="3"/>
</circle>`).join('')
    : ''
  const f = (n: number) => n.toFixed(1)
  return `<ellipse cx="${f(fx - 4)}" cy="${f(fy + 1)}" rx="96" ry="10" fill="url(#floor)"/>
<ellipse cx="${f(fx)}" cy="${f(fy + 0.5)}" rx="33" ry="4.6" fill="#020a12" opacity="0.55"/>
<ellipse cx="${f(px)}" cy="${f(py + 0.3)}" rx="15" ry="3.2" fill="#020a12" opacity="0.5"/>
<g transform="translate(${f(fx)} ${f(fy)})"><g>
  <animateTransform attributeName="transform" type="scale" values="1 1;1.006 1.014;1 1" keyTimes="0;0.5;1" dur="3.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>
  <image href="${FOX_IMG}" x="${f(fox.x - fx)}" y="${f(fox.y - fy)}" width="${f(fox.w)}" height="${f(fox.h)}"/>
</g></g>
<g>
  <animateTransform attributeName="transform" type="rotate" values="-2.2 ${f(px)} ${f(py)};2.2 ${f(px)} ${f(py)};-2.2 ${f(px)} ${f(py)}" dur="4.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>
  <image href="${PLANT}" x="${f(plant.x)}" y="${f(plant.y)}" width="${f(plant.w)}" height="${f(plant.h)}"/>
</g>
${sparks}`
}

function heroSvg(route: Route, p: Progress, cheer = false): string {
  const W = 360, H = 190
  const total = route.steps.length
  const n = countDone(p)
  const pct = Math.round((n / total) * 100)
  const leg = route.steps[p.cur][0]
  const sans = `font-family="${DISPLAY_FONT}"`
  const mono = 'font-family="ui-monospace,SFMono-Regular,Menlo,monospace"'

  // Una marca por parada, agrupadas por tramo con aire entre grupos.
  const x0 = 20, y = 170, groupGap = 7
  const gaps = route.legs.length - 1
  const tickW = (W - 2 * x0 - groupGap * gaps) / total
  const ticks: string[] = []
  route.steps.forEach((s, i) => {
    const x = x0 + i * tickW + s[0] * groupGap
    const isCur = i === p.cur
    const fill = p.done[i] ? FOX : isCur ? '#ffffff' : 'rgba(255,255,255,0.16)'
    const h = isCur ? 12 : 8
    const pad = Math.min(0.8, tickW * 0.12)
    ticks.push(`<rect x="${(x + pad).toFixed(1)}" y="${y - h / 2}" width="${(tickW - 2 * pad).toFixed(1)}" height="${h}" rx="1.6" fill="${fill}"/>`)
  })

  const headline = n === total ? '¡Ruta completa!' : `Parada ${p.cur + 1}`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs><style>${INTER_FACES}</style>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${NIGHT}"/><stop offset="1" stop-color="${NIGHT_2}"/></linearGradient>
  <radialGradient id="floor" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${MINT}" stop-opacity="0.16"/><stop offset="1" stop-color="${MINT}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${FOX}" stop-opacity="0.35"/><stop offset="1" stop-color="${FOX}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" rx="18" fill="url(#bg)"/>
<circle cx="${W - 82}" cy="78" r="78" fill="url(#glow)"/>
${foxScene(cheer)}
<text x="20" y="34" ${mono} font-size="10" letter-spacing="1.6" fill="${MINT}">${esc(route.name.toUpperCase())}</text>
<text x="20" y="70" ${sans} font-size="26" font-weight="700" letter-spacing="-0.5" fill="#ffffff">${esc(headline)}</text>
<text x="20" y="94" ${sans} font-size="13" fill="rgba(255,255,255,0.72)">${n} de ${total} hechas · ${pct}%</text>
<text x="20" y="${y - 16}" ${mono} font-size="9" letter-spacing="1" fill="${MINT}">${esc(route.legs[leg].toUpperCase())}</text>
${ticks.join('')}
</svg>`
}

export const register: Register = on => {
  on('session.start', async ($, e, nxt) => {
    await $.command.register({ name: 'microdosis', description: 'Abrir el panel de Microdosis' })
    await $.command.register({ name: 'ok', description: 'Marcar hecho el paso de Microdosis y pasar al siguiente' })
    void $.ui.open({ id: PANE, title: 'Microdosis' })
    void load($)
    return nxt(e)
  })

  on('command.run', { command: 'microdosis' }, async $ => {
    await $.ui.open({ id: PANE, title: 'Microdosis' })
    return { text: 'Panel de Microdosis abierto.' }
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
    const s = await read($, settings)
    const all = await read($, byRoute)
    const sy = await read($, sync)
    const syncText =
      sy === 'nube' ? 'Sincronizado con claude.ai' : sy === 'local' ? 'Guardado en esta compu' : 'Conectando con claude.ai…'
    const footer = (
      <Text size="footnote" color="subtle">
        <Text color={sy === 'nube' ? 'success' : 'subtle'}>●</Text> {syncText} · /ok marca y avanza
      </Text>
    )

    // Sección Rutas: elegir qué microlearnings se muestran.
    if ((await read($, view)) === 'rutas') {
      return (
        <Box flexDirection="column" gap={2} paddingX={1} paddingY={1}>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text size="title" weight="bold">Rutas</Text>
            <Button key="back" label="← Volver" variant="secondary" onPress={() => void update($, view, () => 'paso' as View)} />
          </Box>
          <Text color="subtle">Elegí qué rutas aparecen en el panel. Cada una guarda su propio progreso.</Text>
          {ROUTES.map(r => {
            const p = all[r.id] ?? EMPTY
            const isShown = s.shown.includes(r.id)
            const isActive = s.active === r.id
            const d = countDone(p)
            return (
              <Box key={`route-${r.id}`} flexDirection="column" gap={1} paddingX={2} paddingY={1} borderStyle="round" borderColor={isShown ? FOX : 'subtle'} backgroundColor={isShown ? TINT : undefined}>
                <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Text size="heading" weight="semibold">{r.name}</Text>
                  <Text size="caption" mono color={isShown ? FOX : 'subtle'}>{isActive ? 'EN CURSO' : isShown ? 'EN EL PANEL' : 'OCULTA'}</Text>
                </Box>
                <Text>{r.blurb}</Text>
                <Text size="footnote" color="subtle">{r.pace} · {d}/{r.steps.length} hechas</Text>
                <Box flexDirection="row" gap={1} flexWrap="wrap">
                  {!isActive && (
                    <Button key={`go-${r.id}`} label={d ? 'Seguir esta ruta' : 'Empezar esta ruta'} variant="primary" onPress={() => void openRoute($, r.id)} />
                  )}
                  {!(isShown && s.shown.length === 1) && (
                    <Button key={`toggle-${r.id}`} label={isShown ? 'Quitar del panel' : 'Mostrar en el panel'} variant="secondary" onPress={() => void toggleShown($, r.id)} />
                  )}
                </Box>
              </Box>
            )
          })}
          {footer}
        </Box>
      )
    }

    // Vista del paso.
    const route = routeById(s.active)
    const total = route.steps.length
    const p = all[route.id] ?? EMPTY
    const cur = Math.min(p.cur, total - 1)
    const [, title, body, take, q, opts, right] = route.steps[cur]
    const picked = p.ans[cur]
    const n = countDone(p)

    return (
      <Box flexDirection="column" gap={2} paddingX={1} paddingY={1}>
        <Box flexDirection="row" gap={1} flexWrap="wrap" alignItems="center">
          {s.shown.length > 1 &&
            s.shown.map(id => (
              <Button key={`tab-${id}`} label={routeById(id).name} variant={id === route.id ? 'primary' : 'secondary'} onPress={() => void openRoute($, id)} />
            ))}
          <Button key="routes" label={s.shown.length > 1 ? 'Rutas' : 'Elegir rutas'} variant="secondary" onPress={() => void update($, view, () => 'rutas' as View)} />
        </Box>

        {!Svg ? (
          <Box flexDirection="column">
            <Text bold color={FOX}>{route.name} · Parada {cur + 1}</Text>
            <Text color="subtle">{'▮'.repeat(n)}{'▯'.repeat(total - n)} {n}/{total}</Text>
          </Box>
        ) : (
          <Svg source={heroSvg(route, { ...p, cur }, picked === right)} alt={`${route.name}: parada ${cur + 1}, ${n} de ${total} hechas`} />
        )}

        <Box flexDirection="column" gap={1}>
          <Text size="title" weight="bold">{title}</Text>
          {body.split('\n\n').map(par => <Text>{par}</Text>)}
        </Box>

        <Box flexDirection="column" gap={1} paddingX={2} paddingY={1} backgroundColor={TINT} borderStyle="round" borderColor={FOX}>
          <Text size="caption" mono color={FOX}>PARA LLEVARTE</Text>
          <Text weight="medium">{take}</Text>
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
                {picked === right ? '¡Bien! El zorrito está orgulloso.' : `Casi. Era «${opts[right]}».`}
              </Text>
            </Box>
          )}
        </Box>

        <Box flexDirection="row" gap={1} alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Box flexDirection="row" gap={1}>
            <Button key="prev" label="← Anterior" variant="secondary" onPress={() => void go($, cur - 1)} />
            <Button key="rand" label="Al azar" variant="secondary" onPress={() => void random($)} />
          </Box>
          <Button key="next" label={cur === total - 1 ? 'Terminar' : 'Siguiente →'} variant="primary" onPress={() => void next($)} />
        </Box>

        {footer}
      </Box>
    )
  })
}
