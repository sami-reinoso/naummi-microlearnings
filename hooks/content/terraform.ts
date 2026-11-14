import type { Route } from '../routes'

// Terraform en tres niveles: del primer apply a manejar estado e infraestructura en producción.
// Los ejemplos usan HCL genérico; lo mismo aplica a OpenTofu.

export const TERRAFORM: Route[] = [
  {
    id: 'terraform-1', track: 'terraform', level: 1, topic: 'Tecnología', name: 'Terraform · Fundamentos',
    keywords: ['terraform', 'iac', 'infraestructura como código', 'hcl', 'provider', 'plan', 'apply', 'state', 'devops', 'cloud', 'opentofu'],
    blurb: 'Infraestructura como código: providers, recursos, variables y el ciclo init, plan y apply.', pace: '6 paradas · 3 min',
    legs: ['Qué es', 'El flujo'],
    steps: [
      [0, 'Infraestructura como código', "En vez de crear servidores, bases o buckets a mano desde una consola web, los describís en archivos de texto. Terraform lee esos archivos y crea, cambia o borra lo necesario para que la nube quede igual a lo escrito.\n\nComo es código, se versiona en Git, se revisa en un PR y se puede repetir idéntico en otro entorno.", 'Describís cómo querés la infraestructura; Terraform la deja así.', '¿Qué ventaja tiene declarar la infraestructura en archivos?', ['Que no hace falta una cuenta en la nube', 'Que se versiona, se revisa y se repite igual', 'Que todo es gratis'], 1],
      [0, 'Providers y recursos', "Terraform no sabe hablar con cada nube por sí solo: usa providers, plugins para AWS, Azure, Google Cloud, GitHub y cientos más.\n\nCada cosa que creás es un resource, escrito en HCL: resource \"aws_s3_bucket\" \"fotos\" { bucket = \"mis-fotos\" }. El primer nombre es el tipo; el segundo, el nombre con el que lo referenciás en tu código.", 'El provider habla con la plataforma; el resource es cada cosa que creás.', 'En resource "aws_s3_bucket" "fotos", ¿qué es "fotos"?', ['El nombre local para referenciarlo en el código', 'La región de AWS', 'El provider'], 0],
      [0, 'Variables y outputs', "Las variables (variable \"region\" {}) evitan repetir valores y te dejan usar el mismo código con datos distintos; se usan como var.region y se cargan desde un archivo .tfvars o la línea de comandos.\n\nLos outputs muestran datos al terminar, como la IP de un servidor recién creado, y sirven para pasarle información a otros módulos.", 'Variables para entrar datos, outputs para sacarlos.', '¿Cómo se usa una variable llamada region?', ['$region', 'var.region', 'output.region'], 1],
      [1, 'init, plan y apply', "El flujo básico tiene tres comandos. terraform init descarga los providers y prepara la carpeta. terraform plan compara tu código con lo que existe y muestra qué haría, sin tocar nada. terraform apply ejecuta esos cambios después de pedirte confirmación.\n\nLeer el plan antes de aplicar es el hábito más importante de todos.", 'init prepara, plan muestra, apply ejecuta. Siempre leé el plan.', '¿Qué comando muestra los cambios sin hacerlos?', ['terraform apply', 'terraform plan', 'terraform init'], 1],
      [1, 'Leer un plan', "En el plan, + es algo que se crea, ~ algo que se modifica en el lugar, - algo que se destruye y -/+ algo que se reemplaza: se borra y se crea de nuevo.\n\nCuidado con los reemplazos: cambiar ciertos atributos, como el nombre de una base de datos, puede borrar el recurso con sus datos adentro. El plan te avisa «forces replacement».", 'Ojo con -/+ y «forces replacement»: es borrar y volver a crear.', '¿Qué significa -/+ en un plan?', ['Que se modifica sin cambios', 'Que se reemplaza: se destruye y se vuelve a crear', 'Que hay un error de sintaxis'], 1],
      [1, 'El archivo de estado', "Terraform guarda en el state (terraform.tfstate) qué recursos creó y cómo están. Así sabe que el bucket «fotos» de tu código es tal bucket real de la nube.\n\nNo lo edites a mano ni lo subas a Git: puede tener contraseñas y datos sensibles en texto plano. Si se pierde, Terraform cree que no existe nada e intenta crear todo de nuevo.", 'El state une tu código con lo real: no se edita a mano ni va a Git.', '¿Por qué no se sube el terraform.tfstate a Git?', ['Porque es muy liviano', 'Porque puede tener secretos en texto plano', 'Porque Git no acepta JSON'], 1],
    ],
    exam: [
      ['Infraestructura como código significa…', ['Programar los servidores en Assembler', 'Describir la infraestructura en archivos versionables', 'Usar solo la consola web'], 1],
      ['Un provider de Terraform es…', ['Un plugin que habla con una plataforma como AWS', 'Un tipo de variable', 'El archivo de estado'], 0],
      ['El primer comando en una carpeta nueva es…', ['terraform apply', 'terraform destroy', 'terraform init'], 2],
      ['terraform plan…', ['Aplica los cambios sin preguntar', 'Muestra lo que haría sin tocar nada', 'Borra el state'], 1],
      ['En un plan, el símbolo ~ indica…', ['Un recurso que se modifica en el lugar', 'Un recurso nuevo', 'Un recurso que se destruye'], 0],
      ['Para mostrar la IP de un servidor al terminar se usa…', ['Una variable', 'Un output', 'Un provider'], 1],
      ['Si se pierde el state, Terraform…', ['Lo reconstruye solo siempre', 'Cree que no existe nada e intenta crearlo de nuevo', 'Borra la cuenta'], 1],
      ['«forces replacement» en un plan avisa que…', ['El recurso se va a borrar y crear de nuevo', 'Hay que reiniciar la compu', 'Falta un provider'], 0],
    ],
  },
  {
    id: 'terraform-2', track: 'terraform', level: 2, topic: 'Tecnología', name: 'Terraform · Intermedio',
    keywords: ['terraform', 'módulos', 'for_each', 'count', 'data source', 'backend', 'remote state', 'locking', 'workspaces', 'entornos', 'lock file'],
    blurb: 'Módulos, recursos repetidos, data sources, estado remoto con bloqueo y varios entornos.', pace: '6 paradas · 3 min',
    legs: ['Organizar el código', 'Trabajar en equipo'],
    steps: [
      [0, 'Módulos', "Un módulo es una carpeta con archivos de Terraform que recibe variables y devuelve outputs. Lo llamás con module \"red\" { source = \"./modules/red\" cidr = \"10.0.0.0/16\" }.\n\nSirve para no copiar y pegar: armás una vez cómo se crea una red o un servicio y lo reutilizás en cada entorno o proyecto. También hay módulos públicos en el Terraform Registry.", 'Un módulo es una receta reutilizable: entra con variables, sale con outputs.', '¿Para qué sirve un módulo?', ['Para reutilizar configuración sin copiar y pegar', 'Para guardar el state', 'Para instalar Terraform'], 0],
      [0, 'count y for_each', "Para crear varios recursos parecidos no hace falta repetirlos. count = 3 crea tres copias indexadas por número. for_each recorre un mapa o un conjunto y las indexa por clave: for_each = toset([\"dev\", \"prod\"]).\n\nPreferí for_each: con count, si sacás un elemento del medio de la lista, los índices se corren y Terraform quiere recrear los que siguen.", 'for_each indexa por clave y evita recreaciones al sacar un elemento.', 'Sacás el segundo de tres elementos de una lista usada con count. ¿Qué puede pasar?', ['Nada', 'Terraform quiere recrear los recursos que siguen', 'Se borra el provider'], 1],
      [0, 'Data sources', "Un data source lee algo que ya existe sin administrarlo: la última imagen de Ubuntu, una red creada por otro equipo, el ID de tu cuenta. Se escribe data \"aws_vpc\" \"principal\" { ... } y se usa como data.aws_vpc.principal.id.\n\nLa diferencia con un resource: Terraform no lo crea, no lo cambia y no lo borra.", 'resource administra; data solo lee lo que ya existe.', 'Necesitás el ID de una red que creó otro equipo. ¿Qué usás?', ['Un resource nuevo', 'Un data source', 'Un output'], 1],
      [1, 'Estado remoto', "Si cada persona tiene su propio terraform.tfstate en la compu, el equipo pisa los cambios del otro. La solución es un backend remoto: el state vive en un bucket, un storage de Azure o HCP Terraform, y todos leen y escriben el mismo.\n\nSe configura en el bloque terraform { backend \"s3\" { ... } } y después de cambiarlo se corre terraform init otra vez.", 'En equipo, un solo state compartido en un backend remoto.', '¿Qué problema resuelve un backend remoto?', ['Que cada persona tenga su propio state', 'Que todo el equipo use el mismo state', 'Que Terraform corra más rápido'], 1],
      [1, 'Bloqueo del estado', "Si dos personas corren apply al mismo tiempo sobre el mismo state, pueden romperlo. Por eso los backends remotos ofrecen locking: mientras alguien aplica, el state queda bloqueado y el otro espera o recibe un error.\n\nSi un apply se corta y el bloqueo queda trabado, existe terraform force-unlock, pero usalo solo después de confirmar que nadie más está aplicando.", 'El locking evita dos apply a la vez; force-unlock solo con certeza.', '¿Para qué sirve el bloqueo del state?', ['Para que nadie lo pueda leer', 'Para evitar que dos apply corran a la vez', 'Para cifrar contraseñas'], 1],
      [1, 'Versiones y entornos', "Fijá versiones en required_providers (version = \"~> 5.0\") y subí a Git el archivo .terraform.lock.hcl: así todo el equipo y el CI usan exactamente las mismas versiones de providers.\n\nPara separar dev, staging y prod, lo más común es una carpeta por entorno que llama a los mismos módulos con distintas variables, cada una con su propio state.", 'Versiones fijadas, lock file en Git y un state por entorno.', '¿El .terraform.lock.hcl va a Git?', ['Sí, para que todos usen las mismas versiones', 'No, tiene secretos', 'Solo en producción'], 0],
    ],
    exam: [
      ['Un módulo recibe datos por…', ['Outputs', 'Variables', 'El state'], 1],
      ['Para crear un recurso por cada clave de un mapa se usa…', ['for_each', 'depends_on', 'terraform import'], 0],
      ['Un data source…', ['Crea recursos nuevos', 'Lee recursos existentes sin administrarlos', 'Borra recursos viejos'], 1],
      ['Después de cambiar el backend hay que correr…', ['terraform init', 'terraform fmt', 'terraform output'], 0],
      ['Si dos personas aplican a la vez sin locking…', ['No pasa nada', 'El state se puede corromper', 'Terraform se actualiza'], 1],
      ['terraform force-unlock se usa…', ['En cada apply', 'Solo si el bloqueo quedó trabado y nadie está aplicando', 'Para borrar recursos'], 1],
      ['version = "~> 5.0" en un provider significa…', ['Cualquier versión', 'Versiones 5.x, sin pasar a la 6', 'Exactamente la 5.0.0'], 1],
      ['Una forma común de separar dev y prod es…', ['Un solo state para todo', 'Una carpeta y un state por entorno', 'Cambiar de provider'], 1],
    ],
  },
  {
    id: 'terraform-3', track: 'terraform', level: 3, topic: 'Tecnología', name: 'Terraform · Avanzado',
    keywords: ['terraform', 'import', 'moved', 'refactor', 'drift', 'lifecycle', 'prevent_destroy', 'secretos', 'sensitive', 'ci/cd', 'policy as code'],
    blurb: 'Importar y refactorizar sin destruir, drift, lifecycle, secretos y Terraform en CI/CD.', pace: '6 paradas · 4 min',
    legs: ['Estado a fondo', 'En producción'],
    steps: [
      [0, 'Traer lo que ya existe', "Si algo se creó a mano, Terraform no lo conoce. Con un bloque import { to = aws_s3_bucket.fotos  id = \"mis-fotos\" } y el resource correspondiente, el próximo plan lo incorpora al state sin recrearlo.\n\nterraform plan -generate-config-out=generado.tf puede escribirte un primer borrador del código para lo importado; después hay que revisarlo y limpiarlo.", 'import suma al state lo que ya existe, sin recrearlo.', 'Un bucket se creó a mano y querés administrarlo con Terraform. ¿Qué usás?', ['Un bloque import', 'terraform destroy', 'Un data source nuevo'], 0],
      [0, 'Refactorizar sin destruir', "Si renombrás un recurso o lo movés a un módulo, Terraform ve una dirección nueva: quiere borrar el viejo y crear uno nuevo. Para evitarlo, declarás el cambio con un bloque moved { from = aws_instance.web  to = module.app.aws_instance.web }.\n\nTambién existe terraform state mv, pero moved queda en el código, se revisa en el PR y se aplica igual en todos los entornos.", 'Renombrar o mover sin destruir: bloque moved.', 'Renombraste un resource y el plan quiere destruirlo. ¿Qué agregás?', ['Un bloque moved', 'Un count', 'Un nuevo provider'], 0],
      [0, 'Drift', "Drift es cuando la infraestructura real cambió por fuera de Terraform: alguien tocó una regla de firewall desde la consola. En el próximo plan, Terraform propone volver a lo que dice el código.\n\nterraform plan -refresh-only muestra qué cambió afuera sin proponer correcciones. Ante un drift decidís: lo revertís aplicando, o actualizás el código para que refleje el cambio.", 'Drift: cambios por fuera de Terraform. Revertilo o llevalo al código.', '¿Qué es drift?', ['Un error de sintaxis en HCL', 'Una diferencia entre lo real y lo que dice el state, por cambios hechos afuera', 'Una versión vieja del provider'], 1],
      [1, 'lifecycle', "El bloque lifecycle cambia cómo Terraform maneja un recurso. prevent_destroy = true hace fallar cualquier plan que lo destruya, ideal para bases de datos. create_before_destroy crea el reemplazo antes de borrar el viejo, para no cortar el servicio.\n\nignore_changes le dice que no corrija ciertos atributos que cambian solos, como la cantidad de instancias que maneja un autoescalado.", 'prevent_destroy protege, create_before_destroy evita cortes, ignore_changes tolera.', '¿Qué opción protege una base de datos de un destroy accidental?', ['ignore_changes', 'prevent_destroy', 'create_before_destroy'], 1],
      [1, 'Secretos', "Marcar una variable u output como sensitive = true lo oculta en la pantalla, pero el valor sigue en el state en texto plano. Por eso el state se guarda cifrado y con acceso restringido.\n\nMejor todavía: no pongas secretos en .tfvars ni en el código. Leelos desde un gestor de secretos (Vault, AWS Secrets Manager, Azure Key Vault) o pasalos por variables de entorno TF_VAR_nombre en el CI.", 'sensitive oculta en pantalla, no en el state: protegé el state.', 'Una variable con sensitive = true…', ['Se cifra en el state', 'Se oculta en la salida pero sigue en el state', 'No se guarda nunca'], 1],
      [1, 'Terraform en CI/CD', "En equipos, nadie aplica desde su compu. El flujo típico: al abrir un PR, el CI corre terraform fmt -check, validate y plan, y publica el plan en el PR. Se revisa, y recién al aprobar se corre apply con ese mismo plan guardado (plan -out y apply de ese archivo).\n\nSe puede sumar policy as code (OPA, Sentinel, Checkov) para frenar automáticamente cosas como buckets públicos o recursos sin etiquetas.", 'Plan en el PR, revisión, y apply del plan aprobado desde el CI.', '¿Por qué aplicar el plan guardado con -out?', ['Porque es más rápido de escribir', 'Para aplicar exactamente lo que se revisó', 'Para saltear la confirmación siempre'], 1],
    ],
    exam: [
      ['Un bloque import sirve para…', ['Sumar al state un recurso que ya existe', 'Descargar providers', 'Borrar el state'], 0],
      ['Mover un resource a un módulo sin recrearlo se declara con…', ['moved', 'depends_on', 'replace'], 0],
      ['terraform plan -refresh-only…', ['Aplica todo sin preguntar', 'Muestra lo que cambió afuera sin proponer correcciones', 'Actualiza Terraform'], 1],
      ['create_before_destroy sirve para…', ['Evitar cortes al reemplazar un recurso', 'Impedir cualquier destroy', 'Ignorar cambios'], 0],
      ['Un autoescalado cambia la cantidad de instancias. Para que Terraform no lo revierta se usa…', ['prevent_destroy', 'ignore_changes', 'count'], 1],
      ['Los valores marcados como sensitive…', ['No llegan al state', 'Siguen en el state, por eso el state se protege', 'Se borran después del apply'], 1],
      ['En un flujo de CI/CD, el apply conviene…', ['Correrlo cada uno desde su compu', 'Correrlo desde el CI con el plan aprobado', 'Correrlo antes del plan'], 1],
      ['Checkov, OPA y Sentinel son herramientas de…', ['Policy as code', 'Monitoreo de logs', 'Diseño de interfaces'], 0],
    ],
  },
]
