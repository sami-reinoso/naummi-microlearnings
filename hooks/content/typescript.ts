import type { Route } from '../routes'

// TypeScript en tres niveles. Un párrafo que empieza con ``` es un bloque de código.

export const TYPESCRIPT: Route[] = [
  {
    id: 'ts-1', track: 'ts', level: 1, topic: 'Tecnología', name: 'TypeScript · Fundamentos',
    keywords: ['typescript', 'ts', 'tipos', 'interface', 'type', 'union', 'unknown', 'javascript'],
    blurb: 'Anotaciones, inferencia, interfaces, uniones y la diferencia entre any y unknown.', pace: '6 paradas · 3 min',
    legs: ['Tipos básicos', 'Formas de datos'],
    steps: [
      [0, 'Anotar e inferir', "TypeScript agrega tipos a JavaScript y los revisa antes de ejecutar. Podés anotar, pero muchas veces el compilador los deduce solo.\n\n```ts\nlet edad: number = 30\nlet nombre = 'Ana'   // inferido: string\nnombre = 42          // error\n```\n\nAnotá los parámetros de funciones y lo que exportás; dejá que infiera lo local.", 'Anotá los bordes (parámetros, exports); inferí lo de adentro.', '¿Qué tipo infiere let nombre = "Ana"?', ['any', 'string', '"Ana" siempre'], 1],
      [0, 'Funciones tipadas', "Tipar una función documenta qué recibe y qué devuelve.\n\n```ts\nfunction precioFinal(base: number, descuento = 0): number {\n  return base * (1 - descuento)\n}\nconst saludo = (n?: string) => `Hola ${n ?? 'invitado'}`\n```\n\nEl ? marca un parámetro opcional; un valor por defecto también lo vuelve opcional.", 'El ? y los valores por defecto marcan parámetros opcionales.', '¿Qué indica n?: string?', ['Que n es obligatorio', 'Que n es opcional', 'Que n es any'], 1],
      [0, 'any frente a unknown', "any apaga la revisión: todo se permite y los errores aparecen en producción. unknown también acepta cualquier valor, pero te obliga a comprobar el tipo antes de usarlo.\n\n```ts\nfunction leer(dato: unknown) {\n  if (typeof dato === 'string') return dato.toUpperCase()\n  return ''\n}\n```\n\nPara datos externos (APIs, JSON), unknown es la opción segura.", 'Para datos desconocidos, unknown en vez de any.', '¿Qué obliga a hacer unknown?', ['Nada', 'Comprobar el tipo antes de usarlo', 'Convertirlo a string'], 1],
      [1, 'interface y type', "Las dos describen formas de objetos.\n\n```ts\ninterface Usuario { id: number; nombre: string; email?: string }\ntype Punto = { x: number; y: number }\ntype Id = number | string\n```\n\ninterface se puede extender y reabrir; type además sirve para uniones, tuplas y tipos calculados. Elegí una convención en el equipo y mantenela.", 'interface para formas extendibles; type para uniones y más.', '¿Cuál sirve para declarar number | string?', ['interface', 'type', 'enum'], 1],
      [1, 'Uniones y literales', "Una unión dice que un valor puede ser de varios tipos. Con literales, limitás a valores exactos.\n\n```ts\ntype Estado = 'pendiente' | 'pagado' | 'cancelado'\nlet e: Estado = 'pagado'\ne = 'perdido' // error\n```\n\nEs una forma liviana de enumerar opciones, con autocompletado y sin código extra en el JavaScript final.", 'Uniones de literales = opciones cerradas y autocompletadas.', '¿Qué pasa con e = "perdido" si Estado no lo incluye?', ['Funciona', 'Error de tipo', 'Se convierte a pendiente'], 1],
      [1, 'Arrays, tuplas y readonly', "string[] es un array de strings. Una tupla fija largo y tipo por posición. readonly impide modificar.\n\n```ts\nconst nombres: string[] = ['Ana', 'Luis']\nconst par: [string, number] = ['edad', 30]\nconst fijos: readonly number[] = [1, 2]\nfijos.push(3) // error\n```", 'Tuplas para posiciones fijas; readonly para no mutar.', '¿Qué es [string, number]?', ['Un array de strings o números', 'Una tupla: string en 0, number en 1', 'Un objeto'], 1],
    ],
    exam: [
      ['¿Qué deja pasar cualquier operación sin revisar?', ['unknown', 'any', 'never'], 1],
      ['function f(x = 1) — x es…', ['Obligatorio', 'Opcional, de tipo number', 'De tipo any'], 1],
      ['type T = "a" | "b". ¿Qué valor es válido?', ['"c"', '"a"', '1'], 1],
      ['Para agregar un campo a una interface ya declarada en otro archivo se puede…', ['Reabrirla con otra declaración interface del mismo nombre', 'Solo con type', 'No se puede'], 0],
      ['const t: [number, string] = ["a", 1] …', ['Es válido', 'Da error de tipo', 'Se ordena solo'], 1],
      ['¿Qué hace readonly en un array?', ['Lo congela en tiempo de ejecución siempre', 'Impide modificarlo en el chequeo de tipos', 'Nada'], 1],
      ['typeof dato === "number" dentro de un if…', ['Hace que dato sea number dentro del bloque', 'Convierte dato', 'Es inválido en TS'], 0],
      ['email?: string en una interface significa…', ['Que email puede faltar', 'Que email es null siempre', 'Que es un método'], 0],
    ],
  },
  {
    id: 'ts-2', track: 'ts', level: 2, topic: 'Tecnología', name: 'TypeScript · Intermedio',
    keywords: ['typescript', 'ts', 'narrowing', 'genericos', 'generics', 'utility types', 'keyof', 'never'],
    blurb: 'Narrowing, uniones discriminadas, genéricos, utility types y keyof.', pace: '6 paradas · 3 min',
    legs: ['Seguridad', 'Reutilizar tipos'],
    steps: [
      [0, 'Narrowing', "TypeScript afina el tipo dentro de cada rama según lo que comprobás: typeof, instanceof, in, comparaciones.\n\n```ts\nfunction largo(x: string | string[]) {\n  if (typeof x === 'string') return x.length // x: string\n  return x.join('').length                   // x: string[]\n}\n```\n\nCada comprobación reduce las posibilidades y desbloquea lo que podés hacer.", 'Comprobá y TypeScript afina el tipo por vos.', 'Después de if (typeof x === "string") return…, x es…', ['string', 'string[]', 'any'], 1],
      [0, 'Uniones discriminadas', "Si cada variante tiene un campo común con un literal distinto, TypeScript sabe cuál es cuál.\n\n```ts\ntype Resultado =\n  | { ok: true; datos: string }\n  | { ok: false; error: string }\n\nfunction mostrar(r: Resultado) {\n  return r.ok ? r.datos : r.error\n}\n```\n\nEs el patrón más útil para estados de carga, respuestas de API y eventos.", 'Un campo literal común (ok, tipo, kind) discrimina variantes.', '¿Qué hace posible usar r.datos tras chequear r.ok?', ['Un cast', 'El campo discriminante ok', 'any'], 1],
      [0, 'never y exhaustividad', "never es el tipo de lo imposible. Sirve para que el compilador avise si te olvidaste un caso.\n\n```ts\nfunction color(e: Estado): string {\n  switch (e) {\n    case 'pendiente': return 'gris'\n    case 'pagado': return 'verde'\n    case 'cancelado': return 'rojo'\n    default: const _n: never = e; return _n\n  }\n}\n```\n\nSi mañana agregás un estado, ese default deja de compilar.", 'Asignar a never en default detecta casos olvidados.', '¿Para qué se usa never en el default?', ['Para que nunca se ejecute', 'Para que el compilador detecte casos sin cubrir', 'Para retornar null'], 1],
      [1, 'Genéricos', "Un genérico es un tipo como parámetro: la función conserva la relación entre lo que entra y lo que sale.\n\n```ts\nfunction primero<T>(items: T[]): T | undefined {\n  return items[0]\n}\nconst n = primero([1, 2]) // number | undefined\n```\n\nCon extends restringís: <T extends { id: number }> exige que T tenga id.", 'Genéricos conservan el tipo de entrada en la salida.', '¿Qué devuelve primero(["a"])?', ['any', 'string | undefined', 'string[]'], 1],
      [1, 'Utility types', "TypeScript trae tipos que transforman otros.\n\n```ts\ntype Borrador = Partial<Usuario>          // todo opcional\ntype Publico = Pick<Usuario, 'id' | 'nombre'>\ntype SinEmail = Omit<Usuario, 'email'>\ntype PorId = Record<number, Usuario>\n```\n\nEvitan duplicar tipos que se derivan de uno principal.", 'Derivá tipos con Partial, Pick, Omit y Record en vez de copiarlos.', '¿Qué hace Partial<T>?', ['Borra campos', 'Vuelve opcionales todos los campos', 'Hace todo readonly'], 1],
      [1, 'keyof y typeof', "keyof da la unión de las claves de un tipo. typeof, en posición de tipo, toma el tipo de un valor.\n\n```ts\nconst config = { tema: 'oscuro', idioma: 'es' }\ntype Config = typeof config\ntype Clave = keyof Config // 'tema' | 'idioma'\n\nfunction leer<K extends keyof Config>(k: K): Config[K] {\n  return config[k]\n}\n```", 'keyof + genéricos = acceso a claves con tipos exactos.', '¿Qué es keyof { a: 1; b: 2 }?', ['"a" | "b"', '1 | 2', 'string'], 0],
    ],
    exam: [
      ['¿Qué operador comprueba si una propiedad existe para afinar el tipo?', ['in', 'of', 'has'], 0],
      ['En una unión discriminada, el discriminante suele ser…', ['Un método', 'Un campo con literal distinto en cada variante', 'Un número aleatorio'], 1],
      ['Asignar e a una variable never en el default sirve para…', ['Optimizar', 'Que falle la compilación si falta un caso', 'Ignorar errores'], 1],
      ['<T extends string> permite T igual a…', ['number', '"hola"', 'boolean'], 1],
      ['Pick<U, "id"> crea un tipo con…', ['Todo menos id', 'Solo id', 'id opcional'], 1],
      ['Record<string, number> describe…', ['Un array de números', 'Un objeto con claves string y valores number', 'Una tupla'], 1],
      ['Config[K] con K = "tema" es…', ['El tipo de la propiedad tema', 'El string "tema"', 'never'], 0],
      ['typeof en posición de tipo…', ['Devuelve "object" en tiempo de ejecución', 'Toma el tipo de una variable', 'No existe'], 1],
    ],
  },
  {
    id: 'ts-3', track: 'ts', level: 3, topic: 'Tecnología', name: 'TypeScript · Avanzado',
    keywords: ['typescript', 'ts', 'conditional types', 'mapped types', 'infer', 'template literal', 'satisfies', 'strict'],
    blurb: 'Tipos condicionales, mapeados, infer, template literal types, satisfies y modo estricto.', pace: '6 paradas · 4 min',
    legs: ['Tipos que calculan', 'Proyecto'],
    steps: [
      [0, 'Tipos condicionales', "Un tipo condicional elige según una condición: A extends B ? X : Y.\n\n```ts\ntype EsTexto<T> = T extends string ? 'sí' : 'no'\ntype A = EsTexto<'hola'> // 'sí'\ntype B = EsTexto<42>     // 'no'\n```\n\nSobre una unión se distribuye: se evalúa por cada miembro. Así funcionan Exclude y Extract.", 'A extends B ? X : Y, distribuido sobre uniones.', '¿Qué es EsTexto<number>?', ['"sí"', '"no"', 'never'], 1],
      [0, 'Mapped types', "Un mapped type recorre las claves de otro tipo y transforma cada una.\n\n```ts\ntype SoloLectura<T> = { readonly [K in keyof T]: T[K] }\ntype Opcionales<T> = { [K in keyof T]?: T[K] }\ntype Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]\n}\n```\n\nLos utility types de la librería (Partial, Readonly) están hechos así.", '[K in keyof T] recorre y transforma claves.', '¿Qué hace { [K in keyof T]?: T[K] }?', ['Vuelve opcionales las claves', 'Las borra', 'Las duplica'], 0],
      [0, 'infer', "Dentro de un tipo condicional, infer captura una parte del tipo para usarla.\n\n```ts\ntype Retorno<F> = F extends (...a: any[]) => infer R ? R : never\ntype Elemento<T> = T extends (infer E)[] ? E : T\n\ntype X = Retorno<() => Promise<number>> // Promise<number>\n```\n\nAsí está definido ReturnType. Awaited<T> desenvuelve promesas.", 'infer captura un pedazo del tipo dentro de un condicional.', '¿Qué es Elemento<string[]>?', ['string[]', 'string', 'never'], 1],
      [1, 'Template literal types', "Los template literal types construyen strings tipados.\n\n```ts\ntype Lado = 'top' | 'bottom'\ntype Margen = `margin-${Lado}` // 'margin-top' | 'margin-bottom'\ntype Evento<T extends string> = `on${Capitalize<T>}`\n```\n\nSon ideales para nombres de eventos, rutas o claves de CSS: el autocompletado conoce todas las combinaciones.", 'Strings tipados que combinan uniones.', '¿Qué es `id-${1 | 2}`?', ['"id-1" | "id-2"', 'string', 'number'], 0],
      [1, 'satisfies', "satisfies comprueba que un valor cumple un tipo sin ensanchar su tipo inferido.\n\n```ts\nconst rutas = {\n  inicio: '/',\n  perfil: '/perfil',\n} satisfies Record<string, string>\n\nrutas.perfil // sigue siendo conocido, con autocompletado\n```\n\nCon una anotación (: Record<string, string>) perderías las claves exactas.", 'satisfies valida sin perder el tipo preciso.', '¿Qué ventaja tiene satisfies sobre anotar el tipo?', ['Ninguna', 'Conserva las claves y literales inferidos', 'Es más rápido en runtime'], 1],
      [1, 'Modo estricto y tipos de terceros', "\"strict\": true en tsconfig activa los chequeos importantes: strictNullChecks, noImplicitAny y más. Empezá todo proyecto así.\n\nLas librerías JavaScript sin tipos pueden traerlos aparte (@types/nombre) o podés declararlos en un archivo .d.ts.\n\n```ts\n// tipos.d.ts\ndeclare module 'libreria-vieja' {\n  export function sumar(a: number, b: number): number\n}\n```", 'strict siempre; .d.ts para librerías sin tipos.', '¿Qué activa "strict": true?', ['Solo minificación', 'Un conjunto de chequeos estrictos como strictNullChecks', 'Nada en TS 5'], 1],
    ],
    exam: [
      ['Exclude<"a" | "b", "a"> es…', ['"a"', '"b"', 'never'], 1],
      ['{ readonly [K in keyof T]: T[K] } equivale a…', ['Partial<T>', 'Readonly<T>', 'Required<T>'], 1],
      ['ReturnType<() => boolean> es…', ['() => boolean', 'boolean', 'void'], 1],
      ['Awaited<Promise<string>> es…', ['Promise<string>', 'string', 'unknown'], 1],
      ['`on${Capitalize<"click">}` es…', ['"onclick"', '"onClick"', '"Click"'], 1],
      ['Con satisfies, el tipo del valor…', ['Se ensancha al tipo indicado', 'Mantiene lo inferido, pero se valida', 'Se vuelve any'], 1],
      ['¿Dónde se declaran tipos para una librería sin tipos?', ['En un .d.ts', 'En package.json', 'En .gitignore'], 0],
      ['strictNullChecks hace que…', ['null y undefined no sean asignables a cualquier tipo', 'Se eliminen los null', 'null sea number'], 0],
    ],
  },
]
