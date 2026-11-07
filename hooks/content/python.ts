import type { Route } from '../routes'

// Python en tres niveles. Un párrafo que empieza con ``` es un bloque de código.

export const PYTHON: Route[] = [
  {
    id: 'python-1', track: 'python', level: 1, topic: 'Tecnología', name: 'Python · Fundamentos',
    keywords: ['python', 'programación', 'listas', 'diccionarios', 'funciones', 'bucles', 'f-strings'],
    blurb: 'Variables y tipos, listas, diccionarios, condicionales, bucles y funciones.', pace: '6 paradas · 3 min',
    legs: ['Datos', 'Control'],
    steps: [
      [0, 'Variables y tipos', "En Python no declarás tipos: una variable apunta a un valor y el tipo es del valor. Los básicos son int, float, str y bool.\n\n```python\nedad = 30\nprecio = 9.99\nnombre = 'Ana'\nactivo = True\nprint(f'{nombre} tiene {edad} años')\n```\n\nLas f-strings (f'...') insertan valores dentro del texto con llaves.", 'f-strings para armar texto con valores.', '¿Qué imprime print(f"{2 + 3} manzanas")?', ['{2 + 3} manzanas', '5 manzanas', '23 manzanas'], 1],
      [0, 'Listas', "Una lista guarda elementos en orden y se puede modificar. Los índices empiezan en 0 y los negativos cuentan desde el final.\n\n```python\nfrutas = ['pera', 'uva', 'kiwi']\nfrutas.append('mango')\nprint(frutas[0], frutas[-1])  # pera mango\nprint(frutas[1:3])            # ['uva', 'kiwi']\n```\n\nEl rebanado [inicio:fin] incluye el inicio y excluye el fin.", 'Índices desde 0; [a:b] excluye b.', '¿Qué devuelve [10, 20, 30][-1]?', ['10', '30', 'Error'], 1],
      [0, 'Diccionarios', "Un diccionario asocia claves con valores y busca por clave muy rápido.\n\n```python\nedades = {'Ana': 30, 'Luis': 25}\nedades['Sofía'] = 28\nprint(edades.get('Pedro', 0))  # 0 si no existe\nfor nombre, edad in edades.items():\n    print(nombre, edad)\n```\n\n.get() evita el KeyError cuando la clave no existe.", 'Usá .get(clave, defecto) para buscar sin errores.', '¿Qué hace edades.get("Pedro", 0) si no existe Pedro?', ['Lanza KeyError', 'Devuelve 0', 'Crea la clave'], 1],
      [1, 'Condicionales e indentación', "Python usa la indentación (normalmente 4 espacios) para marcar bloques. No hay llaves.\n\n```python\nif temperatura > 30:\n    print('Calor')\nelif temperatura > 15:\n    print('Templado')\nelse:\n    print('Frío')\n```\n\nValores como 0, '', [] y None se consideran falsos en un if.", 'La indentación es parte de la sintaxis.', '¿Cómo se considera una lista vacía en un if?', ['Verdadera', 'Falsa', 'Error'], 1],
      [1, 'Bucles', "for recorre cualquier colección. range() genera números; enumerate() da índice y valor a la vez.\n\n```python\nfor i in range(3):\n    print(i)        # 0 1 2\nfor i, fruta in enumerate(['pera', 'uva']):\n    print(i, fruta)\n```\n\nwhile repite mientras se cumpla una condición; break corta el bucle.", 'enumerate() cuando necesitás índice y valor.', '¿Qué números genera range(3)?', ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3'], 1],
      [1, 'Funciones', "def define una función. Los parámetros pueden tener valores por defecto y la función devuelve con return.\n\n```python\ndef precio_final(base, descuento=0.0):\n    return base * (1 - descuento)\n\nprint(precio_final(100))        # 100.0\nprint(precio_final(100, 0.2))   # 80.0\n```\n\nSin return, la función devuelve None.", 'Sin return, una función devuelve None.', '¿Qué devuelve una función sin return?', ['0', 'None', 'Un error'], 1],
    ],
    exam: [
      ['type(3.0) es…', ['int', 'float', 'str'], 1],
      ['lista = [1, 2, 3]; lista[1:] es…', ['[1]', '[2, 3]', '[1, 2]'], 1],
      ['¿Cómo se agrega un elemento al final de una lista?', ['lista.add(x)', 'lista.append(x)', 'lista.push(x)'], 1],
      ['d = {"a": 1}; d["b"] lanza…', ['None', 'KeyError', '0'], 1],
      ['¿Qué marca un bloque de código en Python?', ['Llaves', 'La indentación', 'Punto y coma'], 1],
      ['for i, x in enumerate(["a", "b"]) da en la primera vuelta…', ['i=1, x="a"', 'i=0, x="a"', 'i="a", x=0'], 1],
      ['def f(x, y=2): return x * y. ¿Qué da f(3)?', ['5', '6', 'Error'], 1],
      ['bool("") es…', ['True', 'False', 'Error'], 1],
    ],
  },
  {
    id: 'python-2', track: 'python', level: 2, topic: 'Tecnología', name: 'Python · Intermedio',
    keywords: ['python', 'comprensiones', 'excepciones', 'clases', 'archivos', 'módulos', 'entornos virtuales'],
    blurb: 'Comprensiones, excepciones, archivos, clases, módulos y entornos virtuales.', pace: '6 paradas · 3 min',
    legs: ['Código pythonico', 'Organizar'],
    steps: [
      [0, 'Comprensiones', "Una comprensión arma una lista (o diccionario, o set) en una línea a partir de otra colección.\n\n```python\ncuadrados = [n * n for n in range(5)]\npares = [n for n in numeros if n % 2 == 0]\nprecios = {p['nombre']: p['precio'] for p in productos}\n```\n\nSon más legibles que un for con append, mientras quepan cómodas en una línea.", 'Comprensión = transformar y filtrar en una línea.', '¿Qué da [n * 2 for n in [1, 2, 3]]?', ['[1, 2, 3, 1, 2, 3]', '[2, 4, 6]', '[3, 4, 5]'], 1],
      [0, 'Excepciones', "try/except atrapa errores para manejarlos en lugar de cortar el programa. Atrapá el error específico, no cualquier cosa.\n\n```python\ntry:\n    edad = int(texto)\nexcept ValueError:\n    edad = None\nfinally:\n    print('listo')\n```\n\nraise lanza un error propio: raise ValueError('edad inválida').", 'Atrapá excepciones específicas, no un except vacío.', '¿Qué error da int("hola")?', ['TypeError', 'ValueError', 'KeyError'], 1],
      [0, 'Archivos con with', "with abre un recurso y lo cierra solo al terminar, aunque haya un error.\n\n```python\nwith open('notas.txt', encoding='utf-8') as f:\n    for linea in f:\n        print(linea.strip())\n\nwith open('salida.txt', 'w', encoding='utf-8') as f:\n    f.write('Hola\\n')\n```\n\nIndicá siempre el encoding para evitar problemas con acentos.", 'with para abrir archivos; siempre encoding="utf-8".', '¿Qué asegura with open(...) as f?', ['Que el archivo exista', 'Que el archivo se cierre al terminar', 'Que sea más rápido'], 1],
      [1, 'Clases y dataclasses', "Una clase agrupa datos y comportamiento. Para clases que son principalmente datos, @dataclass escribe el constructor y la comparación por vos.\n\n```python\nfrom dataclasses import dataclass\n\n@dataclass\nclass Producto:\n    nombre: str\n    precio: float\n\n    def con_iva(self) -> float:\n        return self.precio * 1.21\n```\n\nself es la instancia sobre la que se llama el método.", '@dataclass para clases de datos sin repetir código.', '¿Qué genera @dataclass automáticamente?', ['Una base de datos', 'El constructor y la comparación', 'Una interfaz web'], 1],
      [1, 'Módulos e imports', "Cada archivo .py es un módulo. Importás lo que necesitás de otros módulos o de la librería estándar.\n\n```python\nfrom pathlib import Path\nfrom datetime import date\nimport json\n\nruta = Path('datos') / 'clientes.json'\nclientes = json.loads(ruta.read_text(encoding='utf-8'))\n```\n\nif __name__ == '__main__': marca el código que corre solo al ejecutar el archivo directamente.", 'La librería estándar trae mucho: pathlib, json, datetime.', '¿Cuándo corre el bloque if __name__ == "__main__"?', ['Siempre', 'Solo al ejecutar ese archivo directamente', 'Nunca'], 1],
      [1, 'Entornos virtuales y paquetes', "Un entorno virtual aísla las dependencias de cada proyecto, así dos proyectos pueden usar versiones distintas de una librería.\n\n```bash\npython -m venv .venv\nsource .venv/bin/activate\npip install requests\npip freeze > requirements.txt\n```\n\nrequirements.txt lista las versiones para que otra persona instale lo mismo con pip install -r.", 'Un entorno virtual por proyecto.', '¿Para qué sirve un entorno virtual?', ['Para que Python sea más rápido', 'Para aislar las dependencias de cada proyecto', 'Para ejecutar en la nube'], 1],
    ],
    exam: [
      ['{n: n * n for n in range(3)} da…', ['[0, 1, 4]', '{0: 0, 1: 1, 2: 4}', '{0, 1, 4}'], 1],
      ['Un except sin tipo…', ['Es la práctica recomendada', 'Atrapa todo y puede esconder errores', 'No es válido'], 1],
      ['El bloque finally…', ['Corre solo si hubo error', 'Corre siempre', 'Reemplaza a except'], 1],
      ['open("a.txt", "w")…', ['Agrega al final', 'Sobrescribe el archivo', 'Solo lee'], 1],
      ['En un método, self es…', ['La clase', 'La instancia', 'El módulo'], 1],
      ['Path("datos") / "a.json" …', ['Divide números', 'Une rutas de forma portable', 'Lanza error'], 1],
      ['pip freeze > requirements.txt …', ['Instala paquetes', 'Guarda la lista de paquetes y versiones', 'Borra paquetes'], 1],
      ['[x for x in nums if x > 0] …', ['Filtra los positivos', 'Suma los positivos', 'Ordena la lista'], 0],
    ],
  },
  {
    id: 'python-3', track: 'python', level: 3, topic: 'Tecnología', name: 'Python · Avanzado',
    keywords: ['python', 'generadores', 'decoradores', 'type hints', 'asyncio', 'pytest', 'context managers'],
    blurb: 'Generadores, decoradores, type hints, context managers, asyncio y tests con pytest.', pace: '6 paradas · 4 min',
    legs: ['Lenguaje', 'Producción'],
    steps: [
      [0, 'Generadores', "Un generador produce valores de a uno, solo cuando se piden, sin guardar todo en memoria. Se escribe como una función con yield.\n\n```python\ndef leer_grande(ruta):\n    with open(ruta, encoding='utf-8') as f:\n        for linea in f:\n            yield linea.strip()\n\ntotal = sum(1 for _ in leer_grande('log.txt'))\n```\n\nIdeal para archivos enormes o secuencias infinitas.", 'yield produce valores de a uno, sin cargar todo.', '¿Qué ventaja tiene un generador?', ['Es más corto', 'No guarda todos los valores en memoria', 'Es más fácil de depurar'], 1],
      [0, 'Decoradores', "Un decorador envuelve una función para agregarle comportamiento sin modificarla.\n\n```python\nimport time, functools\n\ndef cronometrar(fn):\n    @functools.wraps(fn)\n    def envuelta(*args, **kwargs):\n        t = time.perf_counter()\n        resultado = fn(*args, **kwargs)\n        print(f'{fn.__name__}: {time.perf_counter() - t:.3f}s')\n        return resultado\n    return envuelta\n\n@cronometrar\ndef procesar(): ...\n```\n\nfunctools.wraps conserva el nombre y la documentación de la función original.", 'Un decorador recibe una función y devuelve otra que la envuelve.', '¿Para qué sirve functools.wraps?', ['Para acelerar', 'Para conservar nombre y docstring de la original', 'Para manejar errores'], 1],
      [0, 'Type hints', "Las anotaciones de tipo no cambian cómo corre el código, pero permiten que herramientas como mypy o el editor detecten errores.\n\n```python\ndef promedio(valores: list[float]) -> float | None:\n    return sum(valores) / len(valores) if valores else None\n```\n\nEn proyectos grandes, correr mypy en CI evita muchos errores de tipos antes de producción.", 'Los type hints no se validan solos: usá mypy o el editor.', '¿Python valida los type hints al ejecutar?', ['Sí, siempre', 'No, los usan herramientas como mypy', 'Solo en funciones'], 1],
      [1, 'Context managers propios', "with funciona con cualquier objeto que sepa abrir y cerrar. contextlib.contextmanager permite crear uno con un generador.\n\n```python\nfrom contextlib import contextmanager\n\n@contextmanager\ndef transaccion(conexion):\n    try:\n        yield conexion\n        conexion.commit()\n    except Exception:\n        conexion.rollback()\n        raise\n```\n\nLo que va antes del yield es la entrada; lo que va después, la salida.", 'Con @contextmanager, antes del yield abre y después cierra.', 'En un @contextmanager, ¿qué corre después del yield?', ['La entrada', 'La salida o limpieza', 'Nada'], 1],
      [1, 'asyncio', "async/await permite esperar muchas operaciones de red a la vez en un solo hilo.\n\n```python\nimport asyncio, httpx\n\nasync def traer(url):\n    async with httpx.AsyncClient() as c:\n        return (await c.get(url)).status_code\n\nasync def main():\n    codigos = await asyncio.gather(*(traer(u) for u in urls))\n\nasyncio.run(main())\n```\n\nSirve para trabajo de entrada y salida; para cálculo pesado conviene multiprocessing.", 'asyncio para mucha espera de red; no acelera cálculos.', '¿Para qué tipo de trabajo conviene asyncio?', ['Cálculo intensivo', 'Muchas operaciones de red o disco a la vez', 'Gráficos'], 1],
      [1, 'Tests con pytest', "pytest encuentra funciones que empiezan con test_ y usa assert común.\n\n```python\nimport pytest\nfrom precios import precio_final\n\n@pytest.mark.parametrize('base,desc,esperado', [\n    (100, 0, 100), (100, 0.2, 80),\n])\ndef test_precio_final(base, desc, esperado):\n    assert precio_final(base, desc) == pytest.approx(esperado)\n```\n\nparametrize corre el mismo test con varios casos; approx compara floats con tolerancia.", 'parametrize para varios casos; approx para floats.', '¿Para qué sirve pytest.approx?', ['Para saltear tests', 'Para comparar floats con tolerancia', 'Para medir tiempos'], 1],
    ],
    exam: [
      ['Una función con yield devuelve…', ['Una lista', 'Un generador', 'None'], 1],
      ['(x * x for x in range(10**9)) …', ['Ocupa mucha memoria al crearse', 'Se evalúa de a uno al recorrerlo', 'Lanza error'], 1],
      ['@decorador sobre def f es equivalente a…', ['f = decorador(f)', 'decorador = f(decorador)', 'f()'], 0],
      ['def f(x: int) -> str: … f("a") en tiempo de ejecución…', ['Lanza TypeError por el hint', 'Corre igual; el hint no se valida solo', 'No compila'], 1],
      ['Para cálculo pesado en varios núcleos conviene…', ['asyncio', 'multiprocessing', 'yield'], 1],
      ['asyncio.gather(...) …', ['Ejecuta corrutinas en forma concurrente', 'Ordena listas', 'Cierra archivos'], 0],
      ['pytest detecta tests en funciones que empiezan con…', ['check_', 'test_', 'spec_'], 1],
      ['Un context manager garantiza…', ['Velocidad', 'Que la limpieza ocurra aunque haya error', 'Tipos correctos'], 1],
    ],
  },
]
