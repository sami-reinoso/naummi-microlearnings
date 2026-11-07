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
| Tecnología | Vue 3 | Fundamentos · Intermedio · Avanzado |
| Tecnología | C# y .NET | Fundamentos · Intermedio · Avanzado (ASP.NET Core) |
| Tecnología | TypeScript | Fundamentos · Intermedio · Avanzado |
| Tecnología | Git | Fundamentos · Intermedio · Avanzado |
| Comunicación | Oratoria | Fundamentos · Intermedio · Avanzado |
| Comunicación | Escribir claro | 8 paradas |
| Producto y diseño | Producto | 8 paradas |
| Cultura general | Variado | 48 paradas |
| Astrología | Astrología: el mapa | 8 paradas |

## Exámenes y certificados

Cada nivel de las rutas por niveles (técnicas y Oratoria) termina con un examen de 8 preguntas que no son las de las paradas. Se aprueba con el 75 %, y aprobar habilita el nivel siguiente. Al aprobar podés emitir un certificado con tu nombre, la ruta, el puntaje, la fecha, la cantidad de intentos y un código `MD-XXXXXXXX`.

### Compartir en LinkedIn e Instagram

Desde el certificado, tocá **Hacer público**: queda guardado en la página y cualquiera con el link lo puede verificar, sin cuenta de claude.ai. Después:

- **Agregar a mi perfil de LinkedIn** lo carga en *Licencias y certificaciones*, con el ID y el link de verificación.
- **Publicar en LinkedIn** abre una publicación con el link.
- **Imagen para Instagram, historia o LinkedIn** descarga una tarjeta con el zorrito, lista para subir.

Para que el link abra para cualquiera, la página tiene que estar compartida como «Cualquiera con el link».

El certificado se verifica en la página de Microdosis en claude.ai (`#cert-CÓDIGO`), que lo busca en su registro. Solo la dueña de la página puede escribir en ese registro; quien tenga acceso a la página puede leerlo. La corrección del examen ocurre en tu compu, así que el certificado acredita que el examen se registró con esos datos, no que lo supervisó un tercero.

## Sincronización con claude.ai

El mod intenta sincronizar el progreso con una página de claude.ai que tiene la misma ruta. Esa página es privada de la autora, así que en tu instalación el panel va a decir "Guardado en esta compu" y todo funciona igual, con el progreso guardado localmente.

## Sumar tu propia ruta

Las rutas se declaran en `hooks/routes.ts`. Los pasos de Variado están en `hooks/steps.ts` y los de las rutas largas en `hooks/rutas-largas.ts`. Cada paso es `[tramo, título, texto, para llevarte, pregunta, opciones, índice correcto]`, y en el texto una línea en blanco separa los párrafos. Si cambiás el orden de los pasos de una ruta, el progreso guardado apunta a otros pasos.

## Créditos

- Zorrito con su libro y su plantita: ilustración de Naummi.
- Tipografía de la cabecera: [Inter](https://rsms.me/inter/) de Rasmus Andersson, con licencia SIL Open Font License 1.1, incrustada y reducida a los caracteres que usa la cabecera.
