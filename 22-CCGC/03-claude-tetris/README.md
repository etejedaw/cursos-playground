# Tetris

Implementación del clásico **Tetris** en JavaScript vanilla, usando HTML5 Canvas y CSS. Sin dependencias externas, sin frameworks, sin proceso de build: solo abrir y jugar.

![Tech](https://img.shields.io/badge/HTML5-Canvas-orange)
![Tech](https://img.shields.io/badge/CSS3-blueviolet)
![Tech](https://img.shields.io/badge/JavaScript-Vanilla-yellow)

---

## Tabla de contenidos

- [Tetris](#tetris)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el juego](#cómo-ejecutar-el-juego)
    - [Opción 1: abrir el archivo directamente](#opción-1-abrir-el-archivo-directamente)
    - [Opción 2: servidor local (recomendado)](#opción-2-servidor-local-recomendado)
  - [Controles](#controles)
  - [Cómo funciona](#cómo-funciona)
    - [1. `index.html`](#1-indexhtml)
    - [2. `style.css`](#2-stylecss)
    - [3. `game.js`](#3-gamejs)
    - [Flujo del juego](#flujo-del-juego)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

Es una versión jugable del Tetris clásico con todas las mecánicas que esperarías:

- Tablero de **10 × 20** celdas.
- Las **7 piezas estándar** (I, O, T, S, Z, J, L) con colores diferenciados.
- **Piezas especiales**: con un 10 % de probabilidad por pieza aparece una pieza no estándar (`+`, `U`, `Y` de 5 bloques o un cuadrado 3×3 hueco de 8 bloques). Tras un **Tetris** (4 líneas a la vez) la siguiente pieza es un bloque suelto de 1×1 como recompensa.
- **Rotación** con _wall kicks_ básicos (pequeños desplazamientos para que la pieza pueda rotar pegada a la pared).
- **Soft drop** (bajada acelerada) y **hard drop** (caída instantánea).
- **Pieza fantasma** (_ghost piece_): muestra dónde aterrizará la pieza actual. Se puede ocultar desde el menú de pausa.
- **Vista previa** de la siguiente pieza.
- **Sistema de puntuación** clásico de Tetris (100 / 300 / 500 / 800 multiplicado por nivel) con combos, T-spin, Back-to-Back y Perfect Clear (ver abajo).
- **Niveles** que aumentan cada 10 líneas y aceleran la caída.
- **Menú de pausa** (`P` o `Esc`) con Reanudar, Reiniciar, lista de controles, selector de **nivel inicial** (1–10, se aplica a la próxima partida; los retos con nivel propio lo mantienen) e interruptores de **Sonido** y **Sombra de pieza** (se guardan en `localStorage`, claves `tetris.muted` y `tetris.ghost`). Al reanudar hay una **cuenta atrás 3-2-1** sobre el tablero durante la cual el juego sigue bloqueado; si pausas de nuevo durante la cuenta, se cancela y vuelves al menú. Al terminar la partida aparece **Game Over** con opción de reinicio.
- **Tema oscuro / claro**: arranca en oscuro y se cambia con el interruptor de la esquina superior derecha.
- **Skins visuales**: el selector de la esquina superior derecha, junto al interruptor de tema, cambia la apariencia de los bloques sin recargar. **Retro** (bloques cuadrados de colores planos, la de siempre), **Neón** (fondo negro y brillo con `shadowBlur`), **Pastel** (colores suaves y bordes redondeados) y **Pixel art** (textura de sub-píxeles claros y oscuros sobre cada bloque) y **Gameboy** (cuatro tonos de verde con relieve simple). Junto al selector hay una **previsualización** con las 7 piezas en la skin elegida, y la tecla `T` pasa a la siguiente skin. La elección se guarda en `localStorage` (clave `tetris.skin`) y convive con el tema claro / oscuro (Neón fuerza el fondo del tablero a negro).
- **Combos y bonus**: cada línea limpiada suma puntos extra según cómo la consigas. Al encadenar se muestra un aviso sobre el tablero, un destello y una nota que sube de tono con el combo.

| Bonus           | Cómo se consigue                                                                                       | Efecto                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Combo           | Limpiar líneas con piezas consecutivas (se rompe al colocar una pieza sin limpiar)                     | Puntos de la limpieza × número de combo (x2, x3, x4…)               |
| T-spin          | Bloquear una `T` justo después de rotarla con al menos 3 de las 4 esquinas de su caja ocupadas         | 400 / 800 / 1200 / 1600 × nivel para 0 / 1 / 2 / 3 líneas           |
| Back-to-Back    | Encadenar dos limpiezas "difíciles" (Tetris o T-spin con líneas) sin una limpieza normal en medio      | × 1,5 sobre la limpieza                                             |
| Perfect Clear   | Dejar el tablero completamente vacío tras limpiar líneas                                               | +2000 × nivel                                                       |

- **Modos de desafío**: el selector sobre el tablero cambia de modo (reinicia la partida) y muestra el objetivo con su progreso. Ganar muestra _¡RETO SUPERADO!_ con tu puntuación y tiempo.

| Modo             | Objetivo                                                                               | Particularidad                                                        |
| ---------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Clásico          | Ninguno                                                                                | El juego de siempre                                                   |
| Sprint           | Limpiar 40 líneas en 2 minutos                                                         | Si se agota el tiempo, pierdes                                        |
| Basura           | Sobrevivir 60 s                                                                        | Cada 10 s sube una fila de basura con un hueco; si empuja bloques fuera del tablero, pierdes |
| Bloques fijos    | Limpiar 15 líneas                                                                      | Empiezas con las 6 filas inferiores ya ocupadas (cada una con algún hueco) |
| Invisibles       | Limpiar 10 líneas                                                                      | Las piezas asentadas solo se ven 1 s tras cada bloqueo                |
| Rotación inversa | Limpiar 10 líneas                                                                      | Empiezas en el nivel 8 y `↑`/`X` giran en sentido antihorario         |

- **Hold (reservar pieza)**: `C` o `Shift` guardan la pieza actual en el panel `HOLD` (arriba a la izquierda) y sacan la siguiente. Si ya había una reservada, se intercambian y la recuperada aparece arriba. Solo se puede usar una vez por pieza: el slot se atenúa hasta que la pieza actual se asiente. Sirve para guardar la `I` esperando un Tetris o para evitar una mala pieza.
- **Habilidades**: cada línea limpiada carga 12 puntos de la barra de **energía** (panel izquierdo, máximo 100). Con energía suficiente, `E` abre un menú que pausa la partida; elige con `1`–`4` (o con el ratón) y `Esc`/`E` lo cierra sin gastar nada.

| Tecla | Habilidad       | Coste | Efecto                                                                                                   |
| ----- | --------------- | ----- | -------------------------------------------------------------------------------------------------------- |
| `1`   | Ver 5 piezas    | 30    | Muestra la siguiente y las 4 posteriores (panel `PRÓXIMAS`, que se vacía según se van usando)            |
| `2`   | Cambiar pieza   | 40    | Sustituye la pieza actual por otra estándar al azar, colocada arriba                                     |
| `3`   | Ralentizar      | 50    | La caída va al 40 % de velocidad durante 10 s                                                            |
| `4`   | Deshacer        | 60    | Revierte la última colocación (tablero, puntos, líneas, nivel y combo) y te devuelve esa pieza. Solo una vez, y no tras subir basura |

- **Tabla de records**: el panel derecho (`RECORDS`) muestra desde la carga el top 5 de puntuaciones, el mejor combo, las líneas máximas en una partida, el número de partidas jugadas, el tiempo total jugado y el **historial** de las últimas 10 partidas (fecha, puntuación, líneas y nivel). Se guardan en `localStorage` (clave `tetris.records`), así que persisten al recargar. Al terminar una partida (derrota o victoria, en cualquier modo) el overlay muestra la tabla; si tu puntuación entra en el top 5 aparece un campo para tu nombre (máximo 12 caracteres, `Enter` o el botón _Guardar_) y tu fila se resalta. Si no escribes nombre se guarda como _Anónimo_, y una puntuación de 0 nunca entra. El botón _Reiniciar records_ (pide confirmación) vacía la tabla, el historial y los contadores. _Exportar_ descarga todo como `tetris-records.json` e _Importar_ carga un archivo así, validándolo y descartando lo inválido; importar **reemplaza** los records actuales en lugar de fusionarlos. Solo cuentan las partidas terminadas (derrota o victoria), no las que abandonas con Reiniciar. Mientras el foco está en el campo de nombre (o en el selector de modo) las teclas del juego no actúan, así que puedes escribir `p` o `m` sin pausar ni silenciar.
- **Power-ups**: cada 5 líneas la siguiente pieza es un bloque especial de 1×1 (visible en `NEXT`) cuyo efecto se activa al aterrizar. Cada bloque destruido suma 10 puntos.

| Power-up     | Efecto                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------- |
| 💣 Bomba     | Destruye un área de 3×3 centrada en el bloque sobre el que aterriza                                 |
| ⚡ Rayo      | Destruye la fila donde aterriza y su columna completa                                               |
| 🎨 Tinte     | Destruye todos los bloques del color del bloque sobre el que aterriza (o del color más común si cae al suelo) |
| ⬇️ Gravedad  | Compacta cada columna eliminando huecos; las filas que se completen se limpian y puntúan            |
| ❄️ Congelar  | Detiene la caída automática 5 segundos (puedes seguir moviendo y soltando la pieza)                 |

---

## Cómo ejecutar el juego

No hay nada que instalar ni compilar. Tienes dos opciones:

### Opción 1: abrir el archivo directamente

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### Opción 2: servidor local (recomendado)

Cualquier servidor estático funciona. Algunos ejemplos:

```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8000
```

Después abre `http://localhost:8000` en el navegador.

---

## Controles

| Tecla     | Acción                            |
| --------- | --------------------------------- |
| `←` / `→` | Mover la pieza horizontalmente    |
| `↑` o `X` | Rotar la pieza en sentido horario |
| `↓`       | Soft drop (bajar más rápido)      |
| `Espacio` | Hard drop (caída instantánea)     |
| `P` / `Esc` | Pausar / reanudar (abre el menú de pausa) |
| `C` / `Shift` | Reservar pieza (hold)         |
| `E`       | Abrir el menú de habilidades      |
| `M`       | Silenciar / activar el sonido     |
| `T`       | Cambiar a la siguiente skin       |

---

## Cómo funciona

El juego se compone de tres archivos que cooperan:

### 1. `index.html`

Define la estructura visual:

- Un `<canvas id="board">` de **300 × 600** píxeles donde se renderiza el tablero.
- Un panel lateral con `SCORE`, `LINES`, `LEVEL`, vista de la siguiente pieza y la lista de controles.
- Un menú de pausa (`#pause-menu`, con interruptores de sonido y sombra de pieza), una cuenta atrás de reanudación (`#resume-countdown`) y un overlay para el estado **GAME OVER**; el overlay incluye la tabla de records y el formulario para el nombre.
- Un panel `#records` con el top 5, el mejor combo, las líneas máximas, el historial de partidas y los botones _Reiniciar records_, _Exportar_ e _Importar_.
- Un mini canvas `#skin-preview` junto al selector de skin.

### 2. `style.css`

Aporta el aspecto visual con estética _dark / retro arcade_: fondo oscuro, tipografía monoespaciada para los marcadores y _backdrop blur_ en los overlays.

### 3. `game.js`

Contiene toda la lógica del juego. A grandes rasgos:

- **Modelo del tablero**: una matriz `ROWS × COLS` donde cada celda guarda `0` (vacía) o un índice de color (1–7) que identifica la pieza.
- **Piezas**: definidas como matrices cuadradas. Para rotar se calcula la transposición + reverso de filas (`rotateCW`).
- **Detección de colisiones** (`collide`): comprueba que ninguna celda de la pieza salga del tablero ni se solape con bloques ya fijados.
- **Wall kicks** (`tryRotate`): si la rotación choca, intenta desplazar la pieza ±1 y ±2 columnas antes de descartar el giro.
- **Game loop** (`loop`): basado en `requestAnimationFrame`, acumula el tiempo transcurrido y baja la pieza una fila cuando se supera `dropInterval`.
- **Limpieza de líneas** (`clearLines`): recorre el tablero de abajo hacia arriba; cada fila completa se elimina y se inserta una vacía en la cima.
- **Puntuación**: usa la tabla clásica `[0, 100, 300, 500, 800]` multiplicada por el nivel actual; el hard drop suma 2 puntos por celda recorrida y el soft drop 1 punto por fila.
- **Nivel y velocidad**: el nivel sube cada 10 líneas; la velocidad de caída se calcula como `max(100, 1000 − (level − 1) × 90)` milisegundos.
- **Ghost piece** (`ghostY`): proyecta la posición final de la pieza actual hacia abajo y la dibuja con `globalAlpha = 0.2`.
- **Records** (`registerFinishedGame`): `endGame` los registra una sola vez por partida. La tabla vive en `localStorage["tetris.records"]` con la forma `{ top: [{ name, score }], bestCombo, maxLines, history: [{ date, score, lines, level }], gamesPlayed, totalSeconds }`, y todo lo que se lee o se importa pasa por `sanitizeRecords`; la lectura y la escritura van en `try/catch`, y si el JSON está corrupto o `localStorage` falla se arranca con una tabla vacía. El combo máximo de la partida se sigue en `maxCombo` (actualizado en `clearLines`).

### Flujo del juego

```
init()
  ├─ createBoard()                  → matriz vacía
  ├─ next = randomPiece()
  ├─ spawn()                        → mueve next a current y genera nueva next
  └─ requestAnimationFrame(loop)
        ↓
   loop(timestamp)
     ├─ acumula dt
     ├─ si dt ≥ dropInterval → baja la pieza o llama a lockPiece()
     ├─ draw()  (grid + tablero + ghost + pieza actual)
     └─ requestAnimationFrame(loop)

   keydown → mover / rotar / soft-drop / hard-drop / pausa
```

Cuando una pieza recién generada ya colisiona al aparecer (`spawn`), se dispara `endGame()` y se muestra el overlay de **Game Over**.

---

## Tecnologías

- **HTML5** — marcado y dos elementos `<canvas>` (tablero y vista previa).
- **CSS3** — _flexbox_, variables de color, `backdrop-filter` y `box-shadow`.
- **JavaScript (ES6+) vanilla** — `const`/`let`, _arrow functions_, _spread operator_, `Array.from`, _template literals_…
- **Canvas 2D API** — para todo el renderizado del juego.
- **`requestAnimationFrame`** — para el bucle de juego sincronizado con el navegador.

**Sin dependencias.** No hay `package.json`, ni bundler, ni transpilador.

---

## Estructura del proyecto

```
03-tetris/
├── index.html      # Estructura del DOM y canvas
├── style.css       # Estilos del juego (dark theme)
├── game.js         # Toda la lógica del Tetris (~300 líneas)
└── README.md
```

---

## Personalización

Algunos parámetros fáciles de tunear en `game.js`:

| Constante      | Significado                              | Por defecto           |
| -------------- | ---------------------------------------- | --------------------- |
| `COLS`         | Columnas del tablero                     | `10`                  |
| `ROWS`         | Filas del tablero                        | `20`                  |
| `BLOCK`        | Tamaño en píxeles de cada celda          | `30`                  |
| `COLORS`       | Paleta de la skin Retro por tipo de pieza | 14 entradas           |
| `SKINS`        | Skins: `label`, `colors` (14 entradas) y `drawCell` | `retro`, `neon`, `pastel`, `pixel`, `gameboy` |
| `LINE_SCORES`  | Puntos por 1, 2, 3 o 4 líneas eliminadas | `[0,100,300,500,800]` |
| `dropInterval` | Velocidad inicial de caída en ms         | `1000`                |

> Si cambias `COLS`, `ROWS` o `BLOCK`, recuerda ajustar también `width` y `height` del `<canvas id="board">` en `index.html` para que coincida (`COLS × BLOCK` × `ROWS × BLOCK`).

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica.
