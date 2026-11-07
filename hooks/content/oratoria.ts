import type { Route } from '../routes'

// Oratoria en tres niveles: de armar una charla clara a persuadir, improvisar y responder preguntas.

export const ORATORIA: Route[] = [
  {
    id: 'oratoria-1', track: 'oratoria', level: 1, topic: 'Comunicación', name: 'Oratoria · Fundamentos',
    keywords: ['oratoria', 'hablar en público', 'presentaciones', 'nervios', 'estructura', 'voz', 'comunicación'],
    blurb: 'Una idea central, una estructura simple, el público, la respiración y los nervios.', pace: '6 paradas · 3 min',
    legs: ['Preparar', 'Pararse a hablar'],
    steps: [
      [0, 'Una sola idea central', "Antes de armar diapositivas o anotar datos, respondé una pregunta: si el público se lleva una sola frase, ¿cuál es?\n\nEsa frase es tu idea central. Todo lo que digas tiene que sostenerla, y lo que no la sostiene sobra, aunque sea interesante. Las charlas que se olvidan rápido suelen tener cinco ideas a medias en lugar de una completa.", 'Si no lo podés decir en una frase, todavía no está listo.', '¿Qué conviene definir primero?', ['Las diapositivas', 'La idea central en una frase', 'El chiste de apertura'], 1],
      [0, 'Apertura, tres puntos, cierre', "Una estructura simple alcanza para casi todo: una apertura que diga por qué importa, un cuerpo con tres puntos y un cierre que vuelva a la idea central.\n\nTres es un número que la memoria retiene bien: con dos parece incompleto y con cinco se pierde. Anunciá los puntos al principio y marcá cada pasaje: «El segundo punto es…».", 'Apertura + tres puntos + cierre, y anunciá el camino.', '¿Por qué conviene anunciar los puntos?', ['Para alargar la charla', 'Para que el público sepa dónde está', 'Porque es obligatorio'], 1],
      [0, 'Hablarle a alguien', "La misma charla cambia según quién escucha. Preguntate qué sabe ya tu público, qué le preocupa y qué va a hacer con lo que digas.\n\nUn ejemplo que funciona con programadores puede no funcionar con clientes. Si no sabés quién va a estar, preguntá antes o arrancá con una pregunta al público para calibrar.", 'Elegí ejemplos y palabras pensando en quién escucha.', '¿Qué hacer si no sabés quién va a estar?', ['Hablar más rápido', 'Preguntar antes o calibrar con una pregunta al inicio', 'Usar más tecnicismos'], 1],
      [1, 'Respirar y hacer pausas', "Con los nervios, la respiración se vuelve corta y alta, y la voz se acelera. Respirar con el abdomen (la panza se infla al inhalar) da aire para frases completas y calma el cuerpo.\n\nLas pausas no son silencios incómodos: le dan tiempo al público para procesar. Una pausa de dos segundos después de una idea importante la subraya.", 'Una pausa después de lo importante vale más que una palabra extra.', '¿Para qué sirve una pausa después de una idea clave?', ['Para ganar tiempo', 'Para que el público la procese y se destaque', 'Para recordar lo que sigue'], 1],
      [1, 'Los nervios como energía', "El cuerpo nervioso y el cuerpo entusiasmado se parecen mucho: corazón rápido, energía alta. Investigaciones de Alison Wood Brooks (Harvard, 2014) mostraron que decirse «estoy entusiasmado» funciona mejor que intentar calmarse.\n\nLo que más baja los nervios es la preparación: conocer muy bien los primeros dos minutos hace que el resto fluya.", 'Reencuadrá: no estoy nervioso, estoy con energía.', '¿Qué funcionó mejor en el estudio de Brooks?', ['Decirse «calmate»', 'Decirse «estoy entusiasmado»', 'No pensar en nada'], 1],
      [1, 'Ensayar en voz alta', "Leer la charla mentalmente no es ensayar. Decila en voz alta, de pie y con un cronómetro: vas a descubrir frases que no salen, transiciones que faltan y que dura más de lo que creías.\n\nTres ensayos completos en voz alta cambian mucho más que diez lecturas en silencio. Memorizá la apertura y el cierre; el medio, por puntos, no palabra por palabra.", 'Ensayo real = de pie, en voz alta, con cronómetro.', '¿Qué conviene memorizar casi textual?', ['Toda la charla', 'La apertura y el cierre', 'Nada'], 1],
    ],
    exam: [
      ['Tu charla tiene cinco ideas igual de importantes. ¿Qué conviene?', ['Mantenerlas todas', 'Elegir una idea central y que las demás la sostengan', 'Decirlas más rápido'], 1],
      ['¿Cuántos puntos principales suele retener mejor un público?', ['Uno o dos', 'Tres', 'Siete'], 1],
      ['La respiración abdominal sirve para…', ['Hablar más bajo', 'Tener aire para frases completas y calmar el cuerpo', 'Sonar más grave siempre'], 1],
      ['Leer la charla en silencio diez veces…', ['Es el mejor ensayo', 'Rinde menos que ensayarla en voz alta', 'Reemplaza el cronómetro'], 1],
      ['Antes de una charla sentís el corazón acelerado. ¿Qué frase ayuda más?', ['«Tengo que calmarme»', '«Estoy entusiasmado»', '«Va a salir mal»'], 1],
      ['Elegís ejemplos según…', ['Lo que te gusta a vos', 'Lo que sabe y necesita el público', 'Lo que salga en el momento'], 1],
      ['Un buen cierre…', ['Agrega un tema nuevo', 'Vuelve a la idea central', 'Termina con «bueno, eso es todo»'], 1],
      ['¿Qué parte conviene dominar más para bajar los nervios?', ['Los primeros minutos', 'Las preguntas finales', 'Los agradecimientos'], 0],
    ],
  },
  {
    id: 'oratoria-2', track: 'oratoria', level: 2, topic: 'Comunicación', name: 'Oratoria · Intermedio',
    keywords: ['oratoria', 'storytelling', 'historias', 'lenguaje corporal', 'muletillas', 'diapositivas', 'apertura', 'cierre'],
    blurb: 'Aperturas que enganchan, historias, cuerpo, voz, diapositivas y cierres memorables.', pace: '6 paradas · 3 min',
    legs: ['Contenido que engancha', 'Cuerpo y voz'],
    steps: [
      [0, 'Aperturas que enganchan', "«Bueno, hoy les voy a hablar de…» desperdicia los segundos de mayor atención. Mejor arrancar con algo que genere curiosidad: una pregunta, una historia breve, un dato sorprendente o una imagen.\n\n«El 70 % de las reuniones de esta empresa terminan sin una decisión. Hoy vamos a ver por qué.» Recién después, presentate si hace falta.", 'Los primeros 30 segundos son para despertar curiosidad, no para presentarte.', '¿Cuál es mejor apertura?', ['«Bueno, hoy les voy a hablar de reuniones»', '«El 70 % de nuestras reuniones termina sin decisión. ¿Por qué?»', '«Perdón si me pongo nervioso»'], 1],
      [0, 'Contar historias', "Las historias se recuerdan mucho más que los datos sueltos. Una estructura que funciona: situación (dónde y quién), conflicto (qué salió mal o qué estaba en juego) y resolución (qué pasó y qué aprendimos).\n\nUsá detalles concretos y personas reales: «Marta, de soporte, recibió 40 llamadas en una hora» pega más que «hubo muchos reclamos».", 'Situación, conflicto, resolución, con detalles concretos.', '¿Qué hace memorable una historia?', ['Que sea larga', 'Un conflicto y detalles concretos', 'Muchos datos'], 1],
      [0, 'Diapositivas que acompañan', "Las diapositivas acompañan, no reemplazan. Una idea por diapositiva, poco texto y letra grande. Si el público lee un párrafo, deja de escucharte.\n\nNunca leas tus diapositivas en voz alta: el público lee más rápido de lo que hablás. Mejor una imagen o una cifra grande, y que la explicación la pongas vos.", 'Una idea por diapositiva; la explicación la ponés vos.', '¿Qué pasa si leés las diapositivas en voz alta?', ['El público presta más atención', 'El público lee antes y deja de escucharte', 'Nada'], 1],
      [1, 'El cuerpo también habla', "Parate estable, con el peso repartido en los dos pies: el balanceo transmite inseguridad. Usá gestos abiertos, a la altura de la cintura y el pecho, y dejá las manos libres en lugar de esconderlas.\n\nContacto visual: terminá cada frase mirando a una persona, después pasá a otra en otro sector. Así todos sienten que les hablás.", 'Pies firmes, manos visibles y una frase por mirada.', '¿Cómo repartir el contacto visual?', ['Mirar siempre al mismo lado', 'Una frase por persona, cambiando de sector', 'Mirar al techo'], 1],
      [1, 'Voz y muletillas', "La voz tiene cuatro controles: volumen, velocidad, tono y énfasis. Variarlos mantiene la atención; la monotonía la apaga.\n\nLas muletillas (eh, este, o sea) aparecen cuando el cerebro busca la próxima palabra. El reemplazo es una pausa en silencio, que suena segura. Grabate dos minutos y contá tus muletillas: verlas es el primer paso.", 'Cambiá cada «eh» por una pausa en silencio.', '¿Con qué conviene reemplazar las muletillas?', ['Con otra muletilla', 'Con una pausa en silencio', 'Hablando más rápido'], 1],
      [1, 'Cierres memorables', "El final es lo que más se recuerda. Evitá terminar con «bueno, eso es todo» o con preguntas sueltas. Algunas opciones: volver a la historia o pregunta del inicio, resumir la idea central en una frase, o pedir una acción concreta.\n\nSi hay preguntas, después de responderlas volvé a cerrar con tu frase final: que la última palabra sea tuya.", 'Cerrá con intención y que la última frase sea tuya.', '¿Qué conviene hacer después de la ronda de preguntas?', ['Irse sin decir nada', 'Volver a cerrar con la frase final', 'Abrir un tema nuevo'], 1],
    ],
    exam: [
      ['¿Qué desperdicia los primeros segundos de una charla?', ['Una pregunta intrigante', 'Disculparse y anunciar el tema sin más', 'Un dato sorprendente'], 1],
      ['Las partes de una historia efectiva son…', ['Inicio, chiste y final', 'Situación, conflicto y resolución', 'Datos, gráficos y conclusión'], 1],
      ['Una diapositiva con un párrafo largo…', ['Ayuda a recordar', 'Compite con tu voz por la atención', 'Es lo recomendado'], 1],
      ['Balancearte de un pie al otro transmite…', ['Confianza', 'Inseguridad', 'Energía'], 1],
      ['La monotonía se combate variando…', ['Solo el volumen', 'Volumen, velocidad, tono y énfasis', 'El vestuario'], 1],
      ['Para detectar tus muletillas conviene…', ['Ignorarlas', 'Grabarte y contarlas', 'Hablar más rápido'], 1],
      ['«Marta recibió 40 llamadas en una hora» funciona mejor que «hubo muchos reclamos» porque…', ['Es más corto', 'Es concreto y tiene una persona', 'Tiene un número cualquiera'], 1],
      ['Un cierre con llamado a la acción…', ['Pide algo concreto al público', 'Agradece y se va', 'Repite todas las diapositivas'], 0],
    ],
  },
  {
    id: 'oratoria-3', track: 'oratoria', level: 3, topic: 'Comunicación', name: 'Oratoria · Avanzado',
    keywords: ['oratoria', 'persuasión', 'ethos', 'pathos', 'logos', 'preguntas', 'improvisación', 'virtual', 'imprevistos'],
    blurb: 'Persuadir, responder preguntas, improvisar, hablar en remoto y manejar imprevistos.', pace: '6 paradas · 4 min',
    legs: ['Persuadir y responder', 'Situaciones reales'],
    steps: [
      [0, 'Ethos, pathos y logos', "Aristóteles describió tres formas de persuadir: ethos (credibilidad: por qué escucharte), pathos (emoción: por qué le importa al público) y logos (lógica: datos y argumentos).\n\nLas charlas persuasivas combinan las tres. Solo datos aburren; solo emoción parece manipulación; sin credibilidad, nada convence. Revisá tu charla y preguntate cuál falta.", 'Credibilidad, emoción y lógica: revisá cuál te falta.', '¿Qué es el ethos?', ['La emoción', 'La credibilidad de quien habla', 'Los datos'], 1],
      [0, 'Responder preguntas', "Escuchá la pregunta completa sin interrumpir. Reformulala en voz alta («Me preguntás si…»): confirma que entendiste y todos la escuchan. Respondé breve y concreto, y volvé a mirar al grupo, no solo a quien preguntó.\n\nSi no sabés, decilo: «No lo sé; lo averiguo y te escribo». Inventar destruye la credibilidad que construiste en toda la charla.", 'Escuchar, reformular, responder breve; y «no sé» es válido.', '¿Qué conviene hacer si no sabés la respuesta?', ['Inventar algo razonable', 'Decir que no sabés y comprometerte a averiguar', 'Cambiar de tema'], 1],
      [0, 'Improvisar con PREP', "Cuando te piden opinión sin aviso, la estructura PREP ordena la respuesta en segundos: Punto (tu postura), Razón (por qué), Ejemplo (un caso concreto) y Punto (repetís la postura).\n\n«Creo que conviene posponer el lanzamiento. La razón es que soporte no está listo. El mes pasado, con la versión 2, tuvimos 300 reclamos en un día. Por eso propongo posponerlo dos semanas.»", 'PREP: Punto, Razón, Ejemplo, Punto.', '¿Qué va en la E de PREP?', ['Emoción', 'Un ejemplo concreto', 'Evaluación'], 1],
      [1, 'Hablar en remoto', "En una videollamada se pierde energía. Poné la cámara a la altura de los ojos, con luz de frente, y mirá a la cámara cuando decís algo importante: es la forma de mirar a los ojos a distancia.\n\nSubí un poco el volumen y la expresividad, y hacé preguntas cada pocos minutos o usá el chat, porque sin interacción la atención cae rápido.", 'Cámara a la altura de los ojos y mirarla en lo importante.', '¿Dónde mirar para que el público sienta contacto visual?', ['A la pantalla', 'A la cámara', 'A las notas'], 1],
      [1, 'Cuando algo sale mal', "Te olvidás lo que seguía: hacé una pausa, tomá agua, mirá tus notas o resumí lo último que dijiste. El público casi nunca nota un olvido; nota el pánico.\n\nSi falla la tecnología, tené un plan B: la charla tiene que poder darse sin diapositivas. Una frase con humor («Las diapositivas decidieron tomarse el día») y seguir es lo más profesional.", 'Pausa, notas y seguir: el público perdona el olvido, no el pánico.', '¿Qué hacer si te quedás en blanco?', ['Pedir disculpas largamente', 'Pausar, mirar notas o resumir lo anterior', 'Terminar la charla'], 1],
      [1, 'Mejorar con método', "La forma más rápida de mejorar es verse. Grabate, mirá el video con el sonido apagado (para ver el cuerpo) y después solo escuchá (para oír la voz).\n\nTrabajá una sola cosa por vez: esta semana las muletillas, la próxima el contacto visual. Pedí feedback específico: «¿Qué parte se entendió menos?» rinde más que «¿Qué te pareció?».", 'Grabate y trabajá una mejora por vez.', '¿Qué pregunta da feedback más útil?', ['¿Te gustó?', '¿Qué parte se entendió menos?', '¿Estuve bien?'], 1],
    ],
    exam: [
      ['Una charla solo con datos y gráficos tiene mucho…', ['Pathos', 'Logos', 'Ethos'], 1],
      ['Contar por qué tenés experiencia en el tema construye…', ['Ethos', 'Pathos', 'Logos'], 0],
      ['Al responder una pregunta, reformularla sirve para…', ['Ganar tiempo solamente', 'Confirmar que entendiste y que todos la escuchen', 'Evitar responder'], 1],
      ['PREP termina con…', ['Una pregunta', 'Repetir tu punto', 'Un chiste'], 1],
      ['En una videollamada, la cámara conviene…', ['Debajo del mentón', 'A la altura de los ojos', 'Al costado'], 1],
      ['Si fallan las diapositivas…', ['Cancelás la charla', 'Seguís con tu plan B sin ellas', 'Esperás en silencio'], 1],
      ['Mirar tu grabación sin sonido sirve para analizar…', ['La voz', 'El lenguaje corporal', 'El contenido'], 1],
      ['Para mejorar más rápido conviene…', ['Corregir todo a la vez', 'Trabajar una mejora por vez', 'No grabarte'], 1],
    ],
  },
]
