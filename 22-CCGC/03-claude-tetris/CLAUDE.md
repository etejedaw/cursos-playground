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

Tres archivos: `index.html` (canvas del tablero 300×600, canvas `#next-canvas` 120×120, HUD y overlay), `style.css` (tema oscuro) y `game.js` (todo el juego).

`game.js` es un único script en scope global con `'use strict'` — **no** es un módulo ES. Todo el estado son variables sueltas declaradas en una sola línea `let board, current, next, score, lines, level, paused, gameOver, lastTime, dropAccum, dropInterval, animId, pendingPowerUp, pendingSingle, freezeRemaining, notice;` y reinicializadas en `init()`. Una variable de estado nueva debe añadirse a ambos sitios.

**Modelo**: `board` es una matriz `ROWS × COLS` donde `0` es vacío y `1..12` es el tipo de pieza (`1..7` estándar, `8` +, `9` U, `10` Y, `11` single, `12` hueca). Las matrices de `PIECES` usan el propio índice de tipo como valor de celda (no `1`), así que `merge()` copia el valor tal cual y ese número es también el índice en `COLORS`. `PIECES` y `COLORS` están acoplados por índice con un `null` de relleno en la posición 0, y `randomPieceType()` elige el tipo desde `STANDARD_PIECE_TYPES` o, con probabilidad `EXTRA_PIECE_CHANCE`, desde `EXTRA_PIECE_TYPES`: añadir una pieza exige tocar `PIECES`, `COLORS` y la lista de tipos correspondiente. El single (`SINGLE_PIECE_TYPE`) no sale al azar: `clearLines()` activa `pendingSingle` tras limpiar 4 líneas y `randomPiece()` lo entrega en la siguiente pieza, con menor prioridad que `pendingPowerUp`.

**Pieza**: `{ type, shape, x, y }`. Rotar es `rotateCW` (transpuesta + reverso) y `tryRotate` prueba desplazamientos `[0, -1, 1, -2, 2]`; no es SRS ni hay rotación antihoraria. `collide(shape, ox, oy)` es la única comprobación de colisión y permite `ny < 0` (filas sobre el tablero no colisionan).

**Power-ups**: `clearLines()` activa `pendingPowerUp` cada `POWER_UP_EVERY_LINES` líneas y la siguiente llamada a `randomPiece()` devuelve `powerUpPiece()`: pieza 1×1 con `type: 0`, `powerUp: kind` y `shape: [[kind]]`, donde la celda es el nombre del power-up (string) en lugar de un índice de `COLORS`. Nunca se fusiona al tablero: `lockPiece()` llama a `activatePowerUp()` (tabla `POWER_UP_EFFECTS`) en vez de `merge()`. `drawBlock` delega en `drawPowerUpBlock` cuando la celda es un string. `freezeRemaining` y `notice` son temporizadores en ms que `tickTimers(dt)` descuenta en `loop`; mientras `freezeRemaining > 0` no se acumula `dropAccum`.

**Bucle**: `loop(ts)` acumula `dt` en milisegundos en `dropAccum` y baja una fila al superar `dropInterval`; no hay `update(dt)` separado ni física por `dt`. Cada frame redibuja todo con `draw()`; la vista previa (`drawNext`) solo se repinta en `spawn()`. `updateHUD()` escribe al DOM y se llama tras cada tecla y en `clearLines`/`softDrop`.

**Flujo de bloqueo**: `lockPiece()` → `merge()` → `clearLines()` → `spawn()`. `spawn()` mueve `next` a `current`, genera la nueva `next` y llama `endGame()` si la pieza ya colisiona al aparecer. `clearLines()` recalcula `level` (cada 10 líneas) y `dropInterval = max(100, 1000 − (level − 1) × 90)`.

**Pausa / fin**: no hay máquina de estados; son los booleanos `paused` y `gameOver`, y el bucle se detiene con `cancelAnimationFrame(animId)`. El overlay (`#overlay` + clase `hidden`) se reutiliza para PAUSA y GAME OVER cambiando `#overlay-title`; el botón Reiniciar llama `init()`.

**Input**: un único `keydown` con `switch (e.code)`; cada pulsación es una acción (la repetición la da el autorepeat del SO). `KeyP` se procesa antes del guard `paused || gameOver`.

## Bugs conocidos en el código actual

- Reanudar la pausa no oculta el overlay: `togglePause()` en la rama `!paused` no hace `overlay.classList.add('hidden')`.

## Notas

- Si cambias `COLS`, `ROWS` o `BLOCK`, ajusta `width`/`height` de `<canvas id="board">` en `index.html`. La vista previa asume piezas de hasta 4×4 en un canvas de 120px (`NB = 30`).
- El README documenta mecánicas y la tabla de puntuación; mantenlo sincronizado si cambias controles, puntuación o velocidad.
- Textos de UI y documentación en español; identificadores en inglés.
