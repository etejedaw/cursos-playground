# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

No hay build, bundler, linter, ni tests. El proyecto es HTML + JS plano sin dependencias.

```bash
npx serve .     # servidor local en http://localhost:3000
```

También funciona abriendo `index.html` directamente en el navegador (`file://`), ya que `game.js` se carga como script clásico, no como módulo ES.

## Arquitectura

Todo el juego vive en `game.js` (~420 líneas), un único script clásico sin `import`/`export`. `index.html` solo aporta el `<canvas id="canvas">` de 800×600 y estilos mínimos. El archivo está dividido en secciones marcadas con separadores `// ── Nombre ──`; mantén ese formato al añadir código.

### Bucle y tiempo

`loop(ts)` en `requestAnimationFrame` calcula `dt` en **segundos** y lo capea a `0.05` para evitar saltos tras un cambio de pestaña. Toda la física está expresada en unidades por segundo (px/s, px/s², rad/s) y multiplicada por `dt`. Cualquier constante nueva de movimiento debe seguir esa convención, nunca px por frame.

### Entidades

`Bullet`, `Asteroid`, `Ship` y `Particle` son clases independientes con el mismo contrato informal: `update(dt)` y `draw()`, más una bandera `dead` que el bucle usa para filtrarlas. No hay clase base ni sistema de entidades; las nuevas entidades solo necesitan respetar ese contrato y añadirse a su propio array global.

Todo el dibujo usa el `ctx` global directamente y el estilo vectorial del arcade original: trazos blancos de 1.5px sobre fondo negro, `ctx.save()`/`translate`/`rotate`/`restore` por entidad.

Las tres constantes por tamaño de asteroide —`RADII`, `SPEEDS`, `POINTS`— son arrays indexados por `size` (1=pequeño, 2=mediano, 3=grande) con el índice 0 sin usar como relleno. Si añades un tamaño, hay que extender las tres a la vez.

### Envolvimiento toroidal

`wrap(v, max)` mantiene todo dentro de la pantalla. Se aplica a nave, balas y asteroides, pero **no** a las partículas (mueren antes de importar). El colisionador usa distancia euclídea simple sin considerar el wrap, así que objetos separados por un borde no colisionan; es una limitación conocida y aceptada.

### Estado y flujo

Estado global mutable en variables sueltas: `ship`, `bullets`, `asteroids`, `particles`, `score`, `lives`, `level`, `state`, `deadTimer`. La máquina de estados `state` tiene tres valores y `update(dt)` hace early-return por cada uno:

- `'playing'` — lógica completa
- `'dead'` — pausa de 2s (`deadTimer`); asteroides y partículas siguen animándose, la nave no
- `'gameover'` — solo partículas; `Espacio` llama a `initGame()`

`nextLevel()` se dispara cuando `asteroids.length === 0` y hace spawn de `3 + level` asteroides. `initGame()` es el único punto que resetea el score y las vidas.

### Entrada

`keys[code]` es estado continuo (rotación, propulsión). `pressed(code)` es detección de flanco y **consume** el valor al leerlo, por lo que solo debe llamarse una vez por frame y por tecla; se usa para disparar y reiniciar.

## Notas

`README.md` describe power-ups y una "estrella fugaz" que **no existen en el código** — es texto heredado del proyecto original enlazado en la demo. No lo tomes como especificación del estado actual.
