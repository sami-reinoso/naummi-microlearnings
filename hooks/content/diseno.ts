import type { Route } from '../routes'

// Diseño de interfaces en tres niveles: de la jerarquía visual a los sistemas de diseño.

export const DISENO: Route[] = [
  {
    id: 'diseno-1', track: 'diseno', level: 1, topic: 'Producto y diseño', name: 'Diseño de interfaces · Fundamentos',
    keywords: ['diseño', 'ui', 'ux', 'interfaces', 'jerarquía', 'tipografía', 'color', 'espaciado'],
    blurb: 'Jerarquía visual, espaciado, tipografía, color, contraste y alineación.', pace: '6 paradas · 3 min',
    legs: ['Ver', 'Ordenar'],
    steps: [
      [0, 'Jerarquía visual', "La jerarquía le dice al ojo qué mirar primero. Se construye con tamaño, peso, color y posición: lo más importante, más grande o más contrastado, y arriba.\n\nUna prueba rápida: entrecerrá los ojos frente a la pantalla. Lo que todavía se distingue es lo que domina. Si todo se ve igual, no hay jerarquía.", 'Entrecerrá los ojos: lo que se ve es lo que domina.', '¿Qué crea jerarquía visual?', ['Usar la misma letra en todo', 'Diferencias de tamaño, peso, color y posición', 'Muchos colores'], 1],
      [0, 'Espaciado y proximidad', "Lo que está cerca se percibe como relacionado (ley de proximidad). Un label pegado a su campo y separado del siguiente se entiende sin líneas ni cajas.\n\nUsá una escala de espaciado fija (por ejemplo 4, 8, 16, 24, 32 px) y más espacio entre grupos que dentro de ellos.", 'Más espacio entre grupos que dentro de ellos.', 'Según la proximidad, dos elementos cercanos…', ['Se ven independientes', 'Se perciben relacionados', 'Se ven más grandes'], 1],
      [0, 'Tipografía legible', "Para texto de lectura: 16 px o más en pantalla, interlineado de 1,4 a 1,6, y líneas de 50 a 75 caracteres. Una o dos familias tipográficas alcanzan.\n\nDefiní una escala de tamaños (por ejemplo 12, 14, 16, 20, 24, 32) y usala siempre: tamaños sueltos hacen que la interfaz se vea desprolija.", 'Texto ≥16 px, interlineado 1,5 y líneas de ~65 caracteres.', '¿Qué largo de línea se lee mejor?', ['20 caracteres', '50 a 75 caracteres', '150 caracteres'], 1],
      [1, 'Color con intención', "Un esquema útil: neutros para la mayor parte, un color de acento para acciones e información importante, y colores de estado (éxito, alerta, error) aparte.\n\nNo uses el color como única señal: alrededor del 8 % de los hombres tiene alguna forma de daltonismo. Sumá un ícono o un texto («Error: …»).", 'El color no puede ser la única señal.', '¿Por qué no usar solo color para indicar un error?', ['Porque es feo', 'Porque hay personas que no distinguen ciertos colores', 'Porque es lento'], 1],
      [1, 'Contraste', "El texto tiene que contrastar con el fondo. Las pautas WCAG piden al menos 4,5:1 para texto normal y 3:1 para texto grande.\n\nGris claro sobre blanco se ve elegante en un monitor caro y se vuelve ilegible al sol o en una pantalla barata. Verificá con una herramienta de contraste.", 'Texto normal: contraste mínimo 4,5:1.', '¿Qué contraste mínimo piden las WCAG para texto normal?', ['2:1', '4,5:1', '10:1'], 1],
      [1, 'Alineación y grilla', "Alinear elementos a líneas comunes hace que la interfaz se vea ordenada sin esfuerzo. Una grilla (por ejemplo de 12 columnas, o una base de 8 px) da reglas para ubicar todo.\n\nCentrar todo es tentador pero dificulta la lectura: para bloques de texto, alineá a la izquierda.", 'Grilla y alineación a la izquierda para texto.', '¿Cómo conviene alinear un párrafo largo?', ['Centrado', 'A la izquierda', 'Justificado al centro'], 1],
    ],
    exam: [
      ['Si al entrecerrar los ojos todo se ve igual…', ['La jerarquía es perfecta', 'Falta jerarquía', 'Hay demasiado contraste'], 1],
      ['Un label conviene que esté…', ['Equidistante de dos campos', 'Más cerca de su campo que del siguiente', 'Lejos de todo'], 1],
      ['Para texto de lectura en pantalla, un tamaño razonable es…', ['10 px', '16 px o más', '40 px'], 1],
      ['Un buen esquema de color tiene…', ['Muchos acentos', 'Neutros, un acento y colores de estado', 'Solo colores saturados'], 1],
      ['Texto gris claro sobre blanco…', ['Siempre es accesible', 'Puede no cumplir el contraste mínimo', 'Mejora la lectura'], 1],
      ['Para indicar un error conviene…', ['Solo borde rojo', 'Color más ícono o texto', 'Solo un sonido'], 1],
      ['Una escala de espaciado fija sirve para…', ['Que todo tenga el mismo espacio', 'Que los espacios sean consistentes', 'Ahorrar píxeles'], 1],
      ['Usar muchas familias tipográficas…', ['Ayuda a la jerarquía', 'Suele verse desordenado', 'Es obligatorio'], 1],
    ],
  },
  {
    id: 'diseno-2', track: 'diseno', level: 2, topic: 'Producto y diseño', name: 'Diseño de interfaces · Intermedio',
    keywords: ['diseño', 'ui', 'ux', 'formularios', 'estados', 'feedback', 'botones', 'mobile'],
    blurb: 'Botones, formularios, estados de la interfaz, feedback, mobile y microcopy.', pace: '6 paradas · 3 min',
    legs: ['Componentes', 'Interacción'],
    steps: [
      [0, 'Botones con jerarquía', "En cada pantalla debería haber una acción principal clara (botón lleno, color de acento) y las secundarias más discretas (borde o texto).\n\nEl texto del botón dice qué pasa: «Guardar cambios» en lugar de «OK» o «Aceptar». Si todos los botones gritan, ninguno se escucha.", 'Una acción principal por pantalla; el texto dice qué pasa.', '¿Qué texto de botón es mejor?', ['OK', 'Guardar cambios', 'Click aquí'], 1],
      [0, 'Formularios que se completan', "Pedí solo lo necesario: cada campo extra baja la conversión. Labels siempre visibles arriba del campo (el placeholder desaparece al escribir y no reemplaza al label).\n\nAgrupá campos relacionados, usá el teclado correcto en mobile (numérico para teléfonos) y validá al salir del campo, no mientras la persona escribe.", 'Labels visibles, pocos campos y validación al salir del campo.', '¿Por qué el placeholder no reemplaza al label?', ['Porque es gris', 'Porque desaparece al escribir', 'Porque ocupa espacio'], 1],
      [0, 'Mensajes de error útiles', "Un buen error dice qué pasó y cómo arreglarlo, al lado del campo: «El email no tiene @. Revisalo.» en lugar de «Error 422» o «Dato inválido».\n\nNo borres lo que la persona escribió y no culpes («Ingresaste mal…»): describí el problema.", 'Qué pasó + cómo se arregla, al lado del campo.', '¿Cuál es el mejor mensaje de error?', ['Error 422', 'Dato inválido', 'Falta la @ en el email. Revisalo.'], 2],
      [1, 'Todos los estados', "Cada pantalla tiene más estados que el ideal: vacío (sin datos todavía), cargando, error, parcial y lleno. Diseñá todos.\n\nUn estado vacío bien hecho explica qué va a aparecer ahí y cómo empezar: «Todavía no tenés proyectos. Creá el primero.»", 'Diseñá vacío, cargando, error, parcial y lleno.', '¿Qué debe hacer un buen estado vacío?', ['Mostrar nada', 'Explicar qué va a aparecer y cómo empezar', 'Mostrar un error'], 1],
      [1, 'Feedback inmediato', "Cada acción necesita una respuesta visible: un botón que cambia al presionarlo, un aviso «Guardado», un indicador mientras carga. Sin feedback, la gente vuelve a tocar y duplica acciones.\n\nPara esperas de más de un segundo, mostrá progreso; para más de diez, dejá que la persona siga haciendo otra cosa.", 'Toda acción responde; las esperas largas muestran progreso.', '¿Qué pasa si una acción no da feedback?', ['Nada', 'La gente repite la acción o se confunde', 'La app se acelera'], 1],
      [1, 'Pensar en mobile', "En pantallas táctiles, los objetivos tienen que ser grandes: alrededor de 44×44 pt (Apple) o 48×48 dp (Material). Las acciones frecuentes, al alcance del pulgar, en la parte de abajo.\n\nDiseñar primero para mobile obliga a priorizar: lo que no entra en una pantalla chica, muchas veces sobraba.", 'Objetivos táctiles de ~44–48 y acciones al alcance del pulgar.', '¿Qué tamaño mínimo recomiendan para un objetivo táctil?', ['20×20', 'Alrededor de 44–48 por lado', '100×100'], 1],
    ],
    exam: [
      ['Una pantalla con cinco botones primarios…', ['Es clara', 'Diluye cuál es la acción principal', 'Es lo recomendado'], 1],
      ['Validar un campo mientras la persona escribe la primera letra…', ['Ayuda siempre', 'Puede mostrar errores antes de tiempo', 'Es obligatorio'], 1],
      ['Para un teléfono en mobile conviene…', ['Teclado alfabético', 'Teclado numérico', 'Sin teclado'], 1],
      ['Un estado de carga de más de 1 segundo…', ['No necesita nada', 'Debería mostrar progreso', 'Debe ocultarse'], 1],
      ['Un mensaje de error no debería…', ['Explicar cómo arreglarlo', 'Borrar lo que la persona escribió', 'Estar cerca del campo'], 1],
      ['Las acciones frecuentes en mobile conviene ponerlas…', ['Arriba a la izquierda', 'Abajo, al alcance del pulgar', 'Ocultas en un menú'], 1],
      ['«Guardar cambios» frente a «Aceptar»…', ['Es igual', 'Dice mejor qué va a pasar', 'Es más largo y peor'], 1],
      ['El estado «vacío» es…', ['Un error', 'Cuando todavía no hay datos', 'Cuando carga'], 1],
    ],
  },
  {
    id: 'diseno-3', track: 'diseno', level: 3, topic: 'Producto y diseño', name: 'Diseño de interfaces · Avanzado',
    keywords: ['diseño', 'ui', 'ux', 'design system', 'tokens', 'accesibilidad', 'prototipos', 'tests de usabilidad', 'heurísticas'],
    blurb: 'Heurísticas, accesibilidad, sistemas de diseño, tokens, prototipos y tests de usabilidad.', pace: '6 paradas · 4 min',
    legs: ['Evaluar', 'Escalar'],
    steps: [
      [0, 'Heurísticas de Nielsen', "Jakob Nielsen propuso 10 principios para evaluar interfaces. Tres muy usados: visibilidad del estado del sistema (siempre saber qué está pasando), control y libertad (poder deshacer) y prevención de errores (mejor evitar el error que explicarlo).\n\nUna evaluación heurística revisa la interfaz contra esa lista y detecta problemas sin usuarios.", 'Estado visible, poder deshacer y prevenir errores.', '¿Qué propone la heurística de control y libertad?', ['Ocultar opciones', 'Poder deshacer y salir fácilmente', 'Pedir confirmación siempre'], 1],
      [0, 'Accesibilidad más allá del color', "Una interfaz accesible se puede usar con teclado (foco visible, orden lógico), con lector de pantalla (textos alternativos en imágenes, labels en campos, roles correctos) y con zoom al 200 %.\n\nProbalo vos: navegá tu pantalla solo con Tab y Enter. Si te perdés, alguien que depende del teclado también.", 'Probá tu interfaz solo con el teclado.', '¿Qué necesita una imagen informativa para lectores de pantalla?', ['Un borde', 'Texto alternativo', 'Animación'], 1],
      [0, 'Tests de usabilidad', "Mirar a 5 personas intentar tareas reales encuentra la mayoría de los problemas grandes (Nielsen). Pedí que piensen en voz alta y no ayudes: los silencios y las dudas son los datos.\n\nNo preguntes «¿Te gusta?»; observá si logran la tarea, cuánto tardan y dónde se traban.", 'Observá tareas reales; no preguntes si les gusta.', '¿Qué conviene hacer si la persona se traba en el test?', ['Ayudarla enseguida', 'Observar y anotar dónde se traba', 'Terminar el test'], 1],
      [1, 'Sistemas de diseño', "Un sistema de diseño reúne componentes reutilizables (botones, campos, tarjetas), sus reglas de uso y su código. Evita que cada pantalla reinvente lo mismo y mantiene la consistencia.\n\nNo empieza grande: arranca con los componentes que más se repiten y crece con el producto.", 'Componentes + reglas + código, que crecen con el producto.', '¿Qué evita un sistema de diseño?', ['La creatividad', 'Reinventar lo mismo en cada pantalla', 'Las pruebas'], 1],
      [1, 'Tokens de diseño', "Los tokens son las decisiones básicas con nombre: color.accento, espacio.md, radio.sm, fuente.titulo. Diseño y código usan los mismos nombres.\n\nAsí, cambiar el color de acento o agregar un modo oscuro se hace cambiando el valor de los tokens, no pantalla por pantalla.", 'Tokens = decisiones con nombre compartidas entre diseño y código.', '¿Qué facilita usar tokens?', ['Dibujar a mano', 'Cambiar estilos globales como el modo oscuro', 'Escribir textos'], 1],
      [1, 'Prototipos con propósito', "Un prototipo sirve para aprender algo antes de construir. La fidelidad depende de la pregunta: papel o wireframes para el flujo, alta fidelidad para probar detalles visuales o microinteracciones.\n\nDefiní antes qué querés aprender («¿encuentran el botón de exportar?») y cuándo vas a dar la respuesta por buena.", 'La fidelidad del prototipo depende de la pregunta.', '¿Qué conviene definir antes de prototipar?', ['La paleta final', 'Qué querés aprender', 'El framework'], 1],
    ],
    exam: [
      ['«Visibilidad del estado del sistema» significa…', ['Mostrar el código', 'Que la persona sepa qué está pasando', 'Usar colores vivos'], 1],
      ['Con unas 5 personas en un test de usabilidad…', ['No se aprende nada', 'Se encuentra la mayoría de los problemas grandes', 'Se valida todo'], 1],
      ['Durante un test conviene preguntar…', ['¿Te gusta?', '¿Qué esperabas que pasara acá?', '¿Lo comprarías?'], 1],
      ['El foco visible es clave para…', ['Personas que navegan con teclado', 'Mejorar el SEO', 'Las animaciones'], 0],
      ['Un token como color.accento…', ['Es un componente', 'Es una decisión de diseño con nombre', 'Es una imagen'], 1],
      ['Un sistema de diseño conviene empezarlo…', ['Con todos los componentes posibles', 'Con los componentes que más se repiten', 'Después de lanzar'], 1],
      ['Para probar un flujo nuevo alcanza con…', ['Alta fidelidad siempre', 'Un prototipo de baja fidelidad', 'El producto terminado'], 1],
      ['«Prevención de errores» prefiere…', ['Mensajes de error largos', 'Evitar que el error ocurra', 'Ocultar errores'], 1],
    ],
  },
]
