export type Progress = {
  cur: number
  done: Record<string, boolean>
  ans: Record<string, number>
  at: number
}
export type Settings = { active: string; shown: string[]; at: number }
export type Sync = 'cargando' | 'nube' | 'local'
export type View = 'paso' | 'rutas'

declare module 'claude-code' {
  interface PluginState {
    microdosis: {
      byRoute: Record<string, Progress>
      prefs: Settings
      sync: Sync
      view: View
    }
  }
}
