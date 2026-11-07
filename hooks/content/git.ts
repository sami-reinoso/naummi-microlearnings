import type { Route } from '../routes'

// Git en tres niveles. Un párrafo que empieza con ``` es un bloque de código.

export const GIT: Route[] = [
  {
    id: 'git-1', track: 'git', level: 1, topic: 'Tecnología', name: 'Git · Fundamentos',
    keywords: ['git', 'commit', 'ramas', 'branch', 'staging', 'push', 'pull', 'control de versiones'],
    blurb: 'Las tres zonas, commits, .gitignore, historial, ramas y remotos.', pace: '6 paradas · 3 min',
    legs: ['Guardar cambios', 'Ramas y remotos'],
    steps: [
      [0, 'Las tres zonas', "Git trabaja con tres zonas: la carpeta de trabajo (tus archivos), el área de preparación (staging, lo que va a entrar en el próximo commit) y el repositorio (la historia guardada).\n\n```bash\ngit status            # qué cambió y qué está preparado\ngit add archivo.txt   # pasa el cambio a staging\ngit commit -m \"Agrega archivo\"\n```\n\nStaging te deja elegir qué cambios van juntos en cada commit.", 'Trabajo → staging (add) → historia (commit).', '¿Qué hace git add?', ['Guarda en el remoto', 'Pasa cambios al área de preparación', 'Crea una rama'], 1],
      [0, 'Buenos commits', "Un commit es una foto del proyecto con un mensaje. Conviene que cada uno haga una sola cosa y que el mensaje diga qué cambia y por qué, en presente: \"Corrige el cálculo del IVA\".\n\nCommits chicos y claros facilitan revisar, revertir y encontrar dónde apareció un error.", 'Un commit, una idea; mensaje que explique el cambio.', '¿Cuál es mejor mensaje?', ['cambios', 'Corrige el redondeo del total en el carrito', 'asdf'], 1],
      [0, '.gitignore, log y diff', ".gitignore lista lo que Git no debe seguir: dependencias, builds, secretos.\n\n```bash\n# .gitignore\nnode_modules/\ndist/\n.env\n```\n\ngit log --oneline muestra la historia compacta y git diff muestra qué cambió y todavía no está preparado. git diff --staged muestra lo que ya está en staging.", 'Nunca versiones secretos: .env va en .gitignore.', '¿Qué muestra git diff --staged?', ['Cambios no preparados', 'Cambios ya preparados para el commit', 'La lista de ramas'], 1],
      [1, 'Ramas', "Una rama es una línea de trabajo independiente. Crear una es barato.\n\n```bash\ngit switch -c arreglo-login   # crea y cambia a la rama\ngit switch main               # vuelve a main\ngit branch                    # lista ramas\n```\n\nTrabajá cada cambio en su rama y mantené main estable.", 'Una rama por cambio; main estable.', '¿Qué hace git switch -c nueva?', ['Borra la rama nueva', 'Crea la rama nueva y se cambia a ella', 'Fusiona nueva en main'], 1],
      [1, 'Remotos', "Un remoto es una copia del repositorio en otro lugar, como GitHub. Por convención se llama origin.\n\n```bash\ngit clone url        # copia un repo remoto\ngit push -u origin mi-rama\ngit pull             # trae y fusiona cambios\n```\n\n-u deja vinculada tu rama con la remota, así después alcanza con git push.", 'clone para empezar, push para subir, pull para traer.', '¿Qué hace git push?', ['Trae cambios del remoto', 'Sube tus commits al remoto', 'Crea un commit'], 1],
      [1, 'Deshacer sin miedo', "Algunas formas seguras de volver atrás:\n\n```bash\ngit restore archivo.txt          # descarta cambios no preparados\ngit restore --staged archivo.txt # saca del staging\ngit commit --amend               # corrige el último commit (si no lo subiste)\n```\n\nAntes de descartar, mirá git status: lo que restaurás sin commit no se recupera.", 'restore para descartar; --amend solo si no lo subiste.', '¿Cuándo es seguro git commit --amend?', ['Siempre', 'Si el commit todavía no se subió', 'Nunca'], 1],
    ],
    exam: [
      ['¿Qué comando muestra qué archivos cambiaron?', ['git status', 'git push', 'git init'], 0],
      ['El área de preparación también se llama…', ['stash', 'staging o index', 'origin'], 1],
      ['¿Dónde va la carpeta node_modules?', ['En el commit', 'En .gitignore', 'En una rama aparte'], 1],
      ['git log --oneline…', ['Borra la historia', 'Muestra la historia en una línea por commit', 'Sube los commits'], 1],
      ['Para crear una rama y pasarte a ella…', ['git switch -c nombre', 'git merge nombre', 'git pull nombre'], 0],
      ['El remoto por defecto se suele llamar…', ['main', 'origin', 'head'], 1],
      ['git restore --staged archivo…', ['Borra el archivo', 'Lo saca del staging sin perder los cambios', 'Lo sube'], 1],
      ['Un buen commit…', ['Mezcla varios temas', 'Hace una sola cosa y explica el cambio', 'No tiene mensaje'], 1],
    ],
  },
  {
    id: 'git-2', track: 'git', level: 2, topic: 'Tecnología', name: 'Git · Intermedio',
    keywords: ['git', 'merge', 'rebase', 'conflictos', 'stash', 'revert', 'reset'],
    blurb: 'Merge, conflictos, rebase, stash y cómo revertir o resetear.', pace: '6 paradas · 3 min',
    legs: ['Integrar', 'Corregir'],
    steps: [
      [0, 'Merge', "git merge integra otra rama en la actual. Si tu rama no avanzó, es un fast-forward: solo se mueve el puntero. Si las dos avanzaron, se crea un commit de merge que une las historias.\n\n```bash\ngit switch main\ngit merge arreglo-login\n```", 'Fast-forward si no hubo divergencia; commit de merge si la hubo.', '¿Qué es un fast-forward?', ['Un merge que solo mueve el puntero', 'Un rebase', 'Un conflicto'], 0],
      [0, 'Resolver conflictos', "Hay conflicto cuando las dos ramas cambiaron las mismas líneas. Git marca el archivo:\n\n```text\n<<<<<<< HEAD\ncolor = 'azul'\n=======\ncolor = 'verde'\n>>>>>>> otra-rama\n```\n\nEditás el archivo para dejar la versión correcta, borrás las marcas y hacés git add y git commit (o git merge --continue).", 'Elegí el contenido final, borrá las marcas, add y continuá.', 'Después de resolver un conflicto, ¿qué sigue?', ['git push --force', 'git add del archivo y continuar el merge', 'Borrar la rama'], 1],
      [0, 'Rebase', "git rebase main reaplica tus commits encima de la punta de main, como si hubieras empezado desde ahí. La historia queda lineal.\n\n```bash\ngit switch mi-rama\ngit rebase main\n```\n\nRegla de oro: no hagas rebase de commits que otras personas ya tienen, porque reescribe la historia.", 'Rebase reescribe historia: solo sobre commits que nadie más tiene.', '¿Qué hace git rebase main desde mi-rama?', ['Borra main', 'Reaplica tus commits encima de main', 'Fusiona mi-rama en main'], 1],
      [1, 'stash', "git stash guarda tus cambios sin commitear y deja la carpeta limpia, por ejemplo para cambiar de rama un momento.\n\n```bash\ngit stash push -m \"a medias\"\ngit switch otra-rama\n# ...\ngit switch -\ngit stash pop\n```\n\npop los aplica y los saca de la pila; apply los aplica y los deja guardados.", 'stash para guardar algo a medias; pop para recuperarlo.', '¿Qué diferencia hay entre pop y apply?', ['Ninguna', 'pop quita el stash de la pila; apply lo deja', 'apply borra cambios'], 1],
      [1, 'revert y reset', "git revert crea un commit nuevo que deshace otro: es seguro en ramas compartidas porque no reescribe historia.\n\ngit reset mueve la rama hacia atrás. --soft conserva los cambios en staging, --mixed (por defecto) en la carpeta, y --hard los descarta.\n\n```bash\ngit revert a1b2c3d\ngit reset --soft HEAD~1\n```", 'En ramas compartidas, revert; reset solo en lo local.', '¿Qué conviene para deshacer un commit ya subido a main?', ['git reset --hard', 'git revert', 'Borrar el repo'], 1],
      [1, 'pull con rebase', "git pull por defecto hace fetch y merge, lo que puede llenar la historia de merges innecesarios. Con rebase, tus commits locales se reaplican encima de lo que llegó.\n\n```bash\ngit pull --rebase\ngit config --global pull.rebase true\n```\n\ngit fetch, en cambio, solo trae y no toca tu rama: útil para mirar antes de integrar.", 'fetch para mirar; pull --rebase para integrar limpio.', '¿Qué hace git fetch?', ['Trae cambios sin modificar tu rama', 'Sube cambios', 'Hace merge'], 0],
    ],
    exam: [
      ['Las marcas <<<<<<< y >>>>>>> indican…', ['Un comentario', 'Un conflicto', 'Un tag'], 1],
      ['¿Qué no se debe hacer con commits ya compartidos?', ['revert', 'rebase', 'log'], 1],
      ['git reset --hard HEAD~1…', ['Conserva los cambios', 'Descarta el último commit y sus cambios', 'Crea un commit'], 1],
      ['git stash apply…', ['Aplica y elimina el stash', 'Aplica y conserva el stash', 'Borra todos los stash'], 1],
      ['Un merge con divergencia crea…', ['Un commit de merge', 'Nada', 'Un tag'], 0],
      ['git revert X…', ['Borra X de la historia', 'Crea un commit que deshace X', 'Mueve HEAD'], 1],
      ['Para ver qué hay en el remoto sin integrarlo…', ['git fetch', 'git push', 'git reset'], 0],
      ['git reset --soft HEAD~1 deja los cambios…', ['Perdidos', 'En staging', 'En otra rama'], 1],
    ],
  },
  {
    id: 'git-3', track: 'git', level: 3, topic: 'Tecnología', name: 'Git · Avanzado',
    keywords: ['git', 'rebase interactivo', 'cherry-pick', 'bisect', 'reflog', 'hooks', 'flujo de trabajo', 'pull request'],
    blurb: 'Rebase interactivo, cherry-pick, bisect, reflog, hooks y flujos de equipo.', pace: '6 paradas · 4 min',
    legs: ['Historia', 'Equipo'],
    steps: [
      [0, 'Rebase interactivo', "git rebase -i permite ordenar tus commits antes de compartirlos: unir, renombrar, reordenar o descartar.\n\n```text\npick a1 Agrega formulario\nsquash b2 Corrige typo\nreword c3 Valida email\n```\n\nsquash une un commit con el anterior y fixup hace lo mismo descartando su mensaje. Es para limpiar historia local antes del pull request.", 'squash y fixup para entregar una historia limpia.', '¿Qué hace fixup?', ['Borra el commit', 'Lo une al anterior descartando su mensaje', 'Lo mueve al final'], 1],
      [0, 'cherry-pick', "git cherry-pick copia un commit puntual de otra rama a la actual.\n\n```bash\ngit switch release-2.1\ngit cherry-pick 9f3e1a2\n```\n\nEs útil para llevar un arreglo urgente a una versión publicada sin traer todo lo demás. El commit copiado tiene otro hash.", 'cherry-pick trae un commit puntual a otra rama.', '¿Para qué sirve cherry-pick?', ['Para borrar ramas', 'Para copiar un commit específico a la rama actual', 'Para firmar commits'], 1],
      [0, 'bisect', "git bisect busca el commit que introdujo un error con búsqueda binaria.\n\n```bash\ngit bisect start\ngit bisect bad              # este commit falla\ngit bisect good v1.4.0      # este andaba\n# probás y marcás good o bad hasta que Git lo encuentra\ngit bisect reset\n```\n\nEntre 1.000 commits lo encuentra en unas 10 pruebas. Con git bisect run y un script, lo automatiza.", 'bisect = búsqueda binaria del commit culpable.', '¿Cuántas pruebas necesita bisect con ~1000 commits?', ['Unas 10', 'Unas 500', '1000'], 0],
      [1, 'reflog: la red de seguridad', "git reflog registra a dónde apuntó HEAD en tu máquina, incluso después de un reset o un rebase. Si \"perdiste\" commits, casi siempre están ahí.\n\n```bash\ngit reflog\n# a1b2c3d HEAD@{2}: commit: Trabajo importante\ngit switch -c rescate a1b2c3d\n```\n\nEl reflog es local y vence con el tiempo (90 días por defecto).", 'Antes de dar algo por perdido, mirá git reflog.', '¿Dónde buscás un commit perdido tras un reset?', ['git reflog', 'git stash', 'git remote'], 0],
      [1, 'Hooks', "Los hooks son scripts que Git ejecuta en ciertos momentos: pre-commit (antes de commitear), commit-msg (para validar el mensaje), pre-push.\n\nSe usan para correr el linter, los tests rápidos o validar formatos. Herramientas como Husky o pre-commit los comparten con el equipo, porque la carpeta .git/hooks no se versiona.", 'Hooks automatizan chequeos; compartilos con una herramienta.', '¿Qué hook corre antes de crear un commit?', ['post-merge', 'pre-commit', 'pre-receive'], 1],
      [1, 'Flujos de equipo', "Trunk-based: ramas cortas que vuelven a main en horas o pocos días, con integración continua. Git Flow: ramas largas de develop, release y hotfix, útil con versiones planificadas.\n\nEn ambos, el pull request es el punto de revisión: cambios chicos, descripción clara, tests verdes y alguien más que lo mire antes de integrar.", 'Ramas cortas y PR chicos revisados.', '¿Qué caracteriza a trunk-based development?', ['Ramas que duran meses', 'Ramas cortas que vuelven seguido a main', 'No usar main'], 1],
    ],
    exam: [
      ['En un rebase interactivo, reword…', ['Borra el commit', 'Permite cambiar el mensaje', 'Une commits'], 1],
      ['Un commit traído con cherry-pick…', ['Tiene el mismo hash', 'Tiene otro hash', 'No tiene autor'], 1],
      ['git bisect usa…', ['Búsqueda lineal', 'Búsqueda binaria', 'Azar'], 1],
      ['El reflog…', ['Se sube al remoto', 'Es local de tu máquina', 'Es igual a git log'], 1],
      ['¿Por qué no se comparten los hooks solos?', ['Porque .git/hooks no se versiona', 'Porque son binarios', 'Porque Git los borra'], 0],
      ['Git Flow incluye ramas como…', ['develop, release y hotfix', 'solo main', 'trunk'], 0],
      ['Antes de abrir un PR conviene…', ['Mezclar muchos temas', 'Limpiar commits y explicar el cambio', 'Saltar los tests'], 1],
      ['Para automatizar bisect con un script…', ['git bisect run script.sh', 'git bisect auto', 'git run bisect'], 0],
    ],
  },
]
