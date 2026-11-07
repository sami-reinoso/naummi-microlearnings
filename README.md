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

Tocá **Elegir rutas** en el panel para decidir qué microlearnings se muestran. Por defecto aparece solo **Variado**. Cada ruta guarda su propio progreso, y las que agregues se ven como pestañas arriba del panel.

| Ruta | Paradas | Largo |
| --- | --- | --- |
| Variado | 48 | 1 min, temas al azar |
| Astrología: el mapa | 8 | 3 min, de dónde viene, zodíaco, casas, aspectos y qué dice la ciencia |
| Producto | 8 | 3 min, entender problemas, validar barato y retener |
| Escribir claro | 8 | 3 min, hábitos para que un texto se entienda a la primera |

## Instalar

En una sesión de Claude Code, escribí en el prompt:

```
/plugin install microdosis --marketplace sami-reinoso/naummi-microlearnings
```

Respondé `y` para agregar el marketplace y elegí dónde instalarlo.

Desde una terminal:

```bash
claude plugin install microdosis --marketplace sami-reinoso/naummi-microlearnings
```

## Sincronización con claude.ai

El mod intenta sincronizar el progreso con una página de claude.ai que tiene la misma ruta. Esa página es privada de la autora, así que en tu instalación el panel va a decir "Guardado en esta compu" y todo funciona igual, con el progreso guardado localmente.

## Sumar tu propia ruta

Las rutas se declaran en `hooks/routes.ts`. Los pasos de Variado están en `hooks/steps.ts` y los de las rutas largas en `hooks/rutas-largas.ts`. Cada paso es `[tramo, título, texto, para llevarte, pregunta, opciones, índice correcto]`, y en el texto una línea en blanco separa los párrafos. Si cambiás el orden de los pasos de una ruta, el progreso guardado apunta a otros pasos.

## Créditos

- Zorrito aterciopelado y cuaderno de campo: ilustraciones de Naummi.
- Tipografía de la cabecera: [Inter](https://rsms.me/inter/) de Rasmus Andersson, con licencia SIL Open Font License 1.1, incrustada y reducida a los caracteres que usa la cabecera.
