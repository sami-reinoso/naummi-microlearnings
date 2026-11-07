import type { Route } from '../routes'

// Inglés para el trabajo en tres niveles: de mails y reuniones a negociar y presentar.

export const INGLES: Route[] = [
  {
    id: 'ingles-1', track: 'ingles', level: 1, topic: 'Idiomas', name: 'Inglés para el trabajo · Fundamentos',
    keywords: ['inglés', 'english', 'trabajo', 'mails', 'reuniones', 'vocabulario', 'false friends'],
    blurb: 'Mails claros, presentarte, reuniones, preguntas cortas y falsos amigos.', pace: '6 paradas · 3 min',
    legs: ['Escribir', 'Hablar'],
    steps: [
      [0, 'Un mail en tres partes', "Un mail de trabajo en inglés suele ser corto: saludo, pedido o información, y cierre.\n\n«Hi Sarah, Could you send me the Q3 report by Friday? Thanks, Ana»\n\n«Could you…» es la forma amable y estándar de pedir algo. «I need you to…» suena brusco. Para cerrar: «Thanks», «Best» o «Kind regards» (más formal).", '«Could you…?» para pedir; «Best» o «Thanks» para cerrar.', '¿Cuál es la forma más amable de pedir algo?', ['I need you to send it', 'Could you send it?', 'Send it'], 1],
      [0, 'Seguimiento sin presionar', "Para recordar algo pendiente sin sonar insistente:\n\n«Just following up on my previous email.»\n«Any update on this?»\n«Let me know if you need anything else from me.»\n\nEvitá «As I said before…», que en inglés puede sonar a reproche.", '«Just following up» es el recordatorio cordial estándar.', '¿Qué frase sirve para un recordatorio cordial?', ['As I said before', 'Just following up on my previous email', 'Why didn’t you answer?'], 1],
      [0, 'Falsos amigos', "Palabras que parecen iguales pero no lo son: «actually» es «en realidad», no «actualmente» (eso es «currently»). «Eventually» es «finalmente», no «eventualmente». «Assist» es ayudar, no asistir a una reunión (eso es «attend»).\n\n«I’ll attend the meeting» = voy a ir a la reunión.", 'Actually = en realidad; currently = actualmente.', '¿Cómo se dice «actualmente trabajo en ventas»?', ['Actually I work in sales', 'Currently I work in sales', 'Eventually I work in sales'], 1],
      [1, 'Presentarte en 20 segundos', "Una fórmula simple: nombre, rol y qué hacés o en qué estás ahora.\n\n«Hi, I’m Ana. I’m a product designer, and I’m currently working on the new checkout.»\n\nEn presente para lo que hacés habitualmente (I work, I lead) y presente continuo para lo de ahora (I’m working on).", 'Nombre + rol + en qué estás ahora.', '¿Qué tiempo verbal va para «estoy trabajando en el checkout»?', ['I work on the checkout', 'I’m working on the checkout', 'I worked on the checkout'], 1],
      [1, 'Frases para reuniones', "Para participar sin trabarte:\n\n«Can I add something?» (sumar algo)\n«Sorry, could you repeat that?» (pedir repetición)\n«Just to clarify, do you mean…?» (confirmar)\n«Let’s take this offline.» (lo hablamos aparte)\n\nPedir que repitan es normal y profesional; adivinar no lo es.", 'Pedir que repitan o aclarar es profesional.', '¿Qué significa «let’s take this offline»?', ['Desconectemos internet', 'Lo hablamos aparte, fuera de esta reunión', 'Cancelemos'], 1],
      [1, 'Preguntas cortas y respuestas', "En inglés se responde corto con el auxiliar: «Are you ready?» «Yes, I am.» «Did you send it?» «No, I didn’t.»\n\nY para confirmar, las question tags: «You sent it, didn’t you?» «It’s ready, isn’t it?». Suenan naturales y amables.", 'Responder con el auxiliar: Yes, I am / No, I didn’t.', '¿Cuál es la respuesta corta correcta a «Did you call him?»?', ['Yes, I called', 'Yes, I did', 'Yes, I do'], 1],
    ],
    exam: [
      ['«Eventually» significa…', ['Eventualmente', 'Finalmente, con el tiempo', 'Ocasionalmente'], 1],
      ['Para cerrar un mail formal…', ['Cheers mate', 'Kind regards', 'Bye'], 1],
      ['«I’ll attend the meeting» significa…', ['Voy a ayudar en la reunión', 'Voy a ir a la reunión', 'Voy a organizar la reunión'], 1],
      ['¿Cuál suena más amable?', ['Send me the file', 'Could you send me the file?', 'You must send the file'], 1],
      ['«Just to clarify, do you mean…?» sirve para…', ['Cerrar la reunión', 'Confirmar que entendiste', 'Interrumpir'], 1],
      ['«It’s ready, …?» se completa con…', ['isn’t it', 'is it', 'doesn’t it'], 0],
      ['Para hablar de lo que hacés habitualmente usás…', ['Presente simple: I lead the team', 'Presente continuo: I’m leading the team', 'Pasado'], 0],
      ['«Any update on this?» es…', ['Una queja formal', 'Un pedido de novedades', 'Un saludo'], 1],
    ],
  },
  {
    id: 'ingles-2', track: 'ingles', level: 2, topic: 'Idiomas', name: 'Inglés para el trabajo · Intermedio',
    keywords: ['inglés', 'english', 'phrasal verbs', 'feedback', 'llamadas', 'estimaciones', 'diplomacia'],
    blurb: 'Phrasal verbs de oficina, dar feedback, sonar diplomática, llamadas y estimaciones.', pace: '6 paradas · 3 min',
    legs: ['Vocabulario', 'Matices'],
    steps: [
      [0, 'Phrasal verbs de oficina', "Muy usados en el trabajo:\n\n«set up» (armar, configurar una reunión), «follow up» (hacer seguimiento), «put off» (posponer), «figure out» (resolver, entender), «run into» (encontrarse con un problema).\n\n«We ran into an issue with the API, but we figured it out.»", 'set up, follow up, put off, figure out, run into.', '¿Qué significa «put off the meeting»?', ['Cancelarla para siempre', 'Posponerla', 'Empezarla'], 1],
      [0, 'Estimaciones y plazos', "Para hablar de tiempos sin comprometerte de más:\n\n«It should take about two days.»\n«We’re aiming for Friday.»\n«I’ll get back to you by end of day.» (EOD)\n«That’s a rough estimate.»\n\n«Should» y «aiming for» muestran intención sin prometer algo que quizás no se cumpla.", '«Should» y «aiming for» = estimar sin prometer.', '¿Qué significa EOD?', ['End of discussion', 'End of day', 'Every other day'], 1],
      [0, 'Llamadas y videollamadas', "Frases útiles:\n\n«You’re on mute.» (estás muteado)\n«Can you see my screen?»\n«You’re breaking up.» (se corta tu audio)\n«Let me share my screen.»\n«I’ll drop off now, thanks everyone.» (me voy)\n\nSi no entendés por la conexión, decilo: «Sorry, the connection is bad, could you say that again?»", '«You’re on mute» y «you’re breaking up» resuelven media llamada.', '¿Qué significa «you’re breaking up»?', ['Estás terminando la relación', 'Se corta tu audio', 'Estás enojado'], 1],
      [1, 'Sonar diplomática', "El inglés de trabajo suaviza mucho. En lugar de «That’s wrong», se dice «I’m not sure that’s quite right». En lugar de «No», «I’m afraid we can’t do that this sprint».\n\nPalabras suavizantes: «a bit», «slightly», «perhaps», «I was wondering if…».\n\nLo que en castellano rioplatense suena directo y normal, en inglés puede sonar duro.", 'Suavizá: «I’m not sure that’s quite right».', '¿Cuál suena más diplomática?', ['That’s wrong', 'I’m not sure that’s quite right', 'No'], 1],
      [1, 'Dar feedback', "Una estructura clara: lo que funcionó, lo que se puede mejorar y una sugerencia concreta.\n\n«I really liked how you structured the deck. One thing that could be clearer is the pricing slide. Maybe we could add an example?»\n\n«One thing that could be…» suena mucho mejor que «The problem is…».", 'Funcionó + se puede mejorar + sugerencia.', '¿Qué frase introduce mejor una mejora?', ['The problem is…', 'One thing that could be clearer is…', 'You did it wrong'], 1],
      [1, 'Escuchar números y fechas', "En inglés de Estados Unidos las fechas van mes/día: 03/04 es 4 de marzo. En el Reino Unido, día/mes. Ante la duda, escribí el mes con letras: «March 4».\n\n«Fifteen» (15) y «fifty» (50) se confunden: la acentuación cambia (fif-TEEN, FIF-ty). Confirmá números importantes repitiéndolos.", 'Escribí el mes en letras y repetí los números clave.', 'En EE. UU., 03/04 es…', ['3 de abril', '4 de marzo', 'Ninguna'], 1],
    ],
    exam: [
      ['«We ran into a problem» significa…', ['Escapamos de un problema', 'Nos encontramos con un problema', 'Creamos un problema'], 1],
      ['«Let’s set up a call» significa…', ['Cancelemos la llamada', 'Armemos una llamada', 'Cortemos la llamada'], 1],
      ['«We’re aiming for Friday» expresa…', ['Una promesa firme', 'Un objetivo sin garantía', 'Un retraso'], 1],
      ['«I was wondering if you could…» es…', ['Una forma muy directa', 'Una forma suave de pedir', 'Una queja'], 1],
      ['«I’ll drop off now» significa…', ['Me caigo', 'Me voy de la llamada', 'Bajo el volumen'], 1],
      ['Para evitar confusiones de fecha conviene…', ['Escribir 03/04', 'Escribir March 4', 'No poner fecha'], 1],
      ['«Fifty» lleva el acento en…', ['FIF-ty', 'fif-TY', 'Ninguna sílaba'], 0],
      ['Un buen feedback incluye…', ['Solo lo malo', 'Lo que funcionó, lo mejorable y una sugerencia', 'Solo elogios'], 1],
    ],
  },
  {
    id: 'ingles-3', track: 'ingles', level: 3, topic: 'Idiomas', name: 'Inglés para el trabajo · Avanzado',
    keywords: ['inglés', 'english', 'negociar', 'presentaciones', 'entrevistas', 'small talk', 'condicionales'],
    blurb: 'Negociar, presentar, entrevistas, small talk y estructuras avanzadas.', pace: '6 paradas · 4 min',
    legs: ['Situaciones clave', 'Precisión'],
    steps: [
      [0, 'Negociar', "Frases para negociar sin tensión:\n\n«What if we…?» (propuesta)\n«Would you be open to…?» (tantear)\n«That doesn’t quite work for us, but we could…» (contraoferta)\n«Let’s meet in the middle.»\n\nCondicionales como «If you could…, we could…» muestran disposición a ceder a cambio de algo.", '«If you could…, we could…» = ceder a cambio de algo.', '¿Qué frase propone una contraoferta?', ['No way', 'That doesn’t quite work for us, but we could…', 'Fine'], 1],
      [0, 'Presentar en inglés', "Señalizadores que ordenan la charla: «Today I’ll walk you through…», «Let’s move on to…», «To sum up…», «Happy to take any questions».\n\nFrases cortas y pausas te dan tiempo para pensar. Si te trabás con una palabra, describila: «the thing that…». Nadie espera perfección; espera claridad.", 'Señalizá el camino: walk you through, move on, to sum up.', '¿Qué frase sirve para pasar al siguiente tema?', ['To sum up', 'Let’s move on to…', 'Happy to take questions'], 1],
      [0, 'Entrevistas: STAR', "Para preguntas como «Tell me about a time when…», usá STAR: Situation, Task, Action, Result.\n\n«Our checkout had a 30 % drop-off (S). I had to find why (T). I ran five user tests and simplified the form (A). Drop-off fell to 18 % (R).»\n\nEn la acción usá «I», no «we»: quieren saber qué hiciste vos.", 'STAR, y en la acción decí «I».', '¿Qué va en la R de STAR?', ['Reason', 'Result', 'Risk'], 1],
      [1, 'Small talk', "Charla breve antes de una reunión. Temas seguros: el fin de semana, el clima, viajes, el lugar donde vive la otra persona.\n\n«How was your weekend?» «Pretty good, thanks! I went hiking. How about you?»\n\nLa clave es devolver la pregunta («How about you?»). Evitá política, plata y religión.", 'Respondé y devolvé: «How about you?».', '¿Cuál es un buen tema de small talk?', ['Sueldos', 'Planes del fin de semana', 'Política'], 1],
      [1, 'Condicionales', "Segundo condicional para hipótesis: «If we had more budget, we would hire.» Tercero para el pasado que no fue: «If we had tested earlier, we would have caught the bug.»\n\nEl tercero sirve en retrospectivas sin culpar: describe qué habría cambiado el resultado.", 'If + had + participio, would have + participio: lo que no pasó.', '¿Qué condicional describe algo que no pasó en el pasado?', ['Primero', 'Segundo', 'Tercero'], 2],
      [1, 'Matices de modales', "«Must» es obligación fuerte; «should», recomendación; «might», posibilidad. En el trabajo, «should» y «might» suavizan.\n\n«You must update the doc» suena a orden. «You might want to update the doc» suena a sugerencia amable.\n\n«Have to» expresa obligación externa: «We have to comply with the new policy.»", '«You might want to…» = sugerencia amable.', '¿Cuál suena más a sugerencia?', ['You must update it', 'You might want to update it', 'Update it'], 1],
    ],
    exam: [
      ['«Would you be open to…?» sirve para…', ['Cerrar un trato', 'Tantear una propuesta', 'Rechazar'], 1],
      ['«To sum up» se usa…', ['Al inicio', 'Para resumir y cerrar', 'Para preguntar'], 1],
      ['En STAR, en la parte de acción conviene decir…', ['We', 'I', 'They'], 1],
      ['«If I were you, I would…» es…', ['Primer condicional', 'Segundo condicional', 'Tercer condicional'], 1],
      ['«If we had launched earlier, we would have won the client» habla de…', ['Algo posible mañana', 'Algo que no ocurrió en el pasado', 'Una regla general'], 1],
      ['Tras responder una pregunta de small talk conviene…', ['Cambiar de tema', 'Devolver la pregunta', 'Terminar la charla'], 1],
      ['«We have to comply with the regulation» expresa…', ['Una sugerencia', 'Una obligación externa', 'Una posibilidad'], 1],
      ['«Let’s meet in the middle» propone…', ['Reunirse en un punto físico', 'Llegar a un punto intermedio', 'Terminar'], 1],
    ],
  },
]
