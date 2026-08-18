# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Clon de **Asteroids** en canvas HTML5 puro. Es un ejercicio del curso "Claude Code: Guía completa para desarrolladores de software" (Fernando Herrera), dentro del monorepo de cursos `cursos-playground`. Cada carpeta numerada de la raíz es un curso independiente y sin relación entre sí.

Sin dependencias, sin bundler, sin package.json, sin tests ni linter. No introduzcas ninguno de ellos salvo petición explícita.

## Correr

Abrir `index.html` en el navegador, o servir la carpeta:

```bash
npx serve .   # http://localhost:3000
```

No hay paso de build: los cambios en `game.js` se ven recargando la página.

## Arquitectura

Tres archivos: `index.html` (canvas 800×600 + CSS inline + `<script src="game.js">`), `game.js` (todo el juego), `favicon.svg`.

`game.js` es un único script en scope global con `'use strict'` — **no** es un módulo ES, no hay `import`/`export`. Está organizado por secciones separadas con comentarios `// ── Nombre ───`; mantén ese estilo al agregar código.

**Bucle**: `loop(ts)` calcula `dt` en segundos con el timestamp de `requestAnimationFrame`, lo limita a 0.05 (evita saltos tras perder foco) y llama `update(dt)` → `draw()`. Toda la física es dependiente de `dt` (px/s, rad/s), nunca por frame: cualquier constante nueva de movimiento debe multiplicarse por `dt`.

**Entidades** (`Bullet`, `Asteroid`, `Ship`, `Particle`): clases con el mismo contrato — `update(dt)`, `draw()` y una bandera `dead`. `draw()` dibuja sobre el `ctx` global; las que rotan usan `ctx.save()/translate/rotate/restore` y dibujan en coordenadas locales centradas en el origen. Una entidad nueva debe seguir ese contrato para poder integrarse al bucle.

**Ciclo de vida**: nada se elimina durante la iteración. Las entidades se marcan `dead = true` y `update()` reconstruye los arrays con `.filter(e => !e.dead)`. Los asteroides hijos de `split()` se acumulan en `newAsteroids` y se concatenan después del bucle de colisiones, para no mutar el array que se está recorriendo.

**Power-ups**: la tabla `POWERUPS` (clave → `{label, sides, color, duration, weight, minSize}`) es la
única fuente de verdad; añadir un tipo es añadir una entrada y consumir su efecto donde toque. `sides`
dibuja el polígono wireframe (0 = estrella), `duration: 0` marca carga de un solo uso en vez de efecto
temporizado, `weight` es la rareza en el sorteo y `minSize` restringe de qué tamaño de asteroide puede
caer (el triple solo de los grandes). Los efectos activos viven en el objeto global `timers`, que
`update()` decrementa por `dt`; cada consumidor lee `timers.x > 0` directamente (`Ship.update` para
hiper, `Ship.tryShoot` para triple, el `astDt` del bucle para lento, la colisión nave-asteroide para
escudo). La nova es aparte: `novaCharges` + `detonateNova()`, disparada por `pressed('KeyB')`.

**Estado global**: variables sueltas `ship, bullets, asteroids, particles, powerups, timers,
novaCharges, novaFlash, score, lives, level, state, deadTimer`. `state` es `'playing' | 'dead' | 'gameover'` y `update()` hace early-return con lógica distinta por cada uno (en `'dead'` siguen moviéndose asteroides y partículas; en `'gameover'` solo partículas y se espera Espacio para `initGame()`).

**Input**: `keys` (mantenido) para acciones continuas — rotar, propulsar; `pressed(code)` (edge-triggered, se consume al leerlo) para acciones de un solo disparo — disparar, reiniciar. Elegir mal entre los dos es la causa típica de "se dispara en ráfaga" o "no responde".

**Espacio toroidal**: posiciones envueltas con `wrap(v, max)` usando el módulo positivo. El wrap es solo de posición: la detección de colisiones (`dist`) es euclidiana simple, así que dos objetos separados por el borde no colisionan aunque visualmente estén cerca.

**Tablas por tamaño**: `RADII`, `SPEEDS`, `POINTS` son arrays indexados por `size` (1=pequeño, 2=mediano, 3=grande) con un `0` de relleno en el índice 0. Al añadir un tamaño hay que extender las tres tablas a la vez.

**Progresión**: al vaciarse `asteroids`, `nextLevel()` sube `level` y genera `3 + level` asteroides grandes. `spawnAsteroids()` rechaza posiciones a menos de 130px del centro para no matar a la nave al reaparecer.

## Notas

- El README describe una "estrella fugaz" que **no** existe en `game.js`; es una feature pendiente del ejercicio, no código eliminado. Los power-ups ya están implementados.
- Comentarios y textos de UI en español; identificadores en inglés.
