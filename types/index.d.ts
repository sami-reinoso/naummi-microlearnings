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
}
// Examen en curso: preguntas en orden mezclado y respuestas dadas.
export type Exam = { routeId: string; order: number[]; answers: number[]; result?: { score: number; total: number; passed: boolean; code?: string } }
export type Sync = 'cargando' | 'nube' | 'local'
export type View = 'paso' | 'rutas' | 'examen'

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
    }
  }
}
