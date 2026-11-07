import type { Route } from '../routes'

// Finanzas personales en tres niveles. Educación general: conceptos, no recomendaciones personalizadas.

export const FINANZAS: Route[] = [
  {
    id: 'finanzas-1', track: 'finanzas', level: 1, topic: 'Finanzas personales', name: 'Finanzas personales · Fundamentos',
    keywords: ['finanzas', 'presupuesto', 'ahorro', 'fondo de emergencia', 'deudas', 'gastos', 'plata'],
    blurb: 'Presupuesto, gastos fijos y variables, ahorro primero, fondo de emergencia y deudas.', pace: '6 paradas · 3 min',
    legs: ['Ordenar', 'Proteger'],
    steps: [
      [0, 'Saber a dónde va la plata', "El primer paso no es ahorrar: es mirar. Anotá un mes de gastos, aunque sea de forma aproximada, y separalos en fijos (alquiler, servicios), variables (supermercado, salidas) y hormiga (cafés, apps, envíos).\n\nLos gastos hormiga suelen sorprender: chicos de a uno, grandes sumados.", 'No se puede ordenar lo que no se mira.', '¿Qué conviene hacer primero?', ['Invertir', 'Registrar un mes de gastos', 'Pedir un préstamo'], 1],
      [0, 'Un presupuesto simple', "Una guía conocida es la regla 50/30/20: 50 % para necesidades, 30 % para gustos y 20 % para ahorro o deudas. No es una ley: es un punto de partida para ajustar según tus ingresos y tu realidad.\n\nLo importante es que el ahorro tenga un lugar asignado, no que salga \"si sobra\".", 'El ahorro tiene que tener un lugar fijo en el presupuesto.', 'En la regla 50/30/20, ¿qué parte es para ahorro o deudas?', ['50 %', '30 %', '20 %'], 2],
      [0, 'Pagarte primero', "En lugar de ahorrar lo que sobra a fin de mes, separá el ahorro apenas cobrás. Automatizarlo (una transferencia programada) saca la decisión de la fuerza de voluntad.\n\nLo que no ves en la cuenta de todos los días, cuesta menos no gastarlo.", 'Ahorrá al cobrar, no a fin de mes.', '¿Qué significa «pagarte primero»?', ['Darte un gusto al cobrar', 'Separar el ahorro apenas cobrás', 'Pagar deudas primero siempre'], 1],
      [1, 'Fondo de emergencia', "Es plata reservada para imprevistos: una enfermedad, una reparación, quedarte sin trabajo. Una referencia habitual es cubrir de 3 a 6 meses de gastos esenciales.\n\nTiene que estar disponible rápido y sin riesgo de perder valor de golpe, aunque rinda poco: su trabajo es protegerte, no hacerte ganar.", 'El fondo de emergencia prioriza disponibilidad, no rendimiento.', '¿Qué prioriza un fondo de emergencia?', ['Rendimiento alto', 'Disponibilidad rápida y bajo riesgo', 'Largo plazo'], 1],
      [1, 'Deudas: cuál primero', "Dos métodos conocidos: avalancha (pagar primero la de mayor tasa, que ahorra más intereses) y bola de nieve (pagar primero la más chica, que da motivación al cerrar deudas rápido).\n\nEn ambos, pagás el mínimo de todas y lo extra va a una sola. La deuda de tarjeta en cuotas con interés o en pago mínimo suele ser la más cara.", 'Mínimo en todas y lo extra a una: avalancha o bola de nieve.', '¿Qué deuda ataca primero el método avalancha?', ['La más chica', 'La de mayor tasa de interés', 'La más vieja'], 1],
      [1, 'La tasa que importa', "Cuando comparás préstamos o cuotas, no mires solo la cuota: mirá el costo total. En Argentina, el CFT (costo financiero total) incluye intereses, impuestos y gastos, y es el número para comparar.\n\nUna cuota baja en muchos meses puede salir mucho más cara que una alta en pocos.", 'Compará por CFT, no por cuota.', '¿Qué conviene comparar entre dos préstamos?', ['Solo la cuota', 'El costo financiero total', 'El color de la tarjeta'], 1],
    ],
    exam: [
      ['Un gasto hormiga es…', ['El alquiler', 'Un gasto chico y frecuente', 'Una deuda grande'], 1],
      ['La regla 50/30/20 es…', ['Una ley', 'Una guía para ajustar', 'Un tipo de inversión'], 1],
      ['Automatizar el ahorro sirve para…', ['Ganar más interés', 'No depender de la fuerza de voluntad', 'Pagar menos impuestos'], 1],
      ['Una referencia habitual para el fondo de emergencia es…', ['1 semana de gastos', '3 a 6 meses de gastos esenciales', '5 años de sueldo'], 1],
      ['El método bola de nieve paga primero…', ['La deuda más chica', 'La de mayor tasa', 'La más reciente'], 0],
      ['Pagar solo el mínimo de la tarjeta…', ['No tiene costo', 'Suele generar intereses altos', 'Cancela la deuda'], 1],
      ['El CFT incluye…', ['Solo la tasa nominal', 'Intereses, impuestos y gastos', 'Solo la cuota'], 1],
      ['El fondo de emergencia conviene que esté…', ['En algo de alto riesgo', 'Disponible rápido', 'Bloqueado por años'], 1],
    ],
  },
  {
    id: 'finanzas-2', track: 'finanzas', level: 2, topic: 'Finanzas personales', name: 'Finanzas personales · Intermedio',
    keywords: ['finanzas', 'inflación', 'interés compuesto', 'riesgo', 'diversificación', 'plazo fijo', 'objetivos'],
    blurb: 'Inflación, interés compuesto, riesgo y rendimiento, diversificación y objetivos.', pace: '6 paradas · 3 min',
    legs: ['Conceptos', 'Planificar'],
    steps: [
      [0, 'Inflación y rendimiento real', "Si tu ahorro rinde 30 % en un año y la inflación fue 40 %, perdiste poder de compra aunque tengas más pesos. Lo que importa es el rendimiento real: rendimiento menos inflación (aproximadamente).\n\nPor eso, en contextos inflacionarios, dejar plata quieta en pesos suele significar perder.", 'Rendimiento real ≈ rendimiento − inflación.', 'Rendís 30 % con inflación de 40 %. ¿Qué pasó?', ['Ganaste poder de compra', 'Perdiste poder de compra', 'Quedaste igual'], 1],
      [0, 'Interés compuesto', "El interés compuesto es ganar intereses sobre intereses. Con tiempo, la diferencia es enorme: 100 al 10 % anual da 110 al año 1, 121 al año 2 y unos 259 al año 10.\n\nEl factor más poderoso no es la tasa ni el monto: es el tiempo. Empezar antes, aunque sea con poco, pesa mucho.", 'El tiempo es el ingrediente más poderoso del interés compuesto.', '¿Qué hace más poderoso al interés compuesto?', ['Un monto inicial grande', 'El tiempo', 'Retirar los intereses'], 1],
      [0, 'Riesgo y rendimiento', "En general, a más rendimiento esperado, más riesgo: más posibilidad de que el valor baje, al menos por un tiempo. Una inversión que promete mucho rendimiento \"sin riesgo\" es una señal de alarma.\n\nEl riesgo que podés tomar depende de tu plazo: plata que vas a necesitar pronto no debería estar en algo que puede caer fuerte.", 'Mucho rendimiento «sin riesgo» es señal de alarma.', '¿Qué es una señal de alarma?', ['Una inversión con riesgo explicado', 'Una promesa de rendimiento alto sin riesgo', 'Un plazo largo'], 1],
      [1, 'Diversificar', "Diversificar es no poner todos los huevos en la misma canasta: repartir entre distintos activos, monedas o sectores para que un problema en uno no te afecte todo.\n\nNo elimina el riesgo, pero reduce el impacto de que una sola cosa salga mal. Los fondos comunes de inversión diversifican por diseño.", 'Diversificar reduce el impacto de que una sola cosa salga mal.', '¿Qué logra diversificar?', ['Eliminar todo riesgo', 'Reducir el impacto de que algo salga mal', 'Garantizar ganancias'], 1],
      [1, 'Objetivos con plazo', "Separá tu ahorro por objetivo y plazo: corto (menos de un año: vacaciones), mediano (1 a 5 años: un auto) y largo (más de 5: retiro). Cada plazo admite distinto nivel de riesgo.\n\nPonerle nombre y fecha a un objetivo lo vuelve concreto y más fácil de sostener.", 'Cada objetivo con su plazo y su nivel de riesgo.', '¿Qué conviene para un objetivo de 6 meses?', ['Algo de alto riesgo', 'Algo de bajo riesgo y disponible', 'Algo bloqueado por años'], 1],
      [1, 'Costos que se comen el rendimiento', "Comisiones, spreads (diferencia entre precio de compra y venta) e impuestos reducen lo que ganás. Un 2 % anual de comisión parece poco, pero en 20 años se lleva una parte grande del resultado por el mismo efecto del interés compuesto.\n\nAntes de invertir, preguntá siempre: ¿cuánto me cuesta entrar, mantener y salir?", 'Preguntá cuánto cuesta entrar, mantener y salir.', '¿Qué es el spread?', ['Un impuesto', 'La diferencia entre precio de compra y de venta', 'Una ganancia garantizada'], 1],
    ],
    exam: [
      ['Rendimiento real es…', ['El rendimiento nominal', 'El rendimiento descontando la inflación', 'La tasa del banco'], 1],
      ['100 al 10 % compuesto durante 2 años da…', ['120', '121', '110'], 1],
      ['Para plata que vas a usar pronto conviene…', ['Mucho riesgo', 'Poco riesgo y disponibilidad', 'No tenerla'], 1],
      ['Diversificar…', ['Elimina el riesgo', 'Reduce el impacto de un problema puntual', 'Duplica la ganancia'], 1],
      ['Una comisión anual chica en el largo plazo…', ['No importa', 'Puede llevarse una parte grande del resultado', 'Se compensa sola'], 1],
      ['Un objetivo de retiro en 25 años es de plazo…', ['Corto', 'Mediano', 'Largo'], 2],
      ['Empezar a ahorrar antes, con poco, frente a más tarde con más…', ['Siempre da lo mismo', 'Puede rendir más por el tiempo', 'Siempre es peor'], 1],
      ['Ponerle nombre y fecha a un objetivo…', ['No cambia nada', 'Lo vuelve concreto y más fácil de sostener', 'Lo hace más riesgoso'], 1],
    ],
  },
  {
    id: 'finanzas-3', track: 'finanzas', level: 3, topic: 'Finanzas personales', name: 'Finanzas personales · Avanzado',
    keywords: ['finanzas', 'fondos indexados', 'perfil de riesgo', 'rebalanceo', 'sesgos', 'estafas', 'retiro'],
    blurb: 'Perfil de riesgo, fondos e índices, rebalanceo, sesgos al invertir y cómo detectar estafas.', pace: '6 paradas · 4 min',
    legs: ['Invertir con criterio', 'Cuidarte'],
    steps: [
      [0, 'Tu perfil de riesgo', "El perfil de riesgo combina cuánto riesgo podés asumir (tu plazo, tus ingresos, tu fondo de emergencia) y cuánto tolerás emocionalmente (si una caída del 20 % te hace vender todo).\n\nLas entidades suelen pedir un test de perfil antes de invertir. Respondelo con honestidad: invertir por encima de tu tolerancia lleva a malas decisiones en las caídas.", 'Capacidad y tolerancia: las dos cuentan.', '¿Qué combina el perfil de riesgo?', ['Solo tus ingresos', 'Capacidad y tolerancia al riesgo', 'Solo tu edad'], 1],
      [0, 'Fondos e índices', "Un índice reúne muchas empresas (por ejemplo, el S&P 500 sigue a 500 grandes empresas de EE. UU.). Los fondos indexados y los ETF replican un índice con comisiones bajas.\n\nLa investigación muestra que la mayoría de los fondos que intentan ganarle al mercado no lo logran en el largo plazo, sobre todo después de comisiones.", 'Fondos indexados: diversificación amplia y comisiones bajas.', '¿Qué hace un fondo indexado?', ['Elige pocas acciones ganadoras', 'Replica un índice', 'Garantiza rendimiento'], 1],
      [0, 'Rebalancear', "Si decidiste tener 60 % en un tipo de activo y 40 % en otro, con el tiempo esa proporción se mueve. Rebalancear es volver a la proporción elegida, por ejemplo una vez al año.\n\nObliga a vender parte de lo que subió y comprar lo que bajó: lo contrario de lo que el impulso sugiere, y por eso funciona como disciplina.", 'Rebalancear es volver a tu proporción elegida, con calendario.', '¿Qué implica rebalancear?', ['Comprar más de lo que subió', 'Volver a la proporción elegida', 'Vender todo'], 1],
      [1, 'Sesgos al invertir', "Aversión a la pérdida: perder duele más que ganar alegra, y eso lleva a vender en pánico. Efecto manada: comprar porque todos compran. Exceso de confianza: creer que podés anticipar el mercado.\n\nUna regla escrita (cuánto invertís, cada cuánto, cuándo rebalanceás) protege de decidir en caliente.", 'Una regla escrita te protege de decidir en caliente.', '¿Qué es la aversión a la pérdida?', ['Evitar invertir siempre', 'Que perder duele más de lo que ganar alegra', 'Perder a propósito'], 1],
      [1, 'Detectar estafas', "Señales típicas: rendimientos garantizados y altos, urgencia («solo hoy»), pedido de secretos, ganancias por sumar gente (esquema Ponzi o piramidal) y entidades no registradas.\n\nAntes de poner plata, verificá que la entidad esté registrada ante el regulador (en Argentina, la CNV para inversiones). Si suena demasiado bueno para ser cierto, probablemente lo sea.", 'Garantía + urgencia + sumar gente = alarma. Verificá el registro.', '¿Qué es una señal típica de estafa?', ['Riesgos explicados', 'Rendimiento alto garantizado y urgencia', 'Entidad registrada'], 1],
      [1, 'Pedir asesoramiento', "Estos contenidos son educación general, no una recomendación para tu caso. Para decisiones importantes, consultá a un asesor matriculado e independiente, y preguntá cómo cobra: si cobra comisión por lo que te vende, puede tener un conflicto de interés.\n\nUn buen asesor explica riesgos y costos sin apurarte.", 'Asesor matriculado, independiente y que explique cómo cobra.', '¿Qué conviene preguntarle a un asesor?', ['Si garantiza ganancias', 'Cómo cobra y si tiene conflictos de interés', 'Nada'], 1],
    ],
    exam: [
      ['Si una caída del 20 % te haría vender todo, tu tolerancia al riesgo es…', ['Alta', 'Baja', 'Irrelevante'], 1],
      ['Un ETF indexado suele tener…', ['Comisiones altas', 'Comisiones bajas y diversificación', 'Rendimiento garantizado'], 1],
      ['Rebalancear una vez al año obliga a…', ['Comprar lo que más subió', 'Vender algo de lo que subió y comprar lo que bajó', 'No hacer nada'], 1],
      ['Comprar porque «todos están comprando» es…', ['Diversificar', 'Efecto manada', 'Rebalancear'], 1],
      ['Un esquema que paga ganancias por sumar gente es…', ['Un fondo indexado', 'Un esquema piramidal o Ponzi', 'Un plazo fijo'], 1],
      ['Antes de invertir con una entidad conviene…', ['Confiar en las redes', 'Verificar su registro ante el regulador', 'Pagar rápido'], 1],
      ['Un asesor que cobra comisión por lo que vende…', ['Nunca tiene conflictos', 'Puede tener conflicto de interés', 'Es siempre ilegal'], 1],
      ['Una regla de inversión escrita sirve para…', ['Ganar seguro', 'No decidir en caliente', 'Evitar impuestos'], 1],
    ],
  },
]
