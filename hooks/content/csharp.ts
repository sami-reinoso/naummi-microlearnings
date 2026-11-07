import type { Route } from '../routes'

// C# y .NET en tres niveles. Un párrafo que empieza con ``` es un bloque de código.

export const CSHARP: Route[] = [
  {
    id: 'csharp-1', track: 'csharp', level: 1, topic: 'Tecnología', name: 'C# y .NET · Fundamentos',
    keywords: ['c#', 'csharp', '.net', 'dotnet', 'tipos', 'clases', 'record', 'nullable', 'colecciones'],
    blurb: 'Tipos, nulos, clases, records, colecciones y excepciones.', pace: '6 paradas · 3 min',
    legs: ['Tipos', 'Objetos'],
    steps: [
      [0, 'Valor y referencia', "En C# hay tipos por valor (int, double, bool, struct) y por referencia (class, string, arrays). Al asignar un tipo por valor se copia el dato; al asignar uno por referencia se copia la referencia y las dos variables apuntan al mismo objeto.\n\n```csharp\nint a = 1; int b = a; b = 2;          // a sigue en 1\nvar l1 = new List<int>(); var l2 = l1;\nl2.Add(5);                             // l1 también tiene el 5\n```\n\nstring es por referencia pero inmutable: cada cambio crea otro string.", 'struct se copia; class se comparte.', 'Si l2 = l1 (dos List) y agregás a l2, ¿qué pasa con l1?', ['No cambia', 'También cambia: es el mismo objeto', 'Se borra'], 1],
      [0, 'var y el tipado estático', "var no significa \"sin tipo\": el compilador deduce el tipo a partir del valor y queda fijo.\n\n```csharp\nvar total = 10;      // int\ntotal = \"diez\";      // error de compilación\n```\n\nUsalo cuando el tipo se lee obvio a la derecha (var lista = new List<string>()). Si no queda claro, escribí el tipo.", 'var deduce el tipo en compilación; no lo vuelve dinámico.', '¿Qué tipo tiene var x = 3.5;?', ['object', 'double', 'dynamic'], 1],
      [0, 'Nulos sin sustos', "int? permite que un int sea null. Con los tipos de referencia anulables activados (<Nullable>enable</Nullable>), string? indica que puede venir null y string que no.\n\n```csharp\nstring? nombre = BuscarNombre();\nint largo = nombre?.Length ?? 0;\n```\n\n?. corta si es null; ?? da un valor por defecto. El compilador te avisa cuando usás algo que podría ser null.", '?. para navegar seguro, ?? para el valor por defecto.', '¿Qué devuelve nombre?.Length ?? 0 si nombre es null?', ['Lanza NullReferenceException', '0', 'null'], 1],
      [1, 'Clases y records', "Una clase agrupa datos y comportamiento. Las propiedades exponen datos con get y set.\n\n```csharp\npublic class Cuenta {\n  public string Titular { get; }\n  public decimal Saldo { get; private set; }\n  public Cuenta(string titular) => Titular = titular;\n  public void Depositar(decimal m) => Saldo += m;\n}\n\npublic record Punto(int X, int Y);\n```\n\nUn record es ideal para datos: es inmutable y se compara por valor. new Punto(1,2) == new Punto(1,2) da true.", 'record para datos inmutables comparados por valor.', '¿Qué da new Punto(1,2) == new Punto(1,2) si Punto es record?', ['false', 'true', 'No compila'], 1],
      [1, 'Colecciones', "List<T> es una lista que crece. Dictionary<TKey,TValue> busca por clave en tiempo casi constante. HashSet<T> guarda valores sin repetir.\n\n```csharp\nvar edades = new Dictionary<string, int> { [\"Ana\"] = 30 };\nif (edades.TryGetValue(\"Ana\", out var edad)) Console.WriteLine(edad);\n```\n\nTryGetValue evita la excepción que lanza edades[\"Luis\"] si la clave no existe.", 'Dictionary + TryGetValue para buscar sin excepciones.', '¿Qué pasa con edades["Luis"] si la clave no existe?', ['Devuelve 0', 'Lanza KeyNotFoundException', 'Devuelve null'], 1],
      [1, 'Excepciones y using', "try/catch atrapa errores; finally corre siempre. Atrapá solo lo que sabés manejar.\n\nLos objetos que usan recursos externos (archivos, conexiones) implementan IDisposable. using los libera al terminar, aunque haya una excepción.\n\n```csharp\nusing var archivo = File.OpenRead(ruta);\n// al salir del bloque se cierra solo\n```", 'using libera recursos aunque falle algo.', '¿Para qué sirve using con un IDisposable?', ['Para importar namespaces únicamente', 'Para liberar el recurso al terminar', 'Para hacerlo asíncrono'], 1],
    ],
    exam: [
      ['¿Cuál es un tipo por valor?', ['string', 'struct', 'class'], 1],
      ['var s = "hola"; s = 5; …', ['Funciona', 'No compila', 'Convierte 5 a string'], 1],
      ['¿Qué indica string? con nullable activado?', ['Que es opcional en JSON', 'Que puede ser null', 'Que es un char'], 1],
      ['x ?? y devuelve…', ['y si x es null; si no, x', 'Siempre y', 'x si y es null'], 0],
      ['Dos records con los mismos valores…', ['Son distintos', 'Son iguales con ==', 'No se pueden comparar'], 1],
      ['Para guardar valores sin repetir, lo más directo es…', ['List<T>', 'HashSet<T>', 'Array'], 1],
      ['El bloque finally…', ['Corre solo si hubo error', 'Corre siempre', 'Reemplaza a catch'], 1],
      ['¿Qué propiedad solo se puede asignar dentro de la clase?', ['{ get; set; }', '{ get; private set; }', '{ set; }'], 1],
    ],
  },
  {
    id: 'csharp-2', track: 'csharp', level: 2, topic: 'Tecnología', name: 'C# y .NET · Intermedio',
    keywords: ['c#', 'csharp', '.net', 'linq', 'async', 'await', 'genericos', 'interfaces', 'lambdas'],
    blurb: 'Interfaces, genéricos, LINQ, lambdas, async/await y pattern matching.', pace: '6 paradas · 3 min',
    legs: ['Abstracción', 'Lenguaje moderno'],
    steps: [
      [0, 'Interfaces', "Una interfaz define un contrato: qué se puede hacer, no cómo. Distintas clases la implementan y el código que las usa depende del contrato.\n\n```csharp\npublic interface INotificador { Task Enviar(string msg); }\npublic class Email : INotificador { public Task Enviar(string m) => ...; }\npublic class Sms : INotificador { public Task Enviar(string m) => ...; }\n```\n\nAsí se puede cambiar Email por Sms sin tocar a quien notifica, y probar con un notificador falso.", 'Depender de interfaces facilita cambiar y probar.', '¿Qué define una interfaz?', ['La implementación', 'Un contrato de miembros', 'Un objeto concreto'], 1],
      [0, 'Genéricos', "Los genéricos permiten escribir código para cualquier tipo sin perder el tipado. List<T> es el ejemplo clásico.\n\n```csharp\npublic T Primero<T>(IEnumerable<T> items) where T : class\n  => items.First();\n```\n\nwhere restringe qué tipos se aceptan: class (referencia), struct (valor), new() (constructor vacío) o una interfaz.", 'Genéricos = reutilizar sin perder tipos; where restringe.', '¿Qué hace where T : IComparable?', ['Nada', 'Exige que T implemente IComparable', 'Convierte T a IComparable'], 1],
      [0, 'LINQ', "LINQ consulta colecciones con métodos encadenados.\n\n```csharp\nvar nombres = clientes\n  .Where(c => c.Activo)\n  .OrderBy(c => c.Nombre)\n  .Select(c => c.Nombre)\n  .ToList();\n```\n\nOjo: la consulta se ejecuta recién cuando se recorre (ejecución diferida). ToList() o ToArray() la ejecutan en ese momento y guardan el resultado.", 'LINQ es diferido hasta que lo recorrés o hacés ToList().', '¿Cuándo se ejecuta un Where sin ToList?', ['Al declararlo', 'Al recorrer el resultado', 'Nunca'], 1],
      [1, 'Lambdas y delegados', "Una lambda es una función corta: x => x * 2. Func<T,TResult> representa una función que devuelve algo; Action<T>, una que no devuelve nada.\n\n```csharp\nFunc<int, int> doble = x => x * 2;\nAction<string> log = m => Console.WriteLine(m);\n```\n\nLINQ, los eventos y muchas APIs de .NET reciben lambdas.", 'Func devuelve un valor; Action no.', '¿Qué representa Action<string>?', ['Una función que devuelve string', 'Una función que recibe un string y no devuelve nada', 'Un evento'], 1],
      [1, 'async y await', "async/await permite esperar operaciones lentas (red, disco) sin bloquear el hilo. Un método async devuelve Task o Task<T>.\n\n```csharp\npublic async Task<Usuario> CargarAsync(int id) {\n  var json = await http.GetStringAsync($\"/usuarios/{id}\");\n  return JsonSerializer.Deserialize<Usuario>(json)!;\n}\n```\n\nEvitá .Result y .Wait(): bloquean y pueden causar deadlocks. Y evitá async void salvo en manejadores de eventos.", 'await de punta a punta; nunca .Result.', '¿Qué conviene evitar con tareas asíncronas?', ['await', 'Bloquear con .Result', 'Task<T>'], 1],
      [1, 'Pattern matching', "C# moderno permite decidir según la forma de un valor.\n\n```csharp\nstring Describir(object o) => o switch {\n  int n when n < 0 => \"negativo\",\n  int => \"número\",\n  string { Length: 0 } => \"texto vacío\",\n  null => \"nada\",\n  _ => \"otra cosa\",\n};\n```\n\nEl _ es el caso por defecto. El compilador avisa si falta cubrir algún caso en enums o tipos cerrados.", 'switch expression + patrones = decisiones claras.', '¿Qué significa _ en una switch expression?', ['Error', 'El caso por defecto', 'Un valor null'], 1],
    ],
    exam: [
      ['Una clase puede implementar…', ['Una sola interfaz', 'Varias interfaces', 'Ninguna si es genérica'], 1],
      ['where T : new() exige que T…', ['Sea nuevo', 'Tenga constructor sin parámetros', 'Sea struct'], 1],
      ['numeros.Select(n => n * 2) devuelve…', ['La suma', 'Cada número multiplicado por 2', 'Solo los pares'], 1],
      ['Para filtrar en LINQ se usa…', ['Select', 'Where', 'OrderBy'], 1],
      ['Func<int, bool> es una función que…', ['Recibe bool y devuelve int', 'Recibe int y devuelve bool', 'No devuelve nada'], 1],
      ['Un método async que no devuelve valor debería devolver…', ['void', 'Task', 'object'], 1],
      ['await dentro de un método requiere que el método sea…', ['static', 'async', 'public'], 1],
      ['o is string s …', ['Convierte cualquier cosa a string', 'Si o es string, lo asigna a s', 'Compara textos'], 1],
    ],
  },
  {
    id: 'csharp-3', track: 'csharp', level: 3, topic: 'Tecnología', name: 'C# y .NET · Avanzado',
    keywords: ['c#', 'csharp', '.net', 'asp.net core', 'api', 'inyeccion de dependencias', 'middleware', 'ef core', 'entity framework'],
    blurb: 'ASP.NET Core: minimal APIs, inyección de dependencias, middleware, configuración y EF Core.', pace: '6 paradas · 4 min',
    legs: ['ASP.NET Core', 'Datos y producción'],
    steps: [
      [0, 'Minimal APIs', "ASP.NET Core arranca en Program.cs. Con minimal APIs, un endpoint es una línea.\n\n```csharp\nvar builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\napp.MapGet(\"/saludo/{nombre}\", (string nombre) => $\"Hola, {nombre}\");\napp.Run();\n```\n\nLos parámetros se toman de la ruta, la query o el cuerpo según su tipo y nombre. Results.Ok(), Results.NotFound() devuelven respuestas HTTP explícitas.", 'MapGet/MapPost + Results.* para endpoints claros.', '¿De dónde sale nombre en /saludo/{nombre}?', ['Del cuerpo', 'De la ruta', 'De un header'], 1],
      [0, 'Inyección de dependencias', "ASP.NET Core trae un contenedor de dependencias. Registrás servicios y el framework los entrega a quien los pide.\n\n```csharp\nbuilder.Services.AddSingleton<IReloj, RelojSistema>(); // uno para toda la app\nbuilder.Services.AddScoped<IPedidos, Pedidos>();       // uno por request\nbuilder.Services.AddTransient<IFormato, Formato>();    // uno nuevo cada vez\n```\n\nRegla clave: un singleton no debe depender de un scoped, porque se quedaría con una instancia vieja.", 'Singleton, Scoped, Transient: elegí la vida útil a conciencia.', '¿Cuántas instancias crea AddScoped?', ['Una para toda la app', 'Una por request', 'Una por cada uso'], 1],
      [0, 'Middleware', "Cada request pasa por una cadena de middleware, en el orden en que los registrás. Cada uno puede actuar y pasar al siguiente.\n\n```csharp\napp.UseExceptionHandler(\"/error\");\napp.UseAuthentication();\napp.UseAuthorization();\napp.MapControllers();\n```\n\nEl orden importa: la autenticación (quién sos) va antes de la autorización (qué podés hacer).", 'El orden del middleware es el orden del request.', '¿Qué va primero?', ['UseAuthorization', 'UseAuthentication', 'Da igual'], 1],
      [1, 'Configuración y opciones', "La configuración se lee de appsettings.json, variables de entorno y secretos, en capas: lo último pisa a lo anterior. El patrón Options la convierte en una clase tipada.\n\n```csharp\nbuilder.Services.Configure<CorreoOpciones>(builder.Configuration.GetSection(\"Correo\"));\n// luego, en un servicio:\npublic Envio(IOptions<CorreoOpciones> op) => _op = op.Value;\n```\n\nNunca guardes contraseñas en appsettings.json del repo: usá variables de entorno o un gestor de secretos.", 'Configuración tipada con IOptions; secretos fuera del repo.', '¿Dónde NO van las contraseñas?', ['Variables de entorno', 'appsettings.json versionado', 'Un gestor de secretos'], 1],
      [1, 'EF Core', "Entity Framework Core mapea clases a tablas. El DbContext representa la sesión con la base.\n\n```csharp\nvar activos = await db.Clientes\n  .Where(c => c.Activo)\n  .AsNoTracking()\n  .ToListAsync();\n```\n\nLos cambios del modelo se versionan con migraciones (dotnet ef migrations add). AsNoTracking acelera las lecturas que no vas a modificar.", 'Migraciones para el esquema; AsNoTracking para solo lectura.', '¿Para qué sirve AsNoTracking?', ['Para borrar datos', 'Para lecturas más livianas sin seguimiento de cambios', 'Para crear tablas'], 1],
      [1, 'Producción: cancelar y medir', "Los endpoints pueden recibir un CancellationToken. Si el cliente se va, la operación se cancela y no gasta recursos.\n\n```csharp\napp.MapGet(\"/reporte\", async (Servicio s, CancellationToken ct) =>\n  await s.GenerarAsync(ct));\n```\n\nPasalo hacia abajo hasta la base de datos o la llamada HTTP. Sumá logs estructurados (ILogger) y health checks (AddHealthChecks) para saber qué pasa en producción.", 'Propagá CancellationToken y medí con logs y health checks.', '¿Qué permite el CancellationToken?', ['Reintentar', 'Cancelar trabajo cuando el cliente abandona', 'Encriptar'], 1],
    ],
    exam: [
      ['app.MapPost("/pedidos", (Pedido p) => ...) toma p de…', ['La query', 'El cuerpo del request', 'Un header'], 1],
      ['Un DbContext suele registrarse como…', ['Singleton', 'Scoped', 'Static'], 1],
      ['¿Por qué un singleton no debe depender de un scoped?', ['Por estilo', 'Retendría una instancia de un request viejo', 'Porque no compila nunca'], 1],
      ['El middleware se ejecuta…', ['En orden alfabético', 'En el orden en que se registra', 'En paralelo'], 1],
      ['Con configuración en capas, una variable de entorno…', ['Es ignorada', 'Puede pisar el valor de appsettings.json', 'Borra el archivo'], 1],
      ['¿Qué comando crea una migración de EF Core?', ['dotnet ef migrations add Nombre', 'dotnet run migrate', 'ef create'], 0],
      ['ToListAsync() frente a ToList() en un endpoint…', ['Es igual', 'No bloquea el hilo mientras espera la base', 'Devuelve otra cosa'], 1],
      ['¿Para qué sirve un health check?', ['Para tests unitarios', 'Para que la infraestructura sepa si la app está sana', 'Para compilar'], 1],
    ],
  },
]
