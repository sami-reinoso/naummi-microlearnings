# Microdosis

Un roadmap de microlearnings que vive al lado del chat de Claude Code, para aprender sin abrir otra aplicación.

48 paradas cortas sobre temas al azar, en 8 tramos de 6: cómo aprende tu cabeza, física de todos los días, palabras con historia, sesgos y atajos mentales, el cielo, plata y economía, cuerpo y bichos, números raros. Cada parada entra en una pantalla y trae un dato para llevarte y una pregunta de tres opciones.

## Qué hace

- **Panel "Microdosis" al lado del chat.** Muestra el mapa del recorrido (las paradas hechas en dorado y la actual con un anillo), la tarjeta del paso y la pregunta.
- **Marcar hecho.** Respondés la pregunta en el panel, tocás "Listo, siguiente →" o escribís `/ok` en el chat.
- **Mientras Claude trabaja.** El texto de espera muestra un "para llevarte" de un paso que ya hiciste, para repasar.
- **Línea de estado.** Muestra cuántas paradas llevás y el paso actual.
- `/microdosis` vuelve a abrir el panel si lo cerraste.

El progreso se guarda en tu compu y se mantiene entre sesiones.

## Cuándo aparece

Cada vez que empezás una sesión de Claude Code, el panel se abre solo al costado del chat. Si lo cerrás, escribí `/microdosis` para volver a abrirlo.

## Rutas

Tocá **Rutas** en el panel para buscar y elegir qué microlearnings ver. El buscador filtra por nombre, tema, nivel y palabras clave. Las rutas se agrupan por tema, y las que sumás al panel aparecen como pestañas en una línea: se ven dos y las flechas ‹ › recorren el resto.

| Tema | Ruta | Niveles |
| --- | --- | --- |
| Tecnología | Vue 3 · C# y .NET · TypeScript · Git · Python | Fundamentos · Intermedio · Avanzado |
| Datos | SQL | Fundamentos · Intermedio · Avanzado |
| Idiomas | Inglés para el trabajo | Fundamentos · Intermedio · Avanzado |
| Comunicación | Oratoria | Fundamentos · Intermedio · Avanzado |
| Comunicación | Escribir claro | 8 paradas |
| Producto y diseño | Diseño de interfaces | Fundamentos · Intermedio · Avanzado |
| Producto y diseño | Producto | 8 paradas |
| Finanzas personales | Finanzas personales | Fundamentos · Intermedio · Avanzado (educación general, no asesoramiento) |
| Cultura general | Variado | 48 paradas |
| Astrología | Astrología: el mapa | 8 paradas |

### Elegí tu camino

Un camino es un conjunto de rutas ya armado para un rol y un nivel de experiencia. Abrilo desde **◇ Caminos** en Rutas, desde la bienvenida o con `/camino`. Hay 39 caminos en 13 familias:

| Área | Familia | Niveles |
| --- | --- | --- |
| Desarrollo | Frontend con Vue · Desarrollo web con TypeScript · Backend con C# y .NET · Full stack: Vue + .NET · Desarrollo con Python | Jr · Ssr · Sr |
| Datos | Análisis de datos · Ingeniería de datos | Jr · Ssr · Sr |
| Producto y diseño | Diseño UX/UI · Product Manager | Jr · Ssr · Sr |
| Carrera y habilidades | Liderazgo técnico | Referente · Tech Lead · Staff |
| Carrera y habilidades | Trabajar para el exterior | Primeros pasos · En camino · Listo |
| Carrera y habilidades | Freelance | Arrancando · Con clientes · Consolidado |
| Carrera y habilidades | Comunicar mejor | Básico · Intermedio · Avanzado |

Cada nivel incluye los anteriores, ordenados para avanzar parejo: primero todos los niveles 1, después los 2 y los 3. Al elegir un camino se abre la primera ruta que te falta. Una franja arriba del paso muestra el avance y, al terminar una ruta, te ofrece seguir con la próxima. Una ruta cuenta como hecha cuando aprobás su examen o, si no tiene, cuando hiciste todas las paradas. El avance es el de cada ruta, así que sirve para todos los caminos que la incluyen, y dejar un camino no borra nada.

Los caminos se declaran en `hooks/caminos.ts`.

### Crear tus propias rutas

Escribí `/nueva-ruta` y el tema (por ejemplo `/nueva-ruta negociación salarial`), o usá **+ Crear una ruta** en la sección Rutas. Claude arma la ruta en tres niveles, con paradas, examen y certificado, en alrededor de un minuto. Aparece en **Mis rutas** con el aviso de que fue creada con IA, para que la revises. Se sincroniza con tu cuenta y se puede borrar.

## Exámenes y certificados

Cada nivel de las rutas por niveles (técnicas y Oratoria) termina con un examen de 8 preguntas que no son las de las paradas. Se aprueba con el 75 %, y aprobar habilita el nivel siguiente. Al aprobar podés emitir un certificado con tu nombre, la ruta, el puntaje, la fecha, la cantidad de intentos y un código `MD-XXXXXXXX`.

### Perfil público

En la página de Microdosis, `#perfil` muestra todos tus certificados públicos en un solo lugar, con su verificación. Es el link para la sección *Destacados* de LinkedIn o la bio de Instagram.

### Compartir en LinkedIn e Instagram

Desde el certificado, tocá **Hacer público**: queda guardado en la página y cualquiera con el link lo puede verificar, sin cuenta de claude.ai. Después:

- **Agregar a mi perfil de LinkedIn** lo carga en *Licencias y certificaciones*, con el ID y el link de verificación.
- **Publicar en LinkedIn** abre una publicación con el link.
- **Imagen para Instagram, historia o LinkedIn** descarga una tarjeta con el zorrito, lista para subir.

Para que el link abra para cualquiera, la página tiene que estar compartida como «Cualquiera con el link».

El certificado se verifica en la página de Microdosis en claude.ai (`#cert-CÓDIGO`), que lo busca en su registro. Solo la dueña de la página puede escribir en ese registro; quien tenga acceso a la página puede leerlo. La corrección del examen ocurre en tu compu, así que el certificado acredita que el examen se registró con esos datos, no que lo supervisó un tercero.

## Sincronización con claude.ai

El mod intenta sincronizar el progreso con una página de claude.ai que tiene la misma ruta. Esa página es privada de la autora, así que en tu instalación el panel va a decir "Guardado en esta compu" y todo funciona igual, con el progreso guardado localmente.

## Configurarlo para un proyecto

Cada proyecto puede traer su propia versión de Microdosis: rutas por defecto, colores, logo y mensajes. Se configura con un archivo `.claude/microlearnings.json` en la carpeta que abrís con Claude Code. El mod lo lee al empezar cada sesión. Si falta algo o hay un error, aparece un aviso y se usa lo de siempre.

```json
{
  "brand": {
    "name": "Acme Academy",
    "logo": "./acme-logo.svg",
    "mascot": null
  },
  "designSystem": "./tokens.json",
  "colors": {
    "background": "#0b1020",
    "accent": "#7c5cff",
    "dark": { "background": "#05070f" }
  },
  "routes": {
    "default": "vue",
    "shown": ["ts", "git", "escribir"]
  },
  "messages": {
    "welcomeTitle": "Bienvenida a Acme Academy",
    "welcomeText": "Aprendé el stack de Acme de a poquito, sin salir de Claude.",
    "finished": "¡Ruta terminada!",
    "correct": "¡Eso!",
    "wrong": "No era esa. La correcta: «{respuesta}».",
    "creating": "Armando tu ruta…"
  }
}
```

Todos los campos son opcionales. Las rutas a archivos son relativas a la carpeta `.claude/`.

| Campo | Qué hace |
| --- | --- |
| `brand.name` | Nombre que figura como emisor en los certificados. |
| `brand.logo` | Logo para la cabecera, en lugar del zorrito: `.svg`, `.png`, `.jpg`, `.webp` o `.gif`, hasta 4 MB, o un `data:` URI. No acepta links de internet. |
| `brand.mascot` | Nombre de la mascota para los festejos («La lechuza está feliz»). Con `null` los mensajes son neutros, que es lo que pasa si ponés logo y no ponés mascota. |
| `designSystem` | `claude` (el que viene por defecto), `naummi`, o un archivo de tokens `.json` o `.css`. |
| `colors` | Colores sueltos encima del sistema de diseño, con los mismos nombres que acepta un archivo de tokens. |
| `routes` | `default` es la ruta que se abre y `shown` las que se suman al panel. También acepta una lista, donde la primera es la que se abre. Se puede dar una pista (`vue`), que abre su primer nivel, o un nivel exacto (`vue-2`). |
| `messages` | Textos de bienvenida, de fin de ruta, de respuesta correcta e incorrecta (`{respuesta}` se reemplaza por la opción correcta) y de ruta en preparación. |

Las rutas del proyecto se suman al panel. Si la ruta activa no es una de ellas, se abre la primera. Esto no se sube a la nube: al abrir otro proyecto, tus rutas quedan como estaban.

### Sistema de diseño

Sin configuración, Microdosis usa el sistema de diseño de Claude. El texto del panel y los bordes toman los colores del tema de Claude Code, así que siguen el tema claro u oscuro de cada persona. La cabecera es una imagen y no puede leer ese tema, así que usa la paleta de Claude (marfil, gris carbón y el naranja de Claude), con variante oscura. `naummi` es la paleta azul noche con durazno, con la tipografía Inter incrustada.

Un archivo de tokens propio puede venir en casi cualquier formato:

- **JSON**, plano o anidado, también en el formato W3C Design Tokens (`$value`) o Style Dictionary (`value`), con referencias del tipo `{color.blue.500}`. La variante oscura va en un grupo `dark` o en `modes.dark`.
- **CSS** con variables (`--color-primary: #7c3aed;`), como las de shadcn o Tailwind. Lo que está en `.dark`, `[data-theme="dark"]` o `@media (prefers-color-scheme: dark)` va a la variante oscura. Los `@font-face` con fuentes en `data:` se incrustan en la cabecera.

Los nombres se reconocen sin importar mayúsculas, guiones ni prefijos: `primary`, `--color-primary`, `color.brand.primary` y `colorPrimary` valen lo mismo.

| Token | También se reconoce como | Dónde se ve |
| --- | --- | --- |
| `background` | `bg`, `surface`, `canvas` | Fondo de la cabecera |
| `background2` | `backgroundSecondary`, `surface2`, `muted` | Fin del degradé de la cabecera |
| `accent` | `primary`, `brand` | Paradas hechas, brillo, bordes del panel |
| `accentSoft` | `accentStrong`, `secondary`, `highlight` | Rótulos chicos de la cabecera |
| `text` | `foreground`, `textPrimary` | Titular de la cabecera |
| `textMuted` | `textSecondary`, `mutedForeground` | Subtítulo de la cabecera |
| `track` | `border`, `divider`, `outline` | Paradas pendientes |
| `panelTint` | `tint`, `primarySubtle`, `primary50` | Fondo de las tarjetas destacadas del panel |
| `panelAccent` | | Bordes del panel; acepta claves del tema de Claude Code como `claude` |
| `radius` | `borderRadius`, `radiusLg` | Esquinas de la cabecera |
| `fontDisplay` | `fontSans`, `fontFamily`, `fontHeading` | Titular de la cabecera |
| `fontMono` | `fontCode` | Rótulos de la cabecera |

Con dar `background` y `accent` alcanza: el resto se deriva, incluido el color del texto según el fondo sea claro u oscuro. Un archivo de tokens también puede traer `logo`, `brandName` y `mascot`.

### Para todos tus proyectos

Los mismos datos de marca (`designSystem`, `logo`, `brandName`, `mascot`) también están en la configuración del mod, para usarlos en todos tus proyectos. Si un proyecto trae su `.claude/microlearnings.json`, ese archivo tiene prioridad.

## Sumar tu propia ruta

Las rutas se declaran en `hooks/routes.ts`. Los pasos de Variado están en `hooks/steps.ts` y los de las rutas largas en `hooks/rutas-largas.ts`. Cada paso es `[tramo, título, texto, para llevarte, pregunta, opciones, índice correcto]`, y en el texto una línea en blanco separa los párrafos. Si cambiás el orden de los pasos de una ruta, el progreso guardado apunta a otros pasos.

## Créditos

- Zorrito con su libro y su plantita: ilustración de Naummi.
- Tipografía de la cabecera: [Inter](https://rsms.me/inter/) de Rasmus Andersson, con licencia SIL Open Font License 1.1, incrustada y reducida a los caracteres que usa la cabecera.
