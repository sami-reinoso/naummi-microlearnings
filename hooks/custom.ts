import type { ExamQ, Route } from './routes'
import type { Step } from './steps'

// Rutas creadas con /nueva-ruta: el pedido al modelo, la validación y el armado de los tres niveles.

export const GEN_SYSTEM = `Sos autora de microlearnings en castellano rioplatense (voseo), claros, precisos y sin relleno.
Armás rutas de aprendizaje en tres niveles de dificultad creciente: Fundamentos, Intermedio y Avanzado.
Cada nivel tiene 6 paradas y un examen de 8 preguntas.

Respondé SOLO con JSON válido, sin texto antes ni después, con esta forma exacta:
{
  "name": "Nombre corto de la ruta (máx. 28 caracteres)",
  "keywords": ["5 a 8 palabras clave en minúscula"],
  "levels": [
    {
      "blurb": "Una frase que diga qué cubre el nivel",
      "legs": ["Tramo 1", "Tramo 2"],
      "steps": [
        [0, "Título breve", "Texto de 60 a 110 palabras en uno o dos párrafos separados por una línea en blanco (\\n\\n). Si el tema es técnico, podés incluir un párrafo de código que empiece con \`\`\`lenguaje y termine con \`\`\`.", "Para llevarte: una frase que resuma la idea", "Pregunta rápida", ["opción", "opción", "opción"], 1]
      ],
      "exam": [["Pregunta de examen distinta de las de las paradas", ["opción", "opción", "opción"], 0]]
    }
  ]
}

Reglas:
- Exactamente 3 niveles; cada uno con exactamente 6 paradas (las 3 primeras en el tramo 0 y las 3 últimas en el tramo 1) y 8 preguntas de examen.
- Cada pregunta tiene exactamente 3 opciones y el índice de la correcta (0, 1 o 2). Variá la posición de la correcta.
- Las preguntas del examen evalúan comprensión y aplicación; no repiten las de las paradas.
- La dificultad sube de verdad entre niveles.
- Solo información correcta y verificable. Si el tema es de salud, legal o dinero, explicá conceptos generales y no des consejos personalizados.`

const isStr = (v: unknown, max = 2000): v is string => typeof v === 'string' && v.trim().length > 0 && v.length <= max
const isOpts = (v: unknown): v is string[] => Array.isArray(v) && v.length === 3 && v.every(o => isStr(o, 200))
const isIdx = (v: unknown): v is number => v === 0 || v === 1 || v === 2

function cleanStep(raw: unknown, i: number): Step | null {
  if (!Array.isArray(raw) || raw.length < 7) return null
  const [, title, body, take, q, opts, right] = raw
  if (!isStr(title, 120) || !isStr(body, 3000) || !isStr(take, 400) || !isStr(q, 300) || !isOpts(opts) || !isIdx(right)) return null
  return [i < 3 ? 0 : 1, title.trim(), body.trim(), take.trim(), q.trim(), opts.map(o => o.trim()), right]
}

function cleanExam(raw: unknown): ExamQ | null {
  if (!Array.isArray(raw) || raw.length < 3) return null
  const [q, opts, right] = raw
  if (!isStr(q, 300) || !isOpts(opts) || !isIdx(right)) return null
  return [q.trim(), opts.map(o => o.trim()), right]
}

const slug = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'ruta'

// Convierte la respuesta del modelo en tres rutas (una por nivel) o explica qué falló.
export function buildCustomRoutes(text: string, topic: string): { routes: Route[] } | { error: string } {
  const start = text.indexOf('{'), end = text.lastIndexOf('}')
  if (start < 0 || end <= start) return { error: 'La respuesta no trajo una ruta.' }
  let data: Record<string, unknown>
  try {
    data = JSON.parse(text.slice(start, end + 1))
  } catch {
    return { error: 'La respuesta vino incompleta.' }
  }
  const name = isStr(data.name, 60) ? data.name.trim() : topic.slice(0, 40)
  const keywords = Array.isArray(data.keywords) ? data.keywords.filter((k): k is string => isStr(k, 40)).slice(0, 10) : []
  const levels = Array.isArray(data.levels) ? data.levels.slice(0, 3) : []
  if (levels.length !== 3) return { error: 'Faltan niveles en la ruta generada.' }
  const track = `c-${slug(name)}-${Date.now().toString(36).slice(-4)}`
  const LEVELS = ['Fundamentos', 'Intermedio', 'Avanzado']
  const routes: Route[] = []
  for (let l = 0; l < 3; l++) {
    const lv = levels[l] as Record<string, unknown>
    const steps = (Array.isArray(lv?.steps) ? lv.steps : []).map((s, i) => cleanStep(s, i)).filter((s): s is Step => !!s).slice(0, 6)
    const exam = (Array.isArray(lv?.exam) ? lv.exam : []).map(cleanExam).filter((q): q is ExamQ => !!q).slice(0, 8)
    if (steps.length < 4 || exam.length < 6) return { error: `El nivel ${LEVELS[l]} vino incompleto.` }
    const legs = Array.isArray(lv.legs) && lv.legs.length >= 2 && lv.legs.every(x => isStr(x, 40)) ? (lv.legs as string[]).slice(0, 2) : ['Primera parte', 'Segunda parte']
    routes.push({
      id: `${track}-${l + 1}`, track, trackName: name, custom: true, level: (l + 1) as 1 | 2 | 3,
      topic: 'Mis rutas', name: `${name} · ${LEVELS[l]}`,
      keywords: [...keywords, slug(topic)],
      blurb: isStr(lv.blurb, 200) ? lv.blurb.trim() : `Nivel ${LEVELS[l].toLowerCase()} de ${name}.`,
      pace: `${steps.length} paradas · 3 min`, legs, steps, exam,
    })
  }
  return { routes }
}

// Lo que se guarda: rutas completas, para que se vean igual en otra compu.
export function cleanCustomList(raw: unknown): Route[] {
  if (!Array.isArray(raw)) return []
  return raw.filter((r): r is Route =>
    !!r && typeof r === 'object' && typeof (r as Route).id === 'string' && (r as Route).custom === true &&
    Array.isArray((r as Route).steps) && (r as Route).steps.length > 0,
  )
}
