# Juego de Arkanoid

Clon de Arkanoid con HTML + CSS + JS puro. Cero dependencias.

## Archivos

- `index.html`: página con el `<canvas>` de 480×640 y la carga de scripts.
- `style.css`: centrado y escalado del canvas.
- `game.js`: lógica del juego (estado, bucle, colisiones, HUD y pantallas).
- `assets/spritesheet.js` y `assets/spritesheet-breakout.png`: hoja de sprites y su cargador.

## Cómo correrlo

Abre `index.html` en el navegador o, si este bloquea la carga del spritesheet desde `file://`, sirve la carpeta:

```bash
npx serve .
```

Después abre http://localhost:3000.

## Controles

- `←` `→` o `A` `D`: mover la pala.
- `Espacio`: empezar, lanzar la bola y reiniciar tras game over o victoria.
- `P` o `Esc`: pausar y reanudar.

## Reglas

Un único nivel de 6 filas × 15 columnas. Tienes 3 vidas y cada bloque roto suma 10 puntos. Rompe los 90 bloques para ganar.
