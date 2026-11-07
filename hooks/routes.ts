import { LEGS, STEPS } from './steps'
import type { Step } from './steps'
import { ASTRO, ASTRO_LEGS, ESCRIBIR, ESCRIBIR_LEGS, PRODUCTO, PRODUCTO_LEGS } from './rutas-largas'
import { VUE } from './content/vue'
import { CSHARP } from './content/csharp'
import { TYPESCRIPT } from './content/typescript'
import { GIT } from './content/git'
import { ORATORIA } from './content/oratoria'

// Pregunta de examen: [pregunta, opciones, índice correcto]. Nunca se repite en las paradas.
export type ExamQ = [string, string[], number]

export type Route = {
  id: string
  name: string
  topic: string
  // Rutas técnicas: una pista (track) en niveles 1, 2 y 3. Cada nivel se habilita al aprobar el anterior.
  track?: string
  level?: 1 | 2 | 3
  keywords: string[]
  blurb: string
  pace: string
  legs: string[]
  steps: Step[]
  exam?: ExamQ[]
}

export const LEVEL_NAMES = ['', 'Fundamentos', 'Intermedio', 'Avanzado']

// Orden en que se muestran los temas en la sección Rutas.
export const TOPICS = ['Tecnología', 'Comunicación', 'Producto y diseño', 'Cultura general', 'Astrología']

export const TRACK_NAMES: Record<string, string> = { vue: 'Vue 3', csharp: 'C# y .NET', ts: 'TypeScript', git: 'Git', oratoria: 'Oratoria' }

// La primera ruta es la que se muestra por defecto.
export const ROUTES: Route[] = [
  { id: 'variado', name: 'Variado', topic: 'Cultura general', keywords: ['cultura', 'curiosidades', 'ciencia', 'física', 'palabras', 'sesgos', 'cielo', 'economía', 'números'], blurb: 'Datos cortos sobre temas al azar: mente, física, palabras, cielo, plata y números raros.', pace: '48 paradas · 1 min', legs: LEGS, steps: STEPS },
  ...VUE,
  ...CSHARP,
  ...TYPESCRIPT,
  ...GIT,
  ...ORATORIA,
  { id: 'producto', name: 'Producto', topic: 'Producto y diseño', keywords: ['producto', 'ux', 'mvp', 'retención', 'métricas', 'priorizar', 'jobs to be done'], blurb: 'Entender un problema, validar barato y construir algo que la gente siga usando.', pace: '8 paradas · 3 min', legs: PRODUCTO_LEGS, steps: PRODUCTO },
  { id: 'escribir', name: 'Escribir claro', topic: 'Comunicación', keywords: ['escritura', 'redacción', 'mails', 'documentos', 'claridad', 'comunicación'], blurb: 'Hábitos simples para que mails, documentos y mensajes se entiendan a la primera.', pace: '8 paradas · 3 min', legs: ESCRIBIR_LEGS, steps: ESCRIBIR },
  { id: 'astro', name: 'Astrología: el mapa', topic: 'Astrología', keywords: ['astrología', 'zodíaco', 'signos', 'casas', 'aspectos', 'elementos', 'historia'], blurb: 'De dónde viene, cómo se arma el zodíaco, elementos, casas, aspectos y qué dice la ciencia.', pace: '8 paradas · 3 min', legs: ASTRO_LEGS, steps: ASTRO },
]

export const DEFAULT_ROUTE = ROUTES[0]!.id

export const routeById = (id: string): Route => ROUTES.find(r => r.id === id) ?? ROUTES[0]!

// Ruta previa que hay que aprobar para habilitar esta (o null si no tiene requisito).
export const prerequisite = (r: Route): string | null => (r.track && r.level && r.level > 1 ? `${r.track}-${r.level - 1}` : null)

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// Búsqueda por nombre, tema, nivel y palabras clave; todas las palabras de la consulta deben aparecer.
export function searchRoutes(query: string): Route[] {
  const words = norm(query).split(/\s+/).filter(Boolean)
  if (!words.length) return ROUTES
  return ROUTES.filter(r => {
    const hay = norm([r.name, r.topic, r.blurb, r.level ? LEVEL_NAMES[r.level] : '', ...r.keywords].join(' '))
    return words.every(w => hay.includes(w))
  })
}
