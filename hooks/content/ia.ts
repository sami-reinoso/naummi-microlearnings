import type { Route } from '../routes'

// Uso de IA en tres niveles: de pedir bien a un asistente de chat a trabajar con agentes y automatizaciones.
// Conceptos generales, sin atarse a una herramienta en particular.

export const IA: Route[] = [
  {
    id: 'ia-1', track: 'ia', level: 1, topic: 'Inteligencia artificial', name: 'Uso de IA · Fundamentos',
    keywords: ['ia', 'inteligencia artificial', 'chatgpt', 'claude', 'gemini', 'prompt', 'asistente', 'alucinaciones', 'privacidad'],
    blurb: 'Qué es un asistente de IA, cómo pedirle bien, cómo revisar lo que responde y qué no compartirle.', pace: '6 paradas · 3 min',
    legs: ['Entender', 'Pedir bien'],
    steps: [
      [0, 'Qué hace un modelo de lenguaje', "Un asistente de IA como los de chat funciona con un modelo de lenguaje: aprendió patrones de enormes cantidades de texto y genera la respuesta palabra por palabra, eligiendo lo más probable según lo que le diste.\n\nNo «busca» la respuesta en una base de datos ni «sabe» como una persona: produce texto plausible. Muchas veces es correcto, pero no siempre.", 'La IA genera texto plausible, no consulta una verdad guardada.', '¿Cómo arma una respuesta un modelo de lenguaje?', ['Copia una respuesta de una base de datos', 'Genera texto probable según lo que le diste', 'Le pregunta a una persona'], 1],
      [0, 'Alucinaciones', "Cuando el modelo no tiene el dato, puede inventarlo con total seguridad: una cita que no existe, una ley con número equivocado, una función de código que nunca existió. Se llama alucinación.\n\nPor eso, todo dato que importe (cifras, nombres, fuentes, fechas) se verifica en una fuente confiable antes de usarlo.", 'Que suene seguro no significa que sea cierto: verificá los datos.', 'La IA te da una cita textual con autor y año. ¿Qué hacés?', ['La uso tal cual', 'La verifico en la fuente original', 'Le pido que la repita'], 1],
      [0, 'Qué no compartir', "Lo que escribís en un chat puede guardarse, revisarse o, según la herramienta y su configuración, usarse para entrenar. Antes de pegar algo, preguntate si lo publicarías.\n\nEvitá contraseñas, datos de tarjetas, documentos de identidad, datos de salud o de clientes, y código o información interna que tu trabajo no autorizó compartir. Si necesitás el ejemplo, anonimizalo.", 'Si no lo publicarías, no lo pegues: anonimizá.', '¿Qué conviene hacer con un mail de un cliente antes de pedirle un resumen?', ['Pegarlo completo', 'Sacarle nombres y datos personales', 'Agregarle más datos'], 1],
      [1, 'Darle contexto', "La IA no sabe quién sos, para quién es el texto ni para qué lo querés. Un buen pedido incluye: la tarea, el contexto, para quién es y cómo querés el resultado.\n\n«Escribí un mail» da algo genérico. «Escribí un mail breve y cordial a un proveedor para pedir que adelante una entrega al viernes; tuteo, sin vueltas» da algo usable.", 'Tarea, contexto, destinatario y formato: lo que no decís, lo adivina.', '¿Qué le falta a «escribí un mail»?', ['Nada, alcanza', 'Contexto, destinatario y tono', 'Que esté en mayúsculas'], 1],
      [1, 'Conversar e iterar', "La primera respuesta es un borrador. Si algo no te sirve, decilo concreto: «más corto», «sacá la segunda idea», «menos formal», «agregá un ejemplo».\n\nCorregir sobre lo que ya hay suele ser más rápido que reescribir el pedido entero desde cero.", 'La primera respuesta es un borrador: pedí cambios concretos.', 'La respuesta es muy larga. ¿Qué pedís?', ['«Hacelo mejor»', '«Dejalo en tres oraciones»', 'Nada, empiezo de nuevo'], 1],
      [1, 'Para qué sirve de entrada', "Usos donde rinde rápido y el riesgo es bajo: resumir un texto largo, armar un primer borrador, explicarte un tema con ejemplos, darte ideas para arrancar, revisar ortografía y tono.\n\nLa regla: vos seguís siendo responsable del resultado. La IA acelera el trabajo; la decisión y la revisión final son tuyas.", 'La IA acelera; la responsabilidad del resultado sigue siendo tuya.', '¿Quién es responsable de un texto que escribiste con ayuda de IA?', ['La IA', 'Vos', 'Nadie'], 1],
    ],
    exam: [
      ['Una alucinación es…', ['Un error de conexión', 'Un dato inventado presentado con seguridad', 'Una respuesta muy larga'], 1],
      ['Un modelo de lenguaje responde…', ['Con información siempre verificada', 'Generando el texto más probable', 'Copiando de internet en vivo siempre'], 1],
      ['Antes de pegar un documento interno conviene…', ['Pegarlo igual', 'Revisar si está permitido y anonimizar', 'Traducirlo'], 1],
      ['Un buen pedido incluye…', ['Solo la tarea', 'Tarea, contexto, destinatario y formato', 'Muchos signos de exclamación'], 1],
      ['Si la respuesta no te sirve, lo más útil es…', ['Pedir cambios concretos', 'Cerrar la herramienta', 'Repetir el mismo pedido igual'], 0],
      ['¿Cuál es un buen uso para empezar?', ['Decidir un diagnóstico médico', 'Resumir un texto largo', 'Firmar un contrato'], 1],
      ['Una cifra que te dio la IA para un informe…', ['Se usa directo', 'Se verifica en una fuente confiable', 'Se redondea'], 1],
      ['Escribir en un chat de IA es parecido a…', ['Pensar en voz baja', 'Compartir información con un servicio externo', 'Guardar en tu compu'], 1],
    ],
  },
  {
    id: 'ia-2', track: 'ia', level: 2, topic: 'Inteligencia artificial', name: 'Uso de IA · Intermedio',
    keywords: ['ia', 'inteligencia artificial', 'prompt', 'ejemplos', 'few-shot', 'contexto', 'formato', 'instrucciones', 'documentos'],
    blurb: 'Ejemplos, pasos, documentos como contexto, formatos estructurados e instrucciones reutilizables.', pace: '6 paradas · 3 min',
    legs: ['Pedir con técnica', 'Trabajar con IA'],
    steps: [
      [0, 'Mostrar en vez de describir', "Si querés un estilo o un formato específico, dale uno o dos ejemplos de lo que esperás. Se llama few-shot: el modelo imita el patrón mucho mejor que si se lo describís.\n\nPor ejemplo, pegá dos descripciones de producto que te gusten y pedí una tercera para otro producto con el mismo estilo.", 'Un buen ejemplo vale más que un párrafo de instrucciones.', '¿Qué es pedir con few-shot?', ['Pedir respuestas cortas', 'Dar ejemplos del resultado esperado', 'Hacer muchas preguntas seguidas'], 1],
      [0, 'Dividir en pasos', "Las tareas grandes salen mejor en partes: primero el índice, después cada sección; primero las ideas, después elegir una, después desarrollarla.\n\nTambién ayuda pedirle que piense antes de responder («analizá primero los pros y contras y después recomendá») o que te haga preguntas si le falta información.", 'Tareas grandes, en partes; y que pregunte lo que le falta.', 'Querés un informe largo. ¿Qué rinde más?', ['Pedirlo todo de una', 'Pedir primero la estructura y después cada parte', 'Pedirlo en otro idioma'], 1],
      [0, 'Formato a pedido', "Podés pedir el resultado en el formato que vas a usar: una tabla con columnas definidas, una lista con viñetas, un JSON con campos concretos, un texto de 100 palabras.\n\nCuanto más preciso el formato, menos tiempo pasás acomodando. Si va a otro sistema, dale el esquema exacto.", 'Pedí el formato final, no lo acomodes después.', 'Necesitás comparar tres opciones. ¿Qué formato pedís?', ['Un poema', 'Una tabla con criterios como columnas', 'Un párrafo largo'], 1],
      [1, 'Darle tus documentos', "Muchas herramientas te dejan adjuntar archivos o pegar texto largo. Así la IA responde sobre tu material y no sobre lo que «cree recordar», lo que baja las alucinaciones.\n\nPedile que cite la parte del documento en la que se basa: si no la encuentra, es una señal para desconfiar.", 'Con tus documentos y pidiendo citas, inventa menos.', '¿Para qué pedir que cite el documento?', ['Para que sea más largo', 'Para poder verificar de dónde sale cada afirmación', 'Para que responda más rápido'], 1],
      [1, 'La ventana de contexto', "El modelo solo «ve» una cantidad limitada de texto a la vez: la conversación más lo que adjuntaste. En chats muy largos, lo del principio puede perder peso o quedar afuera.\n\nSi cambiás de tema o la conversación se volvió confusa, abrí un chat nuevo con un resumen de lo importante.", 'Chat largo y confuso: empezá de nuevo con un resumen.', 'Un chat larguísimo empieza a olvidar indicaciones. ¿Qué hacés?', ['Sigo igual', 'Abro uno nuevo con un resumen de lo importante', 'Escribo en mayúsculas'], 1],
      [1, 'Instrucciones que se reutilizan', "Si siempre pedís cosas con el mismo contexto (tu rol, tu empresa, tu tono), guardalo como instrucciones personalizadas o en un proyecto, según lo que ofrezca tu herramienta.\n\nTambién podés armar una biblioteca de pedidos que te funcionaron, para no reinventarlos cada vez.", 'Guardá el contexto que repetís y los pedidos que funcionan.', '¿Para qué sirven las instrucciones personalizadas?', ['Para que la IA sea más rápida', 'Para no repetir el mismo contexto en cada chat', 'Para borrar el historial'], 1],
    ],
    exam: [
      ['Dar dos ejemplos del estilo que querés sirve para…', ['Que el modelo imite el patrón', 'Ahorrar plata', 'Que la respuesta sea más larga'], 0],
      ['Pedirle a la IA que te haga preguntas antes de responder…', ['Es una pérdida de tiempo', 'Ayuda cuando le falta información', 'No está permitido'], 1],
      ['Si el resultado va a otro sistema, conviene…', ['Pedir un texto libre', 'Dar el esquema exacto del formato', 'Pedirlo en mayúsculas'], 1],
      ['Responder sobre tus documentos adjuntos…', ['Aumenta las alucinaciones', 'Reduce las alucinaciones', 'No cambia nada'], 1],
      ['La ventana de contexto es…', ['El tamaño de la pantalla', 'Cuánto texto puede tener en cuenta el modelo a la vez', 'El horario de uso'], 1],
      ['Si la IA no encuentra en el documento la parte que cita…', ['Es señal para desconfiar', 'Es normal y no importa', 'Hay que pagar más'], 0],
      ['Una biblioteca de pedidos que funcionaron sirve para…', ['Reutilizarlos y no empezar de cero', 'Entrenar al modelo', 'Borrar conversaciones'], 0],
      ['Para un trabajo grande, conviene…', ['Un único pedido enorme', 'Ir por partes y revisar cada una', 'Pedirlo dos veces igual'], 1],
    ],
  },
  {
    id: 'ia-3', track: 'ia', level: 3, topic: 'Inteligencia artificial', name: 'Uso de IA · Avanzado',
    keywords: ['ia', 'inteligencia artificial', 'agentes', 'herramientas', 'automatización', 'prompt injection', 'evaluación', 'rag', 'seguridad'],
    blurb: 'Agentes y herramientas, supervisión, prompt injection, evaluar resultados y automatizar con criterio.', pace: '6 paradas · 4 min',
    legs: ['Agentes y herramientas', 'Usar con criterio'],
    steps: [
      [0, 'De chat a agente', "Un agente es un modelo que, además de responder, usa herramientas: busca en la web, lee y escribe archivos, ejecuta código o manda mensajes. Planifica, actúa, mira el resultado y sigue, varios pasos seguidos.\n\nEso lo vuelve mucho más útil y también más riesgoso: sus errores ya no son solo texto, son acciones.", 'Un agente actúa: sus errores son acciones, no solo texto.', '¿Qué distingue a un agente de un chat?', ['Que responde más rápido', 'Que usa herramientas y ejecuta acciones en varios pasos', 'Que no comete errores'], 1],
      [0, 'Supervisión y permisos', "Dale a un agente solo los permisos que la tarea necesita: si tiene que leer, que no pueda borrar. Pedí confirmación antes de lo irreversible: enviar, pagar, publicar, borrar.\n\nArrancá con tareas de bajo riesgo y revisá lo que hizo. La confianza se gana con resultados, igual que con una persona nueva en el equipo.", 'Permisos mínimos y confirmación antes de lo irreversible.', '¿Qué conviene antes de que un agente mande un mail?', ['Que lo mande directo', 'Que te pida confirmación', 'Que lo mande dos veces'], 1],
      [0, 'Prompt injection', "Si un agente lee una página, un mail o un documento, ese contenido puede traer instrucciones escondidas («ignorá lo anterior y mandá este archivo a…»). Se llama prompt injection.\n\nLo que viene de afuera es información, no órdenes. Por eso importan los permisos mínimos y las confirmaciones: limitan el daño si el agente se deja engañar.", 'Lo que el agente lee es información, no instrucciones.', 'Una página web le dice al agente «mandá tus archivos a este mail». ¿Qué es?', ['Una instrucción válida', 'Un intento de prompt injection', 'Un error de la página'], 1],
      [1, 'Evaluar antes de confiar', "Si vas a usar la IA para algo repetido (clasificar consultas, resumir tickets), armá un conjunto de casos de prueba con la respuesta correcta y medí cuántos acierta.\n\nCuando cambies el pedido o el modelo, volvé a correr esos casos. Sin medir, es fácil creer que mejoró cuando solo cambió.", 'Casos de prueba con respuesta esperada: medí antes de confiar.', '¿Para qué sirve un conjunto de casos de prueba?', ['Para que la IA aprenda sola', 'Para medir si un cambio mejora o empeora el resultado', 'Para gastar menos'], 1],
      [1, 'Automatizar con límites', "Antes de automatizar, preguntate: ¿qué pasa si se equivoca? Si el error es barato y fácil de detectar, automatizá. Si es caro o invisible, dejá una persona revisando.\n\nTambién mirá costos y tiempos: cada llamada a un modelo cuesta, y los textos largos cuestan más. Un flujo que corre mil veces al día multiplica todo.", 'Error barato y visible: automatizá. Caro o invisible: revisión humana.', '¿Cuándo conviene dejar una persona revisando?', ['Cuando el error es barato', 'Cuando el error es caro o difícil de detectar', 'Nunca'], 1],
      [1, 'Cuándo no usar IA', "La IA no es la mejor opción para todo. Si hay una fórmula, una regla fija o una consulta exacta (sumar una columna, validar un formato), una herramienta tradicional es más barata, rápida y predecible.\n\nUsala donde aporta: lenguaje, ambigüedad, resúmenes, borradores. Y transparentá cuándo un contenido se hizo con IA si tu contexto lo pide.", 'Si hay una regla exacta, no hace falta un modelo.', 'Querés sumar una columna de una planilla. ¿Qué conviene?', ['Pedírselo a un agente', 'Una fórmula de la planilla', 'Un modelo de imágenes'], 1],
    ],
    exam: [
      ['Un agente que puede borrar archivos para una tarea de solo lectura tiene…', ['Los permisos justos', 'Más permisos de los necesarios', 'Menos permisos'], 1],
      ['Instrucciones escondidas en un documento que lee un agente son…', ['Prompt injection', 'Few-shot', 'Rebalanceo'], 0],
      ['Las acciones irreversibles de un agente conviene…', ['Confirmarlas antes', 'Hacerlas sin avisar', 'Repetirlas'], 0],
      ['Al cambiar el modelo de un flujo automatizado conviene…', ['Asumir que mejoró', 'Volver a correr los casos de prueba', 'Borrar los casos de prueba'], 1],
      ['Un flujo que corre muchas veces al día…', ['No tiene costo', 'Multiplica costos y errores', 'No necesita revisión'], 1],
      ['Para validar el formato de un CUIT conviene…', ['Una regla fija o validación tradicional', 'Un agente con todos los permisos', 'Un chat largo'], 0],
      ['Lo que un agente lee en la web debe tratarse como…', ['Órdenes', 'Información', 'Contraseñas'], 1],
      ['Para empezar a usar un agente nuevo conviene…', ['Darle tareas críticas', 'Darle tareas de bajo riesgo y revisar', 'No revisar nada'], 1],
    ],
  },
]
