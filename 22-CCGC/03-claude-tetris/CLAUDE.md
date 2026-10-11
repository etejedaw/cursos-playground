# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Clon de **Tetris** en canvas HTML5 puro. Es un ejercicio del curso "Claude Code: Guía completa para desarrolladores de software" (Fernando Herrera), dentro del monorepo de cursos `cursos-playground`. Cada carpeta numerada es un ejercicio independiente; no compartas código con `02-asteroids` ni otros hermanos.

Sin dependencias, sin bundler, sin tests ni linter. El `package-lock.json` sin trackear está vacío (`"packages": {}`) y es un residuo de algún `npx`; no hay `package.json`. No introduzcas tooling salvo petición explícita.

## Correr

Abrir `index.html` en el navegador, o servir la carpeta:

```bash
npx serve .                  # http://localhost:3000
python3 -m http.server 8000  # alternativa
```

No hay paso de build: los cambios se ven recargando la página.

## Arquitectura

Tres archivos: `index.html` (canvas del tablero 300×600 con sus overlays dentro de `.board-wrap`, canvas `#next-canvas` 120×120, panel izquierdo con energía y `#queue-canvas`, HUD), `style.css` (tema oscuro) y `game.js` (todo el juego).

`game.js` es un único script en scope global con `'use strict'` — **no** es un módulo ES. Todo el estado son variables sueltas declaradas en una sola línea `let board, current, next, score, lines, level, paused, gameOver, lastTime, dropAccum, dropInterval, animId, pendingPowerUp, pendingSingle, freezeRemaining, notice, combo, backToBack, lastMoveWasRotation, flash, challenge, elapsed, garbageAccum, revealRemaining, energy, queue, abilityMenuOpen, slowRemaining, undoSnapshot, held, holdUsed, activeStartLevel;` y reinicializadas en `init()`. Una variable de estado nueva debe añadirse a ambos sitios.

**Modelo**: `board` es una matriz `ROWS × COLS` donde `0` es vacío y `1..12` es el tipo de pieza (`1..7` estándar, `8` +, `9` U, `10` Y, `11` single, `12` hueca). Las matrices de `PIECES` usan el propio índice de tipo como valor de celda (no `1`), así que `merge()` copia el valor tal cual y ese número es también el índice en `COLORS`. `PIECES` y `COLORS` están acoplados por índice con un `null` de relleno en la posición 0, y `randomPieceType()` elige el tipo desde `STANDARD_PIECE_TYPES` o, con probabilidad `EXTRA_PIECE_CHANCE`, desde `EXTRA_PIECE_TYPES`: añadir una pieza exige tocar `PIECES`, `COLORS` y la lista de tipos correspondiente. El single (`SINGLE_PIECE_TYPE`) no sale al azar: `clearLines()` activa `pendingSingle` tras limpiar 4 líneas y `randomPiece()` lo entrega en la siguiente pieza, con menor prioridad que `pendingPowerUp`.

**Pieza**: `{ type, shape, x, y }`. Rotar es `rotateCW` (transpuesta + reverso) y `tryRotate` prueba desplazamientos `[0, -1, 1, -2, 2]`; no es SRS. `rotateCCW` (tres `rotateCW`) solo se usa en el reto de rotación inversa. `collide(shape, ox, oy)` es la única comprobación de colisión y permite `ny < 0` (filas sobre el tablero no colisionan).

**Power-ups**: `advanceLineProgress()` activa `pendingPowerUp` cada `POWER_UP_EVERY_LINES` líneas y la siguiente llamada a `randomPiece()` devuelve `powerUpPiece()`: pieza 1×1 con `type: 0`, `powerUp: kind` y `shape: [[kind]]`, donde la celda es el nombre del power-up (string) en lugar de un índice de `COLORS`. Nunca se fusiona al tablero: `lockPiece()` llama a `activatePowerUp()` (tabla `POWER_UP_EFFECTS`) en vez de `merge()`. `drawBlock` delega en `drawPowerUpBlock` cuando la celda es un string. `freezeRemaining` y `notice` son temporizadores en ms que `tickTimers(dt)` descuenta en `loop`; mientras `freezeRemaining > 0` no se acumula `dropAccum`.

**Combos y puntuación**: `clearLines(tSpin)` hace todo el cálculo de una limpieza: `removeFullRows()`, combo (`combo` sube con cada bloqueo que limpia líneas y vuelve a 0 si no limpia), T-spin (`TSPIN_SCORES` en vez de `LINE_SCORES`), Back-to-Back (`backToBack`, ×1,5 entre Tetris/T-spin con líneas), Perfect Clear (`isBoardEmpty()`), avisos (`showNotice`), destello (`flash`) y sonido (`playTones`, Web Audio sin assets; `M` alterna `muted`). `modeKey`, `muted` y `audioContext` viven fuera del `let` de estado porque no se reinician en `init()`. `isTSpin()` se evalúa en `lockPiece()` antes de `merge()` y exige `lastMoveWasRotation`, que `tryRotate` activa y `tryMove` (única vía para mover izquierda/derecha/abajo, también en la gravedad) y `hardDrop` desactivan. `advanceLineProgress` concentra lo que antes hacía `clearLines`: líneas, nivel, `dropInterval` y los flags de power-up/single. `notice` es `{ lines, remaining }`.

**Retos**: `CHALLENGES` define los modos como datos (`goalLines`, `timeLimit`, `surviveTime`, `garbageEvery`, `prefilledRows`, `invisibleLocked`, `startLevel`, `reverseRotation`); `modeKey` elige uno y `init()` lo guarda en `challenge` (`classic` es el juego sin objetivo y no debe cambiar de comportamiento). `modeSelect` (opciones generadas desde `CHALLENGES`) llama a `init()` al cambiar. `loop` llama a `updateChallenge(dt)` antes de la gravedad: avanza `elapsed`, sube basura (`riseGarbage`, celdas `GARBAGE_CELL = 13`, que existe en `COLORS` pero no en `PIECES`) y termina el reto por tiempo; `lockPiece()` comprueba `reachedGoalLines()` y salta `spawn()` si se supera. `endGame(title, won)` sirve para derrota y victoria (clase `victory` en `#overlay-title`). En `invisibleLocked` el tablero solo se dibuja mientras `revealRemaining > 0` (se rearma en cada bloqueo). `level` parte de `baseLevel()` (`startLevel`) y `dropIntervalFor(level)` calcula la velocidad.

**Habilidades**: `energy` (0..`ENERGY_MAX`) sube `ENERGY_PER_LINE` por línea en `advanceLineProgress`. `ABILITIES` es un array de `{ label, description, cost, isAvailable, use }`; `use()` devuelve `false` si no pudo aplicarse (no se cobra). `E` llama a `openAbilityMenu()`, que cancela el `requestAnimationFrame` y muestra `#ability-menu`; mientras `abilityMenuOpen` el `keydown` solo delega en `handleAbilityMenuKey` (por eso `P` y `M` no actúan). `closeAbilityMenu()` reanuda como `togglePause`. `queue` son las piezas ya generadas *después* de `next` (las rellena «Ver 5 piezas»; `spawn()` las consume antes de llamar a `randomPiece()`), y `drawQueue` las pinta en `#queue-canvas`. `lockPiece()` guarda `undoSnapshot` antes de fusionar; `undoLastPlacement` lo restaura, devuelve la pieza a `current` y empuja `current`/`next` hacia delante en la secuencia; `riseGarbage` lo invalida. `slowRemaining` multiplica `dt` por `SLOW_FACTOR` al acumular `dropAccum`. `createPiece(type)` construye una pieza estándar y `freshCopy(piece)` recrea una igual en la posición de aparición.

**Hold**: `C`/`Shift` llaman a `holdPiece()`. `held` guarda una copia limpia (`freshCopy`, sin rotación ni posición) y `holdUsed` lo bloquea hasta que `spawn()` lo reinicia; con el slot vacío reservar equivale a un `spawn()`, y con el slot ocupado se intercambian `current` y `held` (si la pieza recuperada colisiona al aparecer, `endGame()`). `drawHold` pinta `#hold-canvas` con `drawPieceCentered` (compartido con `drawNext`) y le pone la clase `locked` mientras `holdUsed`. `undoLastPlacement` pone `holdUsed = false` pero no toca `held`. Los power-ups reservados conservan su tipo.

**Bucle**: `loop(ts)` acumula `dt` en milisegundos en `dropAccum` y baja una fila al superar `dropInterval`; no hay `update(dt)` separado ni física por `dt`. Cada frame redibuja todo con `draw()`; la vista previa (`drawNext`) solo se repinta en `spawn()`. `updateHUD()` escribe al DOM y se llama tras cada tecla y en `clearLines`/`softDrop`.

**Flujo de bloqueo**: `lockPiece()` → `merge()` → `clearLines()` → `spawn()`. `spawn()` mueve `next` a `current`, genera la nueva `next` y llama `endGame()` si la pieza ya colisiona al aparecer. `advanceLineProgress()` (llamada desde `clearLines()`) recalcula `level` (cada 10 líneas) y `dropInterval = max(100, 1000 − (level − 1) × 90)`.

**Pausa / fin**: no hay máquina de estados; son los booleanos `paused` y `gameOver`, y el bucle se detiene con `cancelAnimationFrame(animId)`. `P`/`Escape` llaman a `togglePause()` (no hace nada con `gameOver` ni con `abilityMenuOpen`), que abre o cierra `#pause-menu` (propio, con clase `hidden`); `#overlay` queda solo para GAME OVER/victoria y su botón Reiniciar llama `init()`. El menú de pausa tiene Reanudar, Reiniciar (`init()`), Ver controles (alterna `#pause-controls-list`) y un `<select>` de nivel inicial 1–10 que guarda `chosenStartLevel`, declarada fuera del `let` de estado como `modeKey` porque `init()` no la reinicia; `init()` la copia a `activeStartLevel` (en el `let` de estado) y `baseLevel()` devuelve `challenge.startLevel ?? activeStartLevel`, así que solo afecta a la siguiente partida (no a la que está en curso) y los retos con `startLevel` propio lo ignoran. Mientras `paused`, el `keydown` solo delega en `handlePauseMenuKey` (mismo patrón que el menú de habilidades): `Escape`/`P` reanudan siempre, el resto se ignora si el foco está en `INPUT`/`SELECT`/`TEXTAREA`, y las flechas no mueven la pieza. Al reanudar se oculta el menú y se resetea `lastTime` para evitar un salto de `dt`.

**Input**: un único `keydown` con `switch (e.code)`; cada pulsación es una acción (la repetición la da el autorepeat del SO). `KeyP`/`Escape` y `KeyM` se procesan antes del guard `paused || gameOver` (con `paused` el evento ya lo consumió `handlePauseMenuKey`), y `KeyE` (menú de habilidades) después. Las flechas hacen `preventDefault()` para que no cambien el `<select>` de modo si conserva el foco.

## Notas

- Si cambias `COLS`, `ROWS` o `BLOCK`, ajusta `width`/`height` de `<canvas id="board">` en `index.html`. La vista previa asume piezas de hasta 4×4 en un canvas de 120px (`NB = 30`).
- El README documenta mecánicas y la tabla de puntuación; mantenlo sincronizado si cambias controles, puntuación o velocidad.
- Textos de UI y documentación en español; identificadores en inglés.
