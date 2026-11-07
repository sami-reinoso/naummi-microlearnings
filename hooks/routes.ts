import { LEGS, STEPS } from './steps'
import type { Step } from './steps'
import { ASTRO, ASTRO_LEGS, ESCRIBIR, ESCRIBIR_LEGS, PRODUCTO, PRODUCTO_LEGS } from './rutas-largas'

export type Route = {
  id: string
  name: string
  blurb: string
  pace: string
  legs: string[]
  steps: Step[]
}

// La primera ruta es la que se muestra por defecto.
export const ROUTES: Route[] = [
  { id: 'variado', name: 'Variado', blurb: 'Datos cortos sobre temas al azar: mente, física, palabras, cielo, plata y números raros.', pace: '48 paradas · 1 min', legs: LEGS, steps: STEPS },
  { id: 'astro', name: 'Astrología: el mapa', blurb: 'De dónde viene, cómo se arma el zodíaco, elementos, casas, aspectos y qué dice la ciencia.', pace: '8 paradas · 3 min', legs: ASTRO_LEGS, steps: ASTRO },
  { id: 'producto', name: 'Producto', blurb: 'Entender un problema, validar barato y construir algo que la gente siga usando.', pace: '8 paradas · 3 min', legs: PRODUCTO_LEGS, steps: PRODUCTO },
  { id: 'escribir', name: 'Escribir claro', blurb: 'Hábitos simples para que mails, documentos y mensajes se entiendan a la primera.', pace: '8 paradas · 3 min', legs: ESCRIBIR_LEGS, steps: ESCRIBIR },
]

export const DEFAULT_ROUTE = ROUTES[0].id

export const routeById = (id: string): Route => ROUTES.find(r => r.id === id) ?? ROUTES[0]
