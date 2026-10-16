# SPEC 01 — MVP jugable de Arkanoid

> **Status:** Aprobado
> **Depends on:** Ninguna
> **Date:** 2026-10-16
> **Objective:** Crear un Arkanoid jugable de un solo nivel con pala, bola, bloques, vidas, puntuación y explosiones, usando HTML + CSS + JS puro.

## Scope

**In:**

- `index.html`, `style.css` y `game.js` en la raíz de `04-arkanoid/`, con un `<canvas>` como único elemento de juego.
- Un único nivel fijo: 6 filas × 15 columnas de bloques, una fila por color.
- Control de la pala con teclado: `←` `→` o `A` `D`.
- Rebote especular simple de la bola contra paredes, pala y bloques.
- 3 vidas, puntuación (10 puntos por bloque) y HUD con ambas.
- Estados: inicio, listo (bola pegada a la pala), jugando, pausa, game over y victoria.
- Animación de explosión al romper un bloque.
- Reutilizar `assets/spritesheet.js` y `assets/spritesheet-breakout.png` sin modificarlos.

**Out of scope (for future specs):**

- Varios niveles o selector de nivel.
- Récord (high score) y cualquier persistencia entre sesiones.
- Control con ratón o táctil.
- Power-ups, bloques de varios golpes o bloques indestructibles.
- Ángulo de rebote según el punto de impacto en la pala.
- Sonido de cualquier tipo (efectos y música de fondo), aunque existan `ball-bounce.mp3` y `break-sound.mp3` en `assets/sounds/`.
- Menú de opciones.
- Tooling: `package.json`, bundler, tests o linter.

## Data model

```js
const CANVAS = { width: 480, height: 640 };

const state = {
  phase: 'start',
  lives: 3,
  score: 0,
  paddle: { x: 192, y: 600, w: 96, h: 14, speed: 420 },
  ball: { x: 0, y: 0, size: 12, vx: 0, vy: 0, speed: 360 },
  blocks: [],
  explosions: [],
  keys: { left: false, right: false },
};

const block = { x: 0, y: 0, w: 32, h: 16, color: 'red', alive: true };
const explosion = { x: 0, y: 0, color: 'red', startedAt: 0 };
```

Convenciones:

- Origen de coordenadas arriba a la izquierda; unidades en píxeles del canvas.
- Velocidades en píxeles por segundo, integradas con el delta time entre fotogramas.
- `phase` toma uno de estos valores: `'start'`, `'ready'`, `'playing'`, `'paused'`, `'gameover'`, `'won'`.
- Colores de fila, de arriba abajo: `red`, `yellow`, `cyan`, `magenta`, `hotpink`, `green`.
- Los bloques se dibujan a su tamaño nativo (32×16); la pala (sprite de 162×14) se escala a 96×14 y la bola (16×16) a 12×12.

## Implementation plan

1. Crear `index.html`, `style.css` y `game.js` con el canvas centrado de 480×640, cargar `assets/spritesheet.js` antes de `game.js` y arrancar el bucle desde el callback de `loadSpritesheet`. Prueba manual: la página muestra el canvas con fondo oscuro y sin errores en consola.
2. Dibujar la pala y manejar el teclado (`←` `→` `A` `D`) con límites en las paredes. Prueba manual: la pala se mueve con suavidad y no sale del canvas.
3. Añadir la bola pegada a la pala (fase `ready`), lanzarla con `Espacio` y moverla con rebote en paredes y techo. Prueba manual: la bola sale hacia arriba y rebota en tres bordes.
4. Rebote de la bola contra la pala y pérdida de vida al caer por el borde inferior, volviendo a `ready`. Prueba manual: la bola rebota en la pala y, si se deja caer, la bola vuelve a pegarse a la pala.
5. Generar la cuadrícula de bloques, dibujarla con `drawSprite` y resolver colisión bola-bloque (el bloque desaparece, la bola rebota sobre el eje de menor penetración). Prueba manual: cada bloque golpeado desaparece una sola vez por golpe.
6. Puntuación, vidas y HUD sobre el canvas. Prueba manual: cada bloque suma 10 puntos y el contador de vidas baja al fallar.
7. Máquina de estados completa: pantalla de inicio, pausa con `P` o `Esc`, game over al llegar a 0 vidas, victoria al romper todos los bloques y reinicio con `Espacio`. Prueba manual: se recorren todos los estados y el reinicio restaura vidas, puntuación y bloques.
8. Explosiones con `drawFrame` durante `EXPLOSION_DURATION` al romper un bloque. Prueba manual: cada bloque roto muestra su animación y esta desaparece sola.
9. Actualizar `README.md` y `CLAUDE.md` para reflejar que el juego existe, qué archivos lo componen y cómo se corre.

## Acceptance criteria

- [X] Abrir `index.html` (directamente o con `npx serve .`) carga el juego sin errores en la consola.
- [X] Al cargar se muestra la pantalla de inicio y `Espacio` pasa a la fase `ready`.
- [X] La pala responde a `←` `→` y a `A` `D` y nunca sale de los límites del canvas.
- [X] En `ready` la bola sigue a la pala y `Espacio` la lanza hacia arriba.
- [X] La bola rebota en paredes, techo y pala sin atravesarlos.
- [X] Hay 90 bloques (6 filas × 15 columnas) con los seis colores definidos en orden.
- [X] Romper un bloque lo elimina, suma exactamente 10 puntos y muestra una explosión de `EXPLOSION_DURATION` ms.
- [X] El juego no carga ni reproduce ningún archivo de audio.
- [X] Dejar caer la bola resta una vida y devuelve el juego a `ready`; con 0 vidas aparece game over.
- [X] Romper los 90 bloques muestra la pantalla de victoria con la puntuación final.
- [X] `P` o `Esc` pausa y reanuda; en pausa la bola y la pala no se mueven.
- [X] `Espacio` en game over o victoria reinicia con 3 vidas, 0 puntos y los 90 bloques.
- [X] La velocidad de la bola es la misma en un monitor de 60 Hz y de 144 Hz.
- [X] El repositorio no contiene `package.json`, bundler ni dependencias nuevas.

## Decisions

- **Sí:** tres archivos (`index.html`, `style.css`, `game.js`) en la raíz. Es la estructura mínima mantenible sin tooling.
- **No:** todo inline en `index.html`. Se descartó porque dificulta leer y modificar el juego.
- **Sí:** `game.js` como script clásico después de `spritesheet.js`. Los sprites exponen globales y no son un módulo ES.
- **Sí:** rebote especular simple. Es lo que se eligió para el MVP por simplicidad.
- **No:** ángulo según el punto de impacto en la pala. Hace la partida menos predecible, pero se deja para una spec futura.
- **Sí:** un único nivel fijo. Los niveles múltiples abren decisiones de diseño y datos que merecen su propia spec.
- **Sí:** solo teclado. Ratón y táctil ampliarían el alcance y los casos de prueba.
- **No:** persistencia del récord. Sin `localStorage` no hay que versionar claves ni tratar el modo privado.
- **Sí:** movimiento basado en delta time. Evita que la velocidad dependa de la frecuencia del monitor.
- **Sí:** canvas lógico de 480×640 (15 bloques de 32 px llenan el ancho exacto). El escalado visual se resuelve con CSS.
- **No:** sonido en el MVP. Se descarta por decisión del usuario; evita además el bloqueo de autoplay del navegador. Va en otra spec si se retoma.
- **Sí:** el bucle de juego arranca desde el callback de `loadSpritesheet`, porque `drawSprite` y `drawFrame` no hacen nada hasta que la hoja ha cargado.

## Risks

| Risk | Mitigation |
| --- | --- |
| El navegador bloquea la carga del spritesheet desde `file://` | Documentar `npx serve .` en el README y no mostrar el juego hasta que `loadSpritesheet` ejecute su callback |
| La bola atraviesa un bloque o la pala a velocidad alta (efecto túnel) | Limitar el desplazamiento por fotograma (delta time máximo de 1/30 s) y resolver colisiones tras cada movimiento |

## What is **not** in this spec

- Varios niveles.
- Récord y persistencia.
- Control con ratón o táctil.
- Power-ups y bloques especiales.
- Rebote con ángulo según el punto de impacto.
- Sonido (efectos y música de fondo) y opciones de configuración.

Cada uno de estos puntos, si se aborda, va en su propia spec.
