import type { Route } from '../routes'

// SQL en tres niveles. Un párrafo que empieza con ``` es un bloque de código.

export const SQL: Route[] = [
  {
    id: 'sql-1', track: 'sql', level: 1, topic: 'Datos', name: 'SQL · Fundamentos',
    keywords: ['sql', 'datos', 'select', 'where', 'order by', 'base de datos', 'consultas'],
    blurb: 'SELECT, WHERE, ORDER BY, LIMIT, NULL y funciones de agregación básicas.', pace: '6 paradas · 3 min',
    legs: ['Leer datos', 'Resumir'],
    steps: [
      [0, 'SELECT y FROM', "Una consulta SQL pide columnas de una tabla. SELECT dice qué columnas y FROM de qué tabla.\n\n```sql\nSELECT nombre, email\nFROM clientes;\n```\n\nSELECT * trae todas las columnas: es cómodo para explorar, pero en código conviene nombrarlas, así la consulta no cambia si la tabla suma columnas.", 'Nombrá las columnas en lugar de SELECT *.', '¿Qué indica FROM?', ['Las columnas', 'La tabla', 'El orden'], 1],
      [0, 'Filtrar con WHERE', "WHERE filtra filas según condiciones. Se combinan con AND, OR y NOT.\n\n```sql\nSELECT nombre, ciudad\nFROM clientes\nWHERE ciudad = 'Córdoba'\n  AND fecha_alta >= '2025-01-01';\n```\n\nIN compara contra una lista (ciudad IN ('Córdoba', 'Rosario')) y LIKE busca patrones (nombre LIKE 'Ana%').", 'WHERE filtra filas; IN y LIKE ahorran condiciones.', '¿Qué hace nombre LIKE "Ana%"?', ['Busca exactamente Ana%', 'Busca nombres que empiecen con Ana', 'Busca nombres que terminen en Ana'], 1],
      [0, 'Ordenar y limitar', "ORDER BY ordena el resultado (ASC ascendente por defecto, DESC descendente). LIMIT corta la cantidad de filas.\n\n```sql\nSELECT producto, precio\nFROM productos\nORDER BY precio DESC\nLIMIT 5;\n```\n\nSin ORDER BY, el orden de las filas no está garantizado, aunque parezca estable.", 'Sin ORDER BY no hay orden garantizado.', '¿Qué devuelve ORDER BY precio DESC LIMIT 5?', ['Los 5 más baratos', 'Los 5 más caros', '5 al azar'], 1],
      [1, 'NULL no es cero', "NULL significa \"sin dato\". No es 0 ni texto vacío, y no se compara con =.\n\n```sql\nSELECT nombre FROM clientes WHERE telefono IS NULL;\nSELECT COALESCE(telefono, 'sin teléfono') FROM clientes;\n```\n\ntelefono = NULL nunca da verdadero. COALESCE devuelve el primer valor que no sea NULL.", 'Para NULL se usa IS NULL, nunca = NULL.', '¿Cómo se buscan filas sin teléfono?', ['WHERE telefono = NULL', 'WHERE telefono IS NULL', "WHERE telefono = ''"], 1],
      [1, 'Agregaciones', "Las funciones de agregación resumen muchas filas en un valor: COUNT, SUM, AVG, MIN, MAX.\n\n```sql\nSELECT COUNT(*) AS pedidos,\n       SUM(total) AS facturado,\n       AVG(total) AS ticket_promedio\nFROM pedidos\nWHERE fecha >= '2026-01-01';\n```\n\nCOUNT(*) cuenta filas; COUNT(columna) cuenta solo las que no son NULL.", 'COUNT(columna) ignora los NULL; COUNT(*) no.', '¿Qué cuenta COUNT(telefono)?', ['Todas las filas', 'Las filas con teléfono no NULL', 'Los teléfonos distintos'], 1],
      [1, 'Alias y DISTINCT', "AS pone nombre a una columna o tabla en el resultado. DISTINCT elimina filas repetidas.\n\n```sql\nSELECT DISTINCT ciudad AS localidad\nFROM clientes\nORDER BY localidad;\n```\n\nCOUNT(DISTINCT ciudad) cuenta cuántas ciudades distintas hay.", 'DISTINCT saca repetidos; AS pone nombres claros.', '¿Qué cuenta COUNT(DISTINCT ciudad)?', ['Todas las filas', 'Las ciudades distintas', 'Las ciudades con NULL'], 1],
    ],
    exam: [
      ['¿Qué cláusula filtra filas antes de agrupar?', ['ORDER BY', 'WHERE', 'LIMIT'], 1],
      ["precio BETWEEN 10 AND 20 incluye…", ['10 y 20', 'Solo los de en medio', 'Solo 10'], 0],
      ['WHERE email = NULL devuelve…', ['Las filas sin email', 'Ninguna fila', 'Error siempre'], 1],
      ['COALESCE(a, b, 0) devuelve…', ['La suma', 'El primer valor no NULL', 'El mayor'], 1],
      ['AVG(total) sobre valores con NULL…', ['Cuenta los NULL como 0', 'Ignora los NULL', 'Da error'], 1],
      ['SELECT DISTINCT pais FROM clientes…', ['Lista cada país una vez', 'Cuenta países', 'Ordena países'], 0],
      ['ciudad IN ("A", "B") equivale a…', ['ciudad = "A" AND ciudad = "B"', 'ciudad = "A" OR ciudad = "B"', 'ciudad LIKE "AB"'], 1],
      ['LIMIT 10 sin ORDER BY trae…', ['Las 10 primeras por fecha', '10 filas sin orden garantizado', 'Las 10 más grandes'], 1],
    ],
  },
  {
    id: 'sql-2', track: 'sql', level: 2, topic: 'Datos', name: 'SQL · Intermedio',
    keywords: ['sql', 'datos', 'join', 'group by', 'having', 'subconsultas', 'case'],
    blurb: 'JOINs, GROUP BY y HAVING, subconsultas, CASE y fechas.', pace: '6 paradas · 3 min',
    legs: ['Combinar tablas', 'Agrupar'],
    steps: [
      [0, 'INNER JOIN', "Un JOIN combina filas de dos tablas a partir de una columna en común. INNER JOIN deja solo las filas que tienen pareja en las dos.\n\n```sql\nSELECT p.id, c.nombre, p.total\nFROM pedidos p\nJOIN clientes c ON c.id = p.cliente_id;\n```\n\nLos alias (p, c) acortan la consulta y evitan ambigüedad.", 'INNER JOIN deja solo lo que coincide en las dos tablas.', '¿Qué pasa con un cliente sin pedidos en un INNER JOIN?', ['Aparece con NULL', 'No aparece', 'Aparece dos veces'], 1],
      [0, 'LEFT JOIN', "LEFT JOIN conserva todas las filas de la tabla de la izquierda, aunque no tengan pareja; las columnas de la derecha quedan en NULL.\n\n```sql\nSELECT c.nombre, COUNT(p.id) AS pedidos\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.nombre;\n```\n\nEs la forma de encontrar \"los que no tienen\": WHERE p.id IS NULL.", 'LEFT JOIN + IS NULL encuentra lo que no tiene pareja.', '¿Cómo listás clientes sin pedidos?', ['INNER JOIN', 'LEFT JOIN y WHERE p.id IS NULL', 'DISTINCT'], 1],
      [0, 'Subconsultas', "Una subconsulta es una consulta dentro de otra. Sirve para comparar contra un resultado calculado.\n\n```sql\nSELECT nombre, precio\nFROM productos\nWHERE precio > (SELECT AVG(precio) FROM productos);\n```\n\nEXISTS comprueba si hay al menos una fila: WHERE EXISTS (SELECT 1 FROM pedidos WHERE ...).", 'Subconsulta para comparar contra un valor calculado.', '¿Qué lista la consulta de ejemplo?', ['Todos los productos', 'Los productos más caros que el promedio', 'El precio promedio'], 1],
      [1, 'GROUP BY', "GROUP BY junta filas por una o más columnas para calcular agregaciones por grupo.\n\n```sql\nSELECT ciudad, COUNT(*) AS clientes\nFROM clientes\nGROUP BY ciudad\nORDER BY clientes DESC;\n```\n\nRegla: cada columna del SELECT que no está en una agregación tiene que estar en el GROUP BY.", 'Lo que no se agrega, va en el GROUP BY.', '¿Qué columnas deben ir en GROUP BY?', ['Todas', 'Las del SELECT que no están agregadas', 'Ninguna'], 1],
      [1, 'HAVING', "WHERE filtra filas antes de agrupar; HAVING filtra grupos después de agrupar, usando agregaciones.\n\n```sql\nSELECT cliente_id, SUM(total) AS gastado\nFROM pedidos\nWHERE fecha >= '2026-01-01'\nGROUP BY cliente_id\nHAVING SUM(total) > 100000;\n```", 'WHERE filtra filas; HAVING filtra grupos.', '¿Dónde va una condición sobre SUM(total)?', ['WHERE', 'HAVING', 'ORDER BY'], 1],
      [1, 'CASE', "CASE devuelve valores según condiciones, como un if dentro de la consulta.\n\n```sql\nSELECT nombre,\n  CASE\n    WHEN total >= 100000 THEN 'alto'\n    WHEN total >= 20000 THEN 'medio'\n    ELSE 'bajo'\n  END AS segmento\nFROM pedidos;\n```\n\nCombinado con SUM, cuenta por categoría: SUM(CASE WHEN estado = 'pagado' THEN 1 ELSE 0 END).", 'CASE para clasificar; SUM(CASE…) para contar por categoría.', '¿Qué devuelve CASE si ninguna condición se cumple y no hay ELSE?', ['0', 'NULL', 'Error'], 1],
    ],
    exam: [
      ['LEFT JOIN devuelve…', ['Solo coincidencias', 'Todas las filas de la izquierda', 'Todas las filas de la derecha'], 1],
      ['Un JOIN sin condición ON correcta puede…', ['Multiplicar filas', 'Borrar datos', 'Ordenar'], 0],
      ['HAVING COUNT(*) > 5 filtra…', ['Filas', 'Grupos', 'Columnas'], 1],
      ['SELECT ciudad, nombre, COUNT(*) … GROUP BY ciudad …', ['Es correcto', 'Falla o es ambiguo: nombre no está agrupado ni agregado', 'Ordena'], 1],
      ['EXISTS (subconsulta) devuelve verdadero si…', ['La subconsulta tiene al menos una fila', 'La subconsulta da 1', 'Siempre'], 0],
      ['Para contar pedidos pagados por cliente conviene…', ['SUM(CASE WHEN estado = "pagado" THEN 1 ELSE 0 END)', 'COUNT(estado)', 'MAX(estado)'], 0],
      ['WHERE se evalúa…', ['Después de GROUP BY', 'Antes de GROUP BY', 'Después de ORDER BY'], 1],
      ['Un cliente sin pedidos en un LEFT JOIN tiene p.id…', ['0', 'NULL', 'El id del cliente'], 1],
    ],
  },
  {
    id: 'sql-3', track: 'sql', level: 3, topic: 'Datos', name: 'SQL · Avanzado',
    keywords: ['sql', 'datos', 'window functions', 'cte', 'índices', 'transacciones', 'explain', 'rendimiento'],
    blurb: 'CTEs, funciones de ventana, índices, EXPLAIN, transacciones y modelado.', pace: '6 paradas · 4 min',
    legs: ['Análisis', 'Rendimiento y datos'],
    steps: [
      [0, 'CTEs con WITH', "Una CTE (WITH) le pone nombre a una subconsulta para usarla como tabla. Hace legibles las consultas largas.\n\n```sql\nWITH ventas_mes AS (\n  SELECT cliente_id, SUM(total) AS total\n  FROM pedidos\n  WHERE fecha >= '2026-10-01'\n  GROUP BY cliente_id\n)\nSELECT c.nombre, v.total\nFROM ventas_mes v JOIN clientes c ON c.id = v.cliente_id\nORDER BY v.total DESC;\n```", 'WITH para dividir una consulta larga en pasos con nombre.', '¿Para qué sirve una CTE?', ['Para crear una tabla permanente', 'Para nombrar una subconsulta y hacer legible la consulta', 'Para crear índices'], 1],
      [0, 'Funciones de ventana', "Una función de ventana calcula sobre un grupo de filas sin colapsarlas, como hace GROUP BY.\n\n```sql\nSELECT cliente_id, fecha, total,\n  SUM(total) OVER (PARTITION BY cliente_id ORDER BY fecha) AS acumulado,\n  ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY fecha DESC) AS n\nFROM pedidos;\n```\n\nCon n = 1 te quedás con el último pedido de cada cliente.", 'OVER (PARTITION BY …) calcula por grupo sin perder filas.', '¿Qué diferencia hay entre SUM() OVER y GROUP BY?', ['Ninguna', 'OVER conserva cada fila; GROUP BY las colapsa', 'GROUP BY es más moderno'], 1],
      [0, 'LAG y comparaciones', "LAG y LEAD traen el valor de la fila anterior o siguiente dentro de la ventana. Sirven para variaciones entre períodos.\n\n```sql\nSELECT mes, ventas,\n  ventas - LAG(ventas) OVER (ORDER BY mes) AS variacion\nFROM ventas_mensuales;\n```\n\nLa primera fila no tiene anterior: LAG devuelve NULL.", 'LAG para comparar contra el período anterior.', '¿Qué devuelve LAG en la primera fila?', ['0', 'NULL', 'El mismo valor'], 1],
      [1, 'Índices y EXPLAIN', "Un índice es una estructura que permite encontrar filas sin recorrer toda la tabla, como el índice de un libro.\n\n```sql\nCREATE INDEX idx_pedidos_cliente ON pedidos (cliente_id, fecha);\nEXPLAIN ANALYZE SELECT * FROM pedidos WHERE cliente_id = 42;\n```\n\nEXPLAIN muestra el plan: si dice Seq Scan sobre una tabla grande, falta un índice útil. Los índices aceleran lecturas pero hacen más lentas las escrituras.", 'Índices para las columnas que filtrás; EXPLAIN para verificar.', '¿Qué costo tiene un índice?', ['Ninguno', 'Escrituras más lentas y más espacio', 'Lecturas más lentas'], 1],
      [1, 'Transacciones', "Una transacción agrupa varias operaciones que tienen que ocurrir todas o ninguna.\n\n```sql\nBEGIN;\nUPDATE cuentas SET saldo = saldo - 1000 WHERE id = 1;\nUPDATE cuentas SET saldo = saldo + 1000 WHERE id = 2;\nCOMMIT;  -- o ROLLBACK si algo falló\n```\n\nEso es la A de ACID: atomicidad. Sin transacción, un corte a mitad de camino deja datos inconsistentes.", 'Todo o nada: BEGIN, COMMIT o ROLLBACK.', '¿Qué hace ROLLBACK?', ['Guarda los cambios', 'Deshace los cambios de la transacción', 'Crea un respaldo'], 1],
      [1, 'Modelar: normalizar', "Normalizar es no repetir datos: el nombre del cliente vive en clientes, y los pedidos solo guardan cliente_id. Así, si cambia el nombre, se cambia en un lugar.\n\nLas claves primarias identifican cada fila y las foráneas aseguran que un pedido apunte a un cliente que existe. Para reportes pesados a veces se desnormaliza a propósito, en tablas aparte.", 'Cada dato en un solo lugar; las claves foráneas cuidan la coherencia.', '¿Qué asegura una clave foránea?', ['Que la columna sea única', 'Que el valor exista en la tabla referenciada', 'Que sea un número'], 1],
    ],
    exam: [
      ['ROW_NUMBER() OVER (PARTITION BY c ORDER BY f DESC) = 1 sirve para…', ['Contar filas', 'Quedarse con la fila más reciente por grupo', 'Borrar duplicados'], 1],
      ['Una CTE definida con WITH…', ['Persiste en la base', 'Existe solo durante esa consulta', 'Es un índice'], 1],
      ['SUM(x) OVER (ORDER BY fecha) calcula…', ['El total general en cada fila', 'Un acumulado', 'El promedio'], 1],
      ['EXPLAIN muestra…', ['Los datos', 'El plan de ejecución', 'Los permisos'], 1],
      ['Un índice en (cliente_id, fecha) ayuda más a…', ['WHERE fecha = ...', 'WHERE cliente_id = ... AND fecha > ...', 'ORDER BY nombre'], 1],
      ['La A de ACID es…', ['Atomicidad', 'Agilidad', 'Auditoría'], 0],
      ['Repetir el nombre del cliente en cada pedido…', ['Es normalizar', 'Es desnormalizar y arriesga inconsistencias', 'Es obligatorio'], 1],
      ['LEAD(ventas) OVER (ORDER BY mes) trae…', ['El mes anterior', 'El mes siguiente', 'El total'], 1],
    ],
  },
]
