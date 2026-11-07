import type { EngineInterface } from 'claude-code'

// Marca inyectable: logo, nombre y sistema de diseño.
// Por defecto usa el sistema de Claude: el panel toma los colores del tema de Claude Code
// (que siguen el tema claro u oscuro de cada persona) y la cabecera, la paleta de Claude.

// Colores de la cabecera. La cabecera es un SVG que se dibuja como imagen, así que no puede usar
// los colores del tema de Claude Code: lleva colores fijos, con una variante oscura opcional.
export type Palette = {
  bg: string // fondo (inicio del degradé)
  bg2: string // fondo (fin del degradé)
  accent: string // paradas hechas y brillo
  accentSoft: string // rótulos chicos y destellos
  text: string // titular
  textMuted: string // subtítulo
  track: string // paradas pendientes
  spark: string // segundo color de los destellos
  shadow: string // sombra del piso
}

export type Theme = Palette & {
  // Variante para tema oscuro (prefers-color-scheme: dark). Sin ella, la cabecera es igual en los dos.
  dark?: Partial<Palette>
  // Colores del panel: una clave del tema de Claude Code ('claude', 'subtle'…) o un color.
  panelAccent: string // bordes de las tarjetas destacadas
  panelTint?: string // fondo de las tarjetas destacadas; sin él, sin fondo
  radius: number // radio de la cabecera, en px
  displayFont: string // font-family del titular
  monoFont: string // font-family de los rótulos
  fontFaces: string // @font-face incrustados en la cabecera (con url(data:...))
}

export type Brand = {
  id: string // 'claude', 'naummi' o 'custom'
  name: string
  // Logo como data URI. Sin logo se dibuja el zorrito.
  logo: string | null
  // Nombre de la mascota para los mensajes («El zorrito»). Sin mascota, mensajes neutros.
  mascot: string | null
  theme: Theme
  // Textos propios del proyecto; lo que falta usa los de Microdosis.
  messages: Partial<Messages>
  // Rutas por defecto del proyecto: la primera es la que se abre.
  routes: string[]
  // Lo que no se pudo aplicar, para avisar una vez.
  warnings: string[]
}

export type Messages = {
  welcomeTitle: string // «Hola, soy Microdosis»
  welcomeText: string // el párrafo de bienvenida
  finished: string // aviso al terminar una ruta
  correct: string // respuesta correcta
  wrong: string // respuesta incorrecta; {respuesta} se reemplaza por la correcta
  creating: string // mientras se genera una ruta con IA
}
const MESSAGE_KEYS: Array<keyof Messages> = ['welcomeTitle', 'welcomeText', 'finished', 'correct', 'wrong', 'creating']

const SYSTEM_SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif"
const SYSTEM_MONO = 'ui-monospace,SFMono-Regular,Menlo,monospace'

// Paleta de Claude: marfil y gris carbón con el naranja de Claude.
export const CLAUDE_THEME: Theme = {
  bg: '#faf9f5',
  bg2: '#f0eee6',
  accent: '#d97757',
  accentSoft: '#c6613f',
  text: '#141413',
  textMuted: 'rgba(20, 20, 19, 0.64)',
  track: 'rgba(20, 20, 19, 0.12)',
  spark: '#e8b04b',
  shadow: 'rgba(20, 20, 19, 0.35)',
  dark: {
    bg: '#262624',
    bg2: '#1f1e1d',
    accent: '#d97757',
    accentSoft: '#e8a48a',
    text: '#faf9f5',
    textMuted: 'rgba(250, 249, 245, 0.68)',
    track: 'rgba(250, 249, 245, 0.14)',
    shadow: '#000000',
  },
  panelAccent: 'claude',
  radius: 14,
  displayFont: SYSTEM_SANS,
  monoFont: SYSTEM_MONO,
  fontFaces: '',
}

// Paleta de Naummi: azul noche con acento durazno, en eco del naranja del zorrito.
export const NAUMMI_THEME: Theme = {
  bg: '#0f2a3d',
  bg2: '#16405a',
  accent: '#F4997A',
  accentSoft: '#FFD4C2',
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.72)',
  track: 'rgba(255,255,255,0.16)',
  spark: '#f7d76b',
  shadow: '#020a12',
  panelAccent: '#F4997A',
  panelTint: 'rgba(244, 153, 122, 0.12)',
  radius: 16,
  displayFont: `'Inter Microdosis','Inter',${SYSTEM_SANS}`,
  monoFont: SYSTEM_MONO,
  fontFaces: '', // register.tsx le suma Inter incrustada
}

export const PRESETS: Record<string, Omit<Brand, 'warnings' | 'messages' | 'routes'>> = {
  claude: { id: 'claude', name: 'Microdosis', logo: null, mascot: 'El zorrito', theme: CLAUDE_THEME },
  naummi: { id: 'naummi', name: 'Naummi', logo: null, mascot: 'El zorrito', theme: NAUMMI_THEME },
}
export const DEFAULT_PRESET = 'claude'

// --- Lectura de tokens de cualquier sistema de diseño

// Nombres con los que distintos sistemas de diseño llaman a cada token. Se comparan sin
// mayúsculas, guiones ni puntos: «color.brand.primary», «--color-primary» y «colorPrimary» sirven.
type TokenKey = keyof Palette | 'panelAccent' | 'panelTint' | 'radius' | 'displayFont' | 'monoFont' | 'fontFaces'
const ALIASES: Record<TokenKey, string[]> = {
  bg: ['bg', 'background', 'backgroundprimary', 'backgrounddefault', 'surface', 'surfaceprimary', 'brandbackground', 'herobackground', 'canvas'],
  bg2: ['bg2', 'background2', 'backgroundsecondary', 'backgroundalt', 'surface2', 'surfacesecondary', 'herobackground2', 'muted', 'backgroundmuted'],
  accent: ['accent', 'primary', 'brand', 'brandprimary', 'primarymain', 'primary500', 'brand500', 'accentdefault', 'interactive'],
  accentSoft: ['accentsoft', 'accentstrong', 'accentlight', 'accentsubtle', 'primarylight', 'primary600', 'brand600', 'secondary', 'highlight'],
  text: ['text', 'foreground', 'textprimary', 'textdefault', 'onbackground', 'onsurface', 'herotext'],
  textMuted: ['textmuted', 'textsecondary', 'mutedforeground', 'textsubtle', 'onsurfacevariant', 'herotextmuted'],
  track: ['track', 'progresstrack', 'border', 'borderdefault', 'divider', 'outline'],
  spark: ['spark', 'tertiary', 'warning', 'yellow'],
  shadow: ['shadow', 'shadowcolor'],
  panelAccent: ['panelaccent'],
  panelTint: ['paneltint', 'tint', 'accenttint', 'primarysubtle', 'primary50', 'brand50', 'backgroundaccent', 'backgroundbrand'],
  radius: ['radius', 'borderradius', 'radiuslg', 'radiuslarge', 'radiusl', 'cornerradius'],
  displayFont: ['displayfont', 'fontdisplay', 'fontheading', 'headingfont', 'fontfamilydisplay', 'fontfamilyheading', 'fontsans', 'fontfamilysans', 'fontfamily', 'font', 'fontbody'],
  monoFont: ['monofont', 'fontmono', 'fontfamilymono', 'fontcode'],
  fontFaces: ['fontfaces', 'fontface'],
}
const META = { name: ['brandname', 'name', 'brand'], logo: ['logo', 'logourl', 'logopath', 'brandlogo'], mascot: ['mascot', 'mascota'] }
const PALETTE_KEYS: Array<keyof Palette> = ['bg', 'bg2', 'accent', 'accentSoft', 'text', 'textMuted', 'track', 'spark', 'shadow']

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const TRAILING = /(default|base|main|value)$/

// Para cada token, todas las formas de nombrarlo: el camino completo y sus colas («color.brand.primary» → «brandprimary», «primary»).
function namesOf(path: string[]): string[] {
  const out = new Set<string>()
  for (let i = 0; i < path.length; i++) {
    const n = norm(path.slice(i).join(''))
    if (!n) continue
    for (const m of [n, n.replace(/^color/, '')]) {
      out.add(m)
      out.add(m.replace(TRAILING, ''))
    }
  }
  return [...out].filter(Boolean)
}

type Flat = Array<{ names: string[]; value: string | number }>

// JSON en cualquier forma: plano, anidado, W3C Design Tokens ($value) o Style Dictionary (value).
function flattenJson(node: unknown, path: string[], out: Flat): void {
  if (typeof node === 'string' || typeof node === 'number') {
    out.push({ names: namesOf(path), value: node })
    return
  }
  if (Array.isArray(node)) {
    // Una pila de fuentes: ["Inter", "sans-serif"].
    if (node.every(x => typeof x === 'string')) out.push({ names: namesOf(path), value: (node as string[]).map(f => (/\s/.test(f) ? `'${f}'` : f)).join(',') })
    return
  }
  if (!node || typeof node !== 'object') return
  const o = node as Record<string, unknown>
  for (const k of ['$value', 'value']) {
    const v = o[k]
    if (typeof v === 'string' || typeof v === 'number' || Array.isArray(v)) return flattenJson(v, path, out)
  }
  for (const [k, v] of Object.entries(o)) if (!k.startsWith('$')) flattenJson(v, [...path, k], out)
}

// Bloque entre llaves que empieza en `open` (la posición de «{»).
function block(css: string, open: number): string {
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i)
  }
  return css.slice(open + 1)
}

// CSS con custom properties (--color-primary: #f60;). Lo que está en
// @media (prefers-color-scheme: dark), .dark o [data-theme="dark"] va a la variante oscura.
function splitCss(css: string): { light: string; dark: string; faces: string } {
  let dark = ''
  let light = css
  const darkStarts = [/@media[^{]*prefers-color-scheme\s*:\s*dark[^{]*{/g, /(?:^|[\s,}])(?:\.dark|\[data-theme=["']?dark["']?\]|\[data-color-scheme=["']?dark["']?\])[^{,]*{/g]
  for (const re of darkStarts) {
    for (const m of css.matchAll(re)) {
      const body = block(css, m.index! + m[0].length - 1)
      // El «;» final cubre la última declaración, que puede venir sin él.
      dark += body + ';'
      light = light.replace(body, '')
    }
  }
  const faces = [...css.matchAll(/@font-face\s*{[^}]*}/g)].map(m => m[0]).join('')
  return { light, dark, faces }
}

function flattenCss(css: string, out: Flat, vars = new Map<string, string>()): void {
  for (const m of css.matchAll(/--([\w-]+)\s*:\s*([^;}]+)[;}]/g)) vars.set(m[1]!, m[2]!.trim())
  const resolve = (v: string, depth = 0): string =>
    depth > 5 ? v : v.replace(/var\(\s*--([\w-]+)\s*(?:,\s*([^)]+))?\)/g, (_, n: string, fb?: string) => resolve(vars.get(n) ?? fb ?? '', depth + 1))
  for (const m of css.matchAll(/--([\w-]+)\s*:\s*([^;}]+)[;}]/g)) out.push({ names: namesOf(m[1]!.split('-')), value: resolve(m[2]!.trim()) })
}

// Resuelve referencias de tokens del estilo «{color.blue.500}».
function derefs(flat: Flat): Flat {
  const byName = new Map<string, string | number>()
  for (const t of flat) for (const n of t.names) if (!byName.has(n)) byName.set(n, t.value)
  return flat.map(t => {
    if (typeof t.value !== 'string') return t
    let v: string = t.value
    for (let i = 0; i < 5 && /^\{[^}]+\}$/.test(v); i++) v = String(byName.get(norm(v.slice(1, -1))) ?? v)
    return { ...t, value: v }
  })
}

// El primer alias gana: así «accent» explícito le gana a «primary».
function pick(flat: Flat, aliases: string[]): string | number | undefined {
  for (const a of aliases) {
    const hit = flat.find(t => t.names.includes(a))
    if (hit) return hit.value
  }
  return undefined
}

function themeOf(flat: Flat, keys: TokenKey[]): Partial<Theme> {
  const theme: Record<string, string | number> = {}
  for (const key of keys) {
    const v = pick(flat, ALIASES[key])
    if (v == null || v === '') continue
    if (key === 'radius') {
      const n = typeof v === 'number' ? v : parseFloat(v)
      if (Number.isFinite(n)) theme.radius = n
    } else theme[key] = String(v)
  }
  return theme as Partial<Theme>
}

export type Tokens = { theme: Partial<Theme>; name?: string; logo?: string; mascot?: string | null }

export function parseTokens(text: string, kind: 'json' | 'css'): Tokens {
  const light: Flat = []
  const dark: Flat = []
  let faces = ''
  if (kind === 'json') {
    const json = JSON.parse(text) as Record<string, unknown>
    // Variante oscura: un grupo «dark» arriba de todo, o modes.dark.
    const modes = (json.modes ?? json.$modes) as Record<string, unknown> | undefined
    const darkNode = json.dark ?? modes?.dark
    const rest = { ...json }
    delete rest.dark
    if (modes) {
      delete rest.modes
      delete rest.$modes
      if (modes.light) flattenJson(modes.light, [], light)
    }
    flattenJson(rest, [], light)
    if (darkNode) flattenJson(darkNode, [], dark)
  } else {
    const parts = splitCss(text)
    const vars = new Map<string, string>()
    flattenCss(parts.light, light, vars)
    flattenCss(parts.dark, dark, new Map(vars))
    faces = parts.faces
  }
  const all = derefs(light)
  const theme = themeOf(all, Object.keys(ALIASES) as TokenKey[])
  if (faces) theme.fontFaces = (theme.fontFaces ?? '') + faces
  if (dark.length) {
    const d = themeOf(derefs([...dark, ...light]).slice(0, dark.length), PALETTE_KEYS) as Partial<Palette>
    if (Object.keys(d).length) theme.dark = d
  }
  const meta = (aliases: string[]) => {
    const v = pick(all, aliases)
    return typeof v === 'string' ? v : undefined
  }
  const mascot = meta(META.mascot)
  return { theme, name: meta(META.name), logo: meta(META.logo), ...(mascot !== undefined ? { mascot } : {}) }
}

// --- Colores derivados, para que alcance con dar fondo y acento.

function rgb(c: string): [number, number, number] | null {
  const h = c.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})([0-9a-f]{2})?$/i)
  if (h) {
    const s = h[1]!.length === 3 ? [...h[1]!].map(x => x + x).join('') : h[1]!
    return [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16)) as [number, number, number]
  }
  const m = c.trim().match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i)
  return m ? [+m[1]!, +m[2]!, +m[3]!] : null
}
const alpha = (c: string, a: number) => {
  const v = rgb(c)
  return v ? `rgba(${v[0]}, ${v[1]}, ${v[2]}, ${a})` : c
}
const isLight = (c: string) => {
  const v = rgb(c)
  return v ? (0.299 * v[0] + 0.587 * v[1] + 0.114 * v[2]) / 255 > 0.6 : false
}

// Completa una paleta a partir de lo que vino: con fondo y acento alcanza.
function completePalette(given: Partial<Palette>, base: Palette): Palette {
  const p = { ...base, ...given }
  if (given.bg && !given.text) p.text = isLight(p.bg) ? '#141413' : '#ffffff'
  if (given.bg && !given.bg2) p.bg2 = given.bg
  if (!given.textMuted && (given.text || given.bg)) p.textMuted = alpha(p.text, 0.68)
  if (!given.track && (given.text || given.bg)) p.track = alpha(p.text, 0.14)
  if (!given.accentSoft && given.accent) p.accentSoft = given.accent
  if (!given.shadow && given.bg) p.shadow = isLight(p.bg) ? alpha('#000000', 0.3) : '#000000'
  return p
}

export function completeTheme(given: Partial<Theme>, base: Theme = CLAUDE_THEME): Theme {
  const palette = completePalette(given, base)
  // Un sistema propio sin variante oscura se ve igual en los dos temas.
  const dark = given.dark ? completePalette(given.dark, palette) : undefined
  const custom = Object.keys(given).length > 0
  return {
    ...palette,
    ...(dark ? { dark } : {}),
    // Sin acento de panel, el del sistema; sin acento en el sistema, el naranja del tema de Claude Code.
    panelAccent: given.panelAccent ?? (given.accent ? given.accent : base.panelAccent),
    ...(given.panelTint ? { panelTint: given.panelTint } : given.accent && custom ? { panelTint: alpha(given.accent, 0.12) } : base.panelTint ? { panelTint: base.panelTint } : {}),
    radius: given.radius ?? base.radius,
    displayFont: given.displayFont ?? base.displayFont,
    monoFont: given.monoFont ?? base.monoFont,
    fontFaces: given.fontFaces ?? '',
  }
}

// --- Lectura de archivos

const MIME: Record<string, string> = { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif' }
const extOf = (p: string) => (p.split(/[?#]/)[0]!.match(/\.([a-z0-9]+)$/i)?.[1] ?? '').toLowerCase()
const dirOf = (p: string) => (p.includes('/') ? p.slice(0, p.lastIndexOf('/') + 1) : '')

async function expand($: EngineInterface, path: string, base = ''): Promise<string> {
  const p = path.trim()
  if (p.startsWith('~/')) return `${(await $.env.get('HOME')) ?? ''}${p.slice(1)}`
  if (p.startsWith('/') || !base) return p
  return base + p
}

function utf8Base64(s: string): string {
  const bytes = new TextEncoder().encode(s)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

async function loadLogo($: EngineInterface, ref: string, base: string): Promise<string> {
  const r = ref.trim()
  if (r.startsWith('data:image/')) return r
  if (/^https?:\/\//i.test(r)) throw new Error('tiene que ser un archivo local o un data URI: la cabecera no carga imágenes de internet')
  if (r.startsWith('<svg')) return `data:image/svg+xml;base64,${utf8Base64(r)}`
  const mime = MIME[extOf(r)]
  if (!mime) throw new Error(`formato no soportado (${extOf(r) || 'sin extensión'}); usá svg, png, jpg, webp o gif`)
  const { base64 } = await $.fs.read(await expand($, r, base), { as: 'bytes' })
  return `data:${mime};base64,${base64}`
}

export type BrandOptions = { brandName?: string; logo?: string; designSystem?: string; mascot?: string }

// --- Configuración del proyecto: .claude/microlearnings.json en la carpeta que abre Claude Code.
// Gana sobre los ajustes del mod. Las rutas a archivos son relativas a .claude/.

export const PROJECT_FILE = '.claude/microlearnings.json'
const PROJECT_BASE = '.claude/'

export type ProjectConfig = {
  brandName?: string
  logo?: string
  mascot?: string | null
  designSystem?: string
  colors?: Record<string, unknown>
  routes?: string[]
  messages?: Partial<Messages>
}

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)

export function cleanProject(raw: unknown): ProjectConfig {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('tiene que ser un objeto JSON')
  const r = raw as Record<string, unknown>
  // Se aceptan también los datos de marca agrupados en «brand».
  const b = (r.brand && typeof r.brand === 'object' ? r.brand : {}) as Record<string, unknown>
  const out: ProjectConfig = {}
  const name = str(r.brandName) ?? str(b.name)
  if (name) out.brandName = name
  const logo = str(r.logo) ?? str(b.logo)
  if (logo) out.logo = logo
  const mascot = 'mascot' in r ? r.mascot : b.mascot
  if (mascot === null || mascot === false) out.mascot = null
  else if (str(mascot)) out.mascot = str(mascot)!
  const ds = str(r.designSystem)
  if (ds) out.designSystem = ds
  if (r.colors && typeof r.colors === 'object' && !Array.isArray(r.colors)) out.colors = r.colors as Record<string, unknown>
  // «routes»: una lista, o { default, shown }.
  const routes = r.routes
  if (Array.isArray(routes)) out.routes = routes.filter((x): x is string => typeof x === 'string')
  else if (routes && typeof routes === 'object') {
    const o = routes as Record<string, unknown>
    const shown = Array.isArray(o.shown) ? o.shown.filter((x): x is string => typeof x === 'string') : []
    const first = str(o.default)
    out.routes = first ? [first, ...shown.filter(x => x !== first)] : shown
  }
  if (r.messages && typeof r.messages === 'object') {
    const m = r.messages as Record<string, unknown>
    const msgs: Partial<Messages> = {}
    for (const k of MESSAGE_KEYS) if (str(m[k])) msgs[k] = str(m[k])
    out.messages = msgs
  }
  return out
}

// Lee la configuración del proyecto. Sin archivo, null; con un archivo roto, el error para avisar.
export async function loadProject($: EngineInterface): Promise<{ config: ProjectConfig | null; error?: string }> {
  let text: string
  try {
    text = await $.fs.read(PROJECT_FILE)
  } catch {
    return { config: null }
  }
  try {
    return { config: cleanProject(JSON.parse(text)) }
  } catch (err) {
    return { config: null, error: `${PROJECT_FILE} no se pudo leer: ${(err as Error).message}` }
  }
}

// Arma la marca: primero el proyecto, después los ajustes del mod, después el preset.
// Lo que falla queda en `warnings` y se usa lo de abajo.
export async function loadBrand($: EngineInterface, opts: BrandOptions, project: ProjectConfig | null = null): Promise<Brand> {
  const warnings: string[] = []
  const fromProject = !!project?.designSystem
  const ds = project?.designSystem || (opts.designSystem ?? '').trim() || DEFAULT_PRESET
  let preset = PRESETS[ds.toLowerCase()]
  let tokens: Tokens = { theme: {} }
  let tokensBase = ''
  if (!preset) {
    preset = PRESETS[DEFAULT_PRESET]!
    try {
      const path = await expand($, ds, fromProject ? PROJECT_BASE : '')
      tokensBase = dirOf(path)
      const text = await $.fs.read(path)
      tokens = parseTokens(text, extOf(path) === 'css' ? 'css' : 'json')
      if (!Object.keys(tokens.theme).length && !tokens.logo) warnings.push(`El sistema de diseño ${ds} no tiene tokens reconocibles; se usa el de Claude.`)
    } catch (err) {
      warnings.push(`No se pudo leer el sistema de diseño ${ds}: ${(err as Error).message}`)
    }
  }
  // Colores sueltos del proyecto, encima del sistema de diseño.
  if (project?.colors) {
    try {
      const extra = parseTokens(JSON.stringify(project.colors), 'json').theme
      const dark = extra.dark || tokens.theme.dark ? { ...(tokens.theme.dark ?? {}), ...(extra.dark ?? {}) } : undefined
      tokens.theme = { ...tokens.theme, ...extra, ...(dark ? { dark } : {}) }
    } catch (err) {
      warnings.push(`Los colores del proyecto no se pudieron leer: ${(err as Error).message}`)
    }
  }
  let logo = preset.logo
  const [logoRef, logoBase] = project?.logo ? [project.logo, PROJECT_BASE] : opts.logo?.trim() ? [opts.logo.trim(), ''] : [tokens.logo, tokensBase]
  if (logoRef) {
    try {
      logo = await loadLogo($, logoRef, logoBase)
    } catch (err) {
      warnings.push(`No se pudo cargar el logo: ${(err as Error).message}`)
    }
  }
  const custom = Object.keys(tokens.theme).length > 0
  // Con logo propio, el zorrito deja de hablar salvo que se nombre otra mascota.
  const mascot =
    project && project.mascot !== undefined ? project.mascot
    : opts.mascot?.trim() ? opts.mascot.trim()
    : tokens.mascot !== undefined ? tokens.mascot
    : logo ? null : preset.mascot
  return {
    id: custom ? 'custom' : preset.id,
    name: project?.brandName || opts.brandName?.trim() || tokens.name || preset.name,
    logo,
    mascot: mascot || null,
    theme: custom ? completeTheme(tokens.theme, preset.theme) : preset.theme,
    messages: project?.messages ?? {},
    routes: project?.routes ?? [],
    warnings,
  }
}

// --- Cabecera: colores como variables CSS, con la variante oscura en una media query.

export function paletteCss(t: Theme): string {
  const vars = (p: Partial<Palette>) =>
    PALETTE_KEYS.filter(k => p[k]).map(k => `--${k}:${p[k]};`).join('')
  const dark = t.dark ? `@media (prefers-color-scheme: dark){svg{${vars(t.dark)}}}` : ''
  return `svg{${vars(t)}}${dark}`
}
