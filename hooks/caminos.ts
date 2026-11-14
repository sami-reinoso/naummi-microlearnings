// Caminos: conjuntos de rutas ya armados para un rol y un nivel de experiencia (Jr, Ssr, Sr…).
// Un camino no tiene progreso propio: se calcula con el avance de cada ruta, así lo que hiciste
// en un camino cuenta para todos los que incluyen esa ruta.

// Pieza de un camino: una pista hasta cierto nivel ([pista, nivel]) o una ruta suelta por su id.
type Piece = [string, 1 | 2 | 3] | string

export type Camino = {
  id: string
  family: string
  level: number // 0, 1, 2: posición dentro de la familia
  label: string // Jr, Ssr, Sr…
  name: string
  blurb: string
  routes: string[]
}

export type Family = { id: string; name: string; area: string; blurb: string; caminos: Camino[] }

// Ordena por nivel: primero todos los niveles 1, después los 2 y los 3, así avanzás parejo.
// Las rutas sueltas van con los niveles 1, en el orden en que aparecen.
function expand(pieces: Piece[]): string[] {
  const out: string[] = []
  for (const lvl of [1, 2, 3]) {
    for (const p of pieces) {
      if (typeof p === 'string') { if (lvl === 1) out.push(p) }
      else if (p[1] >= lvl) out.push(`${p[0]}-${lvl}`)
    }
  }
  return out
}

type Def = { id: string; name: string; area: string; blurb: string; labels?: string[]; levels: [string, Piece[]][] }

const JR_SSR_SR = ['Jr', 'Ssr', 'Sr']

const DEFS: Def[] = [
  // --- Desarrollo
  {
    id: 'frontend-vue', name: 'Frontend con Vue', area: 'Desarrollo',
    blurb: 'Interfaces web con Vue 3 y TypeScript, trabajando en equipo con Git.',
    levels: [
      ['Lo básico para entrar a un equipo: componentes, reactividad, tipos y commits prolijos.', [['vue', 1], ['ts', 1], ['git', 1], 'escribir', ['ia', 1]]],
      ['Componentes que se comunican, tipos más finos, ramas y PRs, y criterio de diseño.', [['vue', 2], ['ts', 2], ['git', 2], ['diseno', 1], ['ingles', 1], 'escribir', ['ia', 2]]],
      ['Arquitectura, rendimiento y tipos avanzados; explicar decisiones y pensar en producto.', [['vue', 3], ['ts', 3], ['git', 3], ['diseno', 2], ['ingles', 2], ['oratoria', 1], 'escribir', 'producto', ['ia', 3]]],
    ],
  },
  {
    id: 'web-ts', name: 'Desarrollo web con TypeScript', area: 'Desarrollo',
    blurb: 'TypeScript a fondo, sin atarse a un framework, con Git y buenas prácticas.',
    levels: [
      ['Tipos básicos, funciones tipadas y el flujo diario con Git.', [['ts', 1], ['git', 1], ['ia', 1]]],
      ['Genéricos, uniones y narrowing; ramas, rebase y revisiones de código.', [['ts', 2], ['git', 2], ['vue', 1], ['ingles', 1], 'escribir', ['ia', 2]]],
      ['Tipos avanzados, historia limpia del repo y comunicación técnica.', [['ts', 3], ['git', 3], ['vue', 2], ['ingles', 2], 'escribir', ['ia', 3]]],
    ],
  },
  {
    id: 'backend-net', name: 'Backend con C# y .NET', area: 'Desarrollo',
    blurb: 'APIs y servicios con C# y .NET, con bases de datos SQL.',
    levels: [
      ['Sintaxis de C#, consultas SQL básicas y control de versiones.', [['csharp', 1], ['sql', 1], ['git', 1], ['ia', 1]]],
      ['C# intermedio, joins y agregaciones, ramas y PRs, e inglés técnico.', [['csharp', 2], ['sql', 2], ['git', 2], ['ingles', 1], 'escribir', ['ia', 2]]],
      ['C# avanzado, SQL de alto nivel, Git avanzado y liderar conversaciones técnicas.', [['csharp', 3], ['sql', 3], ['git', 3], ['ingles', 2], ['oratoria', 1], 'escribir', ['ia', 3]]],
    ],
  },
  {
    id: 'fullstack', name: 'Full stack: Vue + .NET', area: 'Desarrollo',
    blurb: 'Las dos puntas: frontend con Vue y TypeScript, backend con C# y SQL.',
    levels: [
      ['Lo esencial de cada capa para poder tocar las dos.', [['vue', 1], ['ts', 1], ['csharp', 1], ['sql', 1], ['git', 1], ['ia', 1]]],
      ['Integrar frontend y backend con confianza en cada lado.', [['vue', 2], ['ts', 2], ['csharp', 2], ['sql', 2], ['git', 2], ['ingles', 1], 'escribir', ['ia', 2]]],
      ['Diseñar el sistema completo y explicar sus decisiones.', [['vue', 3], ['ts', 3], ['csharp', 3], ['sql', 3], ['git', 3], ['ingles', 2], ['oratoria', 1], 'producto', ['ia', 3]]],
    ],
  },
  {
    id: 'python-dev', name: 'Desarrollo con Python', area: 'Desarrollo',
    blurb: 'Scripts, automatizaciones y servicios con Python, con datos en SQL.',
    levels: [
      ['Python desde cero y el día a día con Git.', [['python', 1], ['git', 1], ['ia', 1]]],
      ['Python intermedio, consultas SQL y trabajo en equipo.', [['python', 2], ['sql', 1], ['git', 2], ['ingles', 1], 'escribir', ['ia', 2]]],
      ['Python avanzado, SQL sólido y comunicar el trabajo técnico.', [['python', 3], ['sql', 2], ['git', 3], ['ingles', 2], ['oratoria', 1], ['ia', 3]]],
    ],
  },
  // --- Datos
  {
    id: 'analista-datos', name: 'Análisis de datos', area: 'Datos',
    blurb: 'Sacar respuestas de los datos con SQL y Python, y contarlas bien.',
    levels: [
      ['Consultas SQL y Python para explorar datos.', [['sql', 1], ['python', 1], 'escribir', ['ia', 1]]],
      ['Agregaciones, joins y análisis con Python; presentar hallazgos.', [['sql', 2], ['python', 2], ['oratoria', 1], 'escribir', 'producto', ['ia', 2]]],
      ['SQL avanzado, Python fluido y llevar los datos a decisiones de producto.', [['sql', 3], ['python', 3], ['oratoria', 2], ['ingles', 1], 'escribir', 'producto', ['ia', 3]]],
    ],
  },
  {
    id: 'ingenieria-datos', name: 'Ingeniería de datos', area: 'Datos',
    blurb: 'Mover, limpiar y modelar datos con SQL, Python y Git.',
    levels: [
      ['Las bases: SQL, Python y versionar el código.', [['sql', 1], ['python', 1], ['git', 1], ['ia', 1]]],
      ['Modelado y transformaciones; scripts mantenibles.', [['sql', 2], ['python', 2], ['git', 2], ['ingles', 1], ['ia', 2]]],
      ['Rendimiento, consultas complejas y documentar pipelines.', [['sql', 3], ['python', 3], ['git', 3], ['ingles', 2], 'escribir', ['ia', 3]]],
    ],
  },
  // --- Producto y diseño
  {
    id: 'ux-ui', name: 'Diseño UX/UI', area: 'Producto y diseño',
    blurb: 'Diseñar interfaces claras, entender el producto y defender tus decisiones.',
    levels: [
      ['Principios de diseño de interfaces y textos que se entienden.', [['diseno', 1], 'escribir', 'producto', ['ia', 1]]],
      ['Sistemas de diseño, presentar propuestas y un poco de código.', [['diseno', 2], ['oratoria', 1], ['vue', 1], ['ingles', 1], 'escribir', 'producto', ['ia', 2]]],
      ['Diseño avanzado, liderar críticas y hablar el idioma de desarrollo.', [['diseno', 3], ['oratoria', 2], ['vue', 1], ['ts', 1], ['ingles', 2], 'producto', ['ia', 2]]],
    ],
  },
  {
    id: 'product-manager', name: 'Product Manager', area: 'Producto y diseño',
    blurb: 'Decidir qué construir, con datos, diseño y buena comunicación.',
    levels: [
      ['Producto, escritura clara y las primeras consultas a los datos.', ['producto', 'escribir', ['sql', 1], ['diseno', 1], ['ia', 1]]],
      ['Priorizar con datos, presentar al equipo y trabajar con diseño.', ['producto', 'escribir', ['sql', 2], ['diseno', 2], ['oratoria', 1], ['ingles', 1], ['ia', 2]]],
      ['Liderar la visión: presentar a dirección, datos finos y equipos en inglés.', ['producto', 'escribir', ['sql', 2], ['diseno', 2], ['oratoria', 3], ['ingles', 3], ['git', 1], ['ia', 3]]],
    ],
  },
  // --- Carrera y habilidades
  {
    id: 'tech-lead', name: 'Liderazgo técnico', area: 'Carrera y habilidades',
    labels: ['Referente', 'Tech Lead', 'Staff'],
    blurb: 'Pasar de resolver tareas a guiar al equipo: comunicar, documentar y decidir.',
    levels: [
      ['Ser la persona a la que el equipo consulta: Git sólido y explicaciones claras.', [['git', 2], ['oratoria', 1], ['ingles', 1], 'escribir', ['ia', 2]]],
      ['Liderar un equipo: presentar, revisar, priorizar y escribir decisiones.', [['git', 3], ['oratoria', 2], ['ingles', 2], 'escribir', 'producto', ['ia', 3]]],
      ['Influir más allá del equipo: hablar en público y trabajar en inglés.', [['git', 3], ['oratoria', 3], ['ingles', 3], 'escribir', 'producto', ['diseno', 1], ['ia', 3]]],
    ],
  },
  {
    id: 'remoto-exterior', name: 'Trabajar para el exterior', area: 'Carrera y habilidades',
    labels: ['Primeros pasos', 'En camino', 'Listo'],
    blurb: 'Inglés de trabajo, comunicación por escrito y ordenar tu plata en otra moneda.',
    levels: [
      ['Inglés para el día a día del trabajo y mensajes que se entienden.', [['ingles', 1], 'escribir', ['finanzas', 1]]],
      ['Reuniones y entrevistas en inglés, presentar tu trabajo y planificar ingresos.', [['ingles', 2], ['oratoria', 1], ['finanzas', 2], 'escribir', ['git', 1]]],
      ['Inglés fluido para negociar y liderar, y finanzas de largo plazo.', [['ingles', 3], ['oratoria', 2], ['finanzas', 3], 'escribir']],
    ],
  },
  {
    id: 'freelance', name: 'Freelance', area: 'Carrera y habilidades',
    labels: ['Arrancando', 'Con clientes', 'Consolidado'],
    blurb: 'Venderte, entender al cliente y que tus números cierren.',
    levels: [
      ['Finanzas básicas, propuestas escritas y entender qué necesita el cliente.', [['finanzas', 1], 'escribir', 'producto', ['ia', 1]]],
      ['Presentar propuestas, clientes del exterior y ahorrar para los meses flojos.', [['finanzas', 2], ['oratoria', 1], ['ingles', 1], 'escribir', 'producto', ['ia', 2]]],
      ['Negociar con confianza, clientes en inglés e inversión de largo plazo.', [['finanzas', 3], ['oratoria', 2], ['ingles', 2], 'escribir', 'producto', ['ia', 3]]],
    ],
  },
  {
    id: 'comunicar', name: 'Comunicar mejor', area: 'Carrera y habilidades',
    labels: ['Básico', 'Intermedio', 'Avanzado'],
    blurb: 'Escribir, hablar y presentar con claridad, en español y en inglés.',
    levels: [
      ['Escribir claro y perderle el miedo a hablar.', ['escribir', ['oratoria', 1]]],
      ['Estructurar una charla y comunicar en inglés.', ['escribir', ['oratoria', 2], ['ingles', 1]]],
      ['Presentar con impacto, en los dos idiomas.', ['escribir', ['oratoria', 3], ['ingles', 2]]],
    ],
  },
]

export const AREAS = ['Desarrollo', 'Datos', 'Producto y diseño', 'Carrera y habilidades']

export const FAMILIES: Family[] = DEFS.map(d => {
  const labels = d.labels ?? JR_SSR_SR
  return {
    id: d.id, name: d.name, area: d.area, blurb: d.blurb,
    caminos: d.levels.map(([blurb, pieces], i) => ({
      id: `${d.id}-${i + 1}`, family: d.id, level: i, label: labels[i]!,
      name: `${d.name} · ${labels[i]}`, blurb, routes: expand(pieces),
    })),
  }
})

export const CAMINOS: Camino[] = FAMILIES.flatMap(f => f.caminos)

export const caminoById = (id: string | undefined): Camino | undefined => CAMINOS.find(c => c.id === id)
