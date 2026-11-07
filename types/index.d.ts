export type Progress = {
  cur: number
  done: Record<string, boolean>
  ans: Record<string, number>
  at: number
}
// Examen aprobado de un nivel: puntaje, fecha y código del certificado.
export type Pass = { score: number; total: number; at: number; code: string; attempts: number }
export type Settings = {
  active: string
  shown: string[]
  at: number
  passes?: Record<string, Pass>
  attempts?: Record<string, number>
  certName?: string
  welcomed?: boolean
  // Camino elegido en «Elige tu camino» (id de hooks/caminos.ts).
  path?: string
}
// Examen en curso: preguntas en orden mezclado y respuestas dadas.
export type Exam = { routeId: string; order: number[]; answers: number[]; result?: { score: number; total: number; passed: boolean; code?: string } }
// Ruta que se está generando con /nueva-ruta.
export type Creating = { topic: string; status: 'generando' | 'error'; msg?: string }
export type Sync = 'cargando' | 'nube' | 'local'
export type View = 'paso' | 'rutas' | 'examen' | 'caminos'

declare module 'claude-code' {
  interface PluginState {
    microdosis: {
      byRoute: Record<string, Progress>
      prefs: Settings
      sync: Sync
      view: View
      query: string
      tabStart: number
      exam: Exam | null
      expanded: Record<string, string>
      creating: Creating | null
      customCount: number
      brandRev: number
    }
  }
}
