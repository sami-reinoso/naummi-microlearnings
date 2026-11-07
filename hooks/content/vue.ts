import type { Route } from '../routes'

// Vue 3 en tres niveles. Un párrafo que empieza con ``` es un bloque de código (primera línea: lenguaje).

export const VUE: Route[] = [
  {
    id: 'vue-1', track: 'vue', level: 1, topic: 'Tecnología', name: 'Vue 3 · Fundamentos',
    keywords: ['vue', 'frontend', 'javascript', 'plantillas', 'reactividad', 'ref', 'v-model'],
    blurb: 'Plantillas, directivas y el estado reactivo con ref y computed.', pace: '6 paradas · 3 min',
    legs: ['Plantillas', 'Reactividad'],
    steps: [
      [0, 'Un componente en un archivo', "Vue arma la interfaz con componentes. Un componente de un solo archivo (.vue) junta tres partes: la plantilla (<template>), la lógica (<script setup>) y los estilos (<style scoped>).\n\n```html\n<script setup>\nconst saludo = 'Hola'\n</script>\n\n<template>\n  <h1>{{ saludo }}</h1>\n</template>\n```\n\nLa app arranca con createApp(App).mount('#app').", 'Template, script y style viven juntos en un .vue.', '¿Qué etiqueta contiene la lógica en un componente con la sintaxis recomendada?', ['<logic>', '<script setup>', '<data>'], 1],
      [0, 'Interpolación y directivas', "Las llaves dobles {{ }} muestran un valor como texto. Las directivas son atributos que empiezan con v-: v-bind enlaza un atributo y v-on escucha un evento. Tienen atajos: : para v-bind y @ para v-on.\n\n```html\n<img :src=\"foto\" :alt=\"nombre\">\n<button @click=\"contar\">Sumar</button>\n```", ':atributo enlaza datos; @evento escucha.', '¿Qué significa :src=\"foto\"?', ['Que src toma el valor de la variable foto', 'Que src es literalmente el texto foto', 'Que foto es un evento'], 0],
      [0, 'Mostrar y repetir', "v-if agrega o quita el elemento del DOM; v-show lo deja y alterna su display. Usá v-show si algo se prende y apaga seguido.\n\nv-for repite un elemento por cada ítem. Siempre con :key único, para que Vue sepa qué elemento es cuál al reordenar.\n\n```html\n<li v-for=\"t in tareas\" :key=\"t.id\">{{ t.texto }}</li>\n```", 'v-for siempre con :key estable.', '¿Qué hace v-show cuando la condición es falsa?', ['Elimina el elemento', 'Lo oculta con display: none', 'Lanza un error'], 1],
      [1, 'Estado reactivo con ref', "ref() crea un valor reactivo: cuando cambia, la plantilla se actualiza sola. En el script se lee y escribe con .value; en la plantilla, Vue lo desenvuelve y se usa directo.\n\n```js\nimport { ref } from 'vue'\nconst count = ref(0)\nfunction sumar() { count.value++ }\n```\n\nEn la plantilla: {{ count }}.", 'En script, .value. En template, sin .value.', 'En el script, ¿cómo se incrementa un ref llamado count?', ['count++', 'count.value++', 'count.set(count + 1)'], 1],
      [1, 'v-model', "v-model conecta un campo de formulario con un valor reactivo en las dos direcciones: lo que escribís actualiza la variable, y si la variable cambia, el campo también.\n\n```html\n<input v-model=\"nombre\">\n<p>Hola, {{ nombre }}</p>\n```\n\nPor dentro equivale a :value más @input. Funciona también con checkbox, radio y select.", 'v-model = :value + @input.', '¿Qué hace v-model en un input?', ['Solo muestra el valor', 'Sincroniza el campo y la variable en ambos sentidos', 'Valida el formulario'], 1],
      [1, 'Valores derivados con computed', "computed() calcula un valor a partir de otros reactivos y lo guarda en caché: solo se recalcula cuando cambia alguna de sus dependencias. Un método, en cambio, se ejecuta en cada render.\n\n```js\nconst nombre = ref('Ana'); const apellido = ref('Gómez')\nconst completo = computed(() => `${nombre.value} ${apellido.value}`)\n```", 'Derivás datos con computed, no con watch.', '¿Cuándo se recalcula un computed?', ['En cada render', 'Cuando cambia alguna dependencia reactiva', 'Cada un segundo'], 1],
    ],
    exam: [
      ['¿Qué diferencia hay entre v-if y v-show?', ['Ninguna', 'v-if crea o destruye el elemento; v-show solo cambia su visibilidad', 'v-show es solo para listas'], 1],
      ['@submit.prevent en un form…', ['Envía el formulario dos veces', 'Escucha submit y evita la recarga de la página', 'Desactiva el botón'], 1],
      ['¿Para qué sirve :key en v-for?', ['Para estilos', 'Para que Vue identifique cada ítem al actualizar la lista', 'Para ordenar alfabéticamente'], 1],
      ['Tenés const visible = ref(false). En la plantilla escribís…', ['v-if="visible.value"', 'v-if="visible"', 'v-if="ref(visible)"'], 1],
      ['¿Qué conviene para el nombre completo a partir de nombre y apellido?', ['Un watch que escriba otra variable', 'Un computed', 'Un método llamado en cada tecla'], 1],
      ['{{ html }} con html = "<b>hola</b>" muestra…', ['hola en negrita', 'El texto literal con las etiquetas', 'Nada'], 1],
      ['¿Qué atajo equivale a v-bind:class?', ['@class', ':class', '#class'], 1],
      ['¿Dónde se monta la app en el HTML?', ['Con createApp(App).mount("#app")', 'Con new Vue().start()', 'Automáticamente en body'], 0],
    ],
  },
  {
    id: 'vue-2', track: 'vue', level: 2, topic: 'Tecnología', name: 'Vue 3 · Intermedio',
    keywords: ['vue', 'componentes', 'props', 'emits', 'slots', 'watch', 'ciclo de vida'],
    blurb: 'Componentes que se comunican: props, eventos, slots, watch y ciclo de vida.', pace: '6 paradas · 3 min',
    legs: ['Comunicación', 'Reacciones'],
    steps: [
      [0, 'Props: datos de padre a hijo', "Las props son los datos que un componente recibe de su padre. Se declaran con defineProps y son de solo lectura: el hijo no debe modificarlas, porque el dato le pertenece al padre.\n\n```js\nconst props = defineProps({\n  titulo: { type: String, required: true },\n  cantidad: { type: Number, default: 0 },\n})\n```\n\nUso: <Tarjeta titulo=\"Hola\" :cantidad=\"3\" />", 'Los datos bajan por props y no se mutan.', '¿Puede un hijo modificar una prop directamente?', ['Sí, siempre', 'No, debe avisar al padre', 'Solo si es un número'], 1],
      [0, 'Emits: el hijo avisa', "Para que un hijo comunique algo hacia arriba, emite un evento. Se declara con defineEmits y el padre lo escucha con @.\n\n```js\nconst emit = defineEmits(['borrar'])\nfunction onClick() { emit('borrar', props.id) }\n```\n\nEn el padre: <Tarea @borrar=\"quitar\" />. Datos bajan por props, eventos suben por emits.", 'Props bajan, eventos suben.', '¿Cómo escucha el padre el evento borrar?', ['v-borrar', '@borrar="quitar"', ':borrar="quitar"'], 1],
      [0, 'v-model en tus componentes', "v-model también funciona en componentes propios. Desde Vue 3.4, defineModel() lo resuelve en una línea: devuelve un ref que, al cambiar, avisa al padre.\n\n```js\n// Campo.vue\nconst valor = defineModel()\n```\n\nEn el padre: <Campo v-model=\"email\" />. Por dentro usa la prop modelValue y el evento update:modelValue.", 'defineModel() conecta v-model en un componente.', '¿Qué evento usa v-model por defecto en un componente?', ['change', 'update:modelValue', 'input:model'], 1],
      [0, 'Slots: contenido desde afuera', "Un slot deja un hueco en el componente para que el padre ponga su propio contenido. Los slots con nombre permiten varios huecos.\n\n```html\n<!-- Panel.vue -->\n<header><slot name=\"titulo\" /></header>\n<slot />\n\n<!-- uso -->\n<Panel>\n  <template #titulo>Ajustes</template>\n  <p>Contenido</p>\n</Panel>\n```", 'Slots para estructura reutilizable y contenido libre.', '¿Cómo se llena un slot con nombre titulo?', ['<template #titulo>', '<slot-titulo>', ':titulo="..."'], 0],
      [1, 'watch y watchEffect', "watch ejecuta código cuando cambia algo específico y te da el valor nuevo y el viejo. watchEffect corre de inmediato y se re-ejecuta con cualquier dato reactivo que use.\n\n```js\nwatch(busqueda, async (nueva) => {\n  resultados.value = await buscar(nueva)\n})\n```\n\nUsalos para efectos (llamadas, guardar, logs), no para calcular valores: para eso está computed.", 'watch para efectos; computed para derivar.', '¿Qué conviene para pedir datos cada vez que cambia la búsqueda?', ['computed', 'watch', 'v-model'], 1],
      [1, 'Ciclo de vida', "Los componentes nacen, se actualizan y se desmontan. onMounted corre cuando el componente ya está en el DOM: ideal para medir elementos o conectar algo externo. onUnmounted corre al irse: el lugar para limpiar.\n\n```js\nonMounted(() => window.addEventListener('resize', medir))\nonUnmounted(() => window.removeEventListener('resize', medir))\n```", 'Lo que conectás en onMounted, lo desconectás en onUnmounted.', '¿Dónde se quita un listener agregado en onMounted?', ['onCreated', 'onUnmounted', 'onUpdated'], 1],
    ],
    exam: [
      ['Un hijo necesita cambiar un valor que recibió por prop. Lo correcto es…', ['Modificar la prop', 'Emitir un evento para que el padre lo cambie', 'Copiarla a window'], 1],
      ['defineProps({ n: { type: Number, default: 0 } }) sin pasar n da…', ['undefined', '0', 'Error de compilación'], 1],
      ['¿Qué ventaja tiene declarar los eventos con defineEmits?', ['Ninguna', 'Documenta y valida qué eventos emite el componente', 'Los vuelve asíncronos'], 1],
      ['El slot sin nombre se llama…', ['main', 'default', 'body'], 1],
      ['watch(fuente, cb) recibe en el callback…', ['Solo el valor nuevo', 'El valor nuevo y el anterior', 'Nada'], 1],
      ['¿Cuál corre una vez de inmediato sin declarar dependencias?', ['watch', 'watchEffect', 'computed'], 1],
      ['Querés enfocar un input apenas aparece. ¿Dónde?', ['onMounted', 'onBeforeMount', 'En el setup antes de todo'], 0],
      ['<Campo v-model:titulo="t" /> usa la prop…', ['modelValue', 'titulo', 'model'], 1],
    ],
  },
  {
    id: 'vue-3', track: 'vue', level: 3, topic: 'Tecnología', name: 'Vue 3 · Avanzado',
    keywords: ['vue', 'composables', 'pinia', 'router', 'provide', 'inject', 'rendimiento'],
    blurb: 'Composables, reactive, provide/inject, Pinia, Vue Router y rendimiento.', pace: '6 paradas · 4 min',
    legs: ['Arquitectura', 'Escala'],
    steps: [
      [0, 'Composables', "Un composable es una función que empaqueta lógica reactiva para reutilizarla. Por convención empieza con use.\n\n```js\nexport function useMouse() {\n  const x = ref(0), y = ref(0)\n  const mover = (e) => { x.value = e.pageX; y.value = e.pageY }\n  onMounted(() => window.addEventListener('mousemove', mover))\n  onUnmounted(() => window.removeEventListener('mousemove', mover))\n  return { x, y }\n}\n```\n\nCada componente que lo llama obtiene su propio estado.", 'Lógica reutilizable = composable useAlgo().', '¿Comparten estado dos componentes que llaman a useMouse()?', ['Sí, siempre', 'No, cada llamada crea su propio estado', 'Solo si son hermanos'], 1],
      [0, 'reactive y sus trampas', "reactive() vuelve reactivo un objeto entero, sin .value. Pero si lo desestructurás, las variables pierden la reactividad. toRefs lo evita.\n\n```js\nconst estado = reactive({ total: 0, items: [] })\nconst { total } = estado        // ya no es reactivo\nconst { items } = toRefs(estado) // sí\n```\n\nPor eso muchos equipos prefieren ref para todo: es más predecible.", 'Desestructurar reactive rompe la reactividad: usá toRefs.', '¿Qué pasa al desestructurar un reactive?', ['Nada', 'Las variables pierden la reactividad', 'Se copian en profundidad'], 1],
      [0, 'provide e inject', "Cuando un dato tiene que llegar a componentes muy profundos, pasarlo prop por prop cansa (prop drilling). provide lo ofrece desde un ancestro e inject lo toma desde cualquier descendiente.\n\n```js\n// arriba\nprovide('tema', tema)\n// abajo\nconst tema = inject('tema', 'claro')\n```\n\nEl segundo argumento de inject es el valor por defecto.", 'provide/inject evita el prop drilling.', '¿Qué evita provide/inject?', ['Usar CSS', 'Pasar una prop por muchos niveles', 'Usar eventos'], 1],
      [1, 'Estado global con Pinia', "Pinia es la librería oficial de estado compartido. Un store tiene estado, getters y acciones.\n\n```js\nexport const useCarrito = defineStore('carrito', () => {\n  const items = ref([])\n  const total = computed(() => items.value.length)\n  function agregar(i) { items.value.push(i) }\n  return { items, total, agregar }\n})\n```\n\nPara desestructurar un store sin perder reactividad: storeToRefs(store).", 'Estado compartido en Pinia; desestructurá con storeToRefs.', '¿Cómo desestructurás un store sin perder reactividad?', ['Con spread', 'Con storeToRefs', 'Con JSON.parse'], 1],
      [1, 'Vue Router', "Vue Router asocia rutas a componentes. Los parámetros llegan con useRoute() y la navegación por código con useRouter().\n\n```js\nconst routes = [\n  { path: '/producto/:id', component: () => import('./Producto.vue') },\n]\nrouter.beforeEach((to) => {\n  if (to.meta.privada && !logueado()) return '/login'\n})\n```\n\nEl import() hace carga diferida: el código de esa pantalla se baja recién al visitarla.", 'Carga diferida con () => import() y guards para proteger rutas.', '¿Qué logra component: () => import(...)?', ['Carga la ruta al iniciar', 'Carga el componente recién al visitar la ruta', 'Desactiva la ruta'], 1],
      [1, 'Rendimiento', "Tres herramientas útiles. shallowRef: reactividad solo en el valor de primer nivel, ideal para objetos grandes que reemplazás enteros. defineAsyncComponent: carga un componente pesado recién cuando se usa. v-once: renderiza una vez algo que nunca cambia.\n\n```js\nconst datos = shallowRef(enorme)\ndatos.value = nuevoEnorme // dispara la actualización\n```\n\nMedí antes de optimizar: Vue DevTools muestra qué se re-renderiza.", 'Medí primero; después shallowRef, async components y v-once.', '¿Cuándo conviene shallowRef?', ['Siempre', 'Con objetos grandes que se reemplazan enteros', 'Con strings'], 1],
    ],
    exam: [
      ['Una buena convención para nombrar composables es…', ['getAlgo()', 'useAlgo()', 'AlgoComposable()'], 1],
      ['const { a } = reactive({ a: 1 }); a quedó…', ['Reactivo', 'No reactivo', 'Como computed'], 1],
      ['inject("x", 5) sin ningún provide devuelve…', ['undefined', '5', 'Un error'], 1],
      ['En Pinia, la lógica que modifica el estado va en…', ['getters', 'acciones', 'plugins'], 1],
      ['¿Dónde se valida si un usuario puede entrar a una ruta?', ['En un navigation guard', 'En el CSS', 'En el template'], 0],
      ['¿Qué devuelve useRoute()?', ['El router para navegar', 'La ruta actual con sus params', 'Una lista de rutas'], 1],
      ['Con shallowRef, cambiar datos.value.x = 2…', ['Siempre actualiza la vista', 'No dispara la actualización', 'Lanza error'], 1],
      ['Un componente pesado que se usa poco conviene cargarlo con…', ['defineAsyncComponent', 'v-once', 'provide'], 0],
    ],
  },
]
