# Asteroids

Clon del clásico arcade **Asteroids** implementado en canvas HTML5 puro, sin dependencias ni bundler.

## Demo:

[Asteroids demo](https://klerith.github.io/claude-asteroids/)

## Descripción del juego

Nave espacial en un campo de asteroides con envolvimiento de bordes (el espacio es toroidal). Destruye asteroides para sumar puntos: los grandes se parten en medianos, los medianos en pequeños. Incluye power-ups especiales y tipos de asteroides únicos como la estrella fugaz...

## Tecnologías

- **HTML5 Canvas** — renderizado 2D
- **JavaScript (ES6+)** — lógica del juego en un solo archivo `game.js`
- Sin frameworks, sin bundler, sin dependencias

## Cómo correr

Abre `index.html` directamente en el navegador (doble clic), o usa un servidor local:

```bash
npx serve .
```

Luego visita `http://localhost:3000`.

## Controles

| Tecla     | Acción              |
| --------- | ------------------- |
| `←` `→`   | Rotar nave          |
| `↑`       | Propulsar           |
| `Espacio` | Disparar            |
| `B`       | Detonar bomba nova  |

## Puntuación

| Asteroide | Puntos |
| --------- | ------ |
| Grande    | 20     |
| Mediano   | 50     |
| Pequeño   | 100    |

## Power-ups

Al destruir un asteroide hay un 16% de probabilidad de que suelte un power-up. Aparecen como
figuras wireframe parpadeantes en el color de su efecto y desaparecen a los 12 segundos
(parpadean más rápido en los últimos 3). Se recogen pasando la nave por encima.

| Figura            | Power-up          | Efecto                                                        | Duración |
| ----------------- | ----------------- | ------------------------------------------------------------- | -------- |
| Hexágono cian     | Escudo temporal   | Absorbe un impacto: vaporiza el asteroide sin partirlo         | 5 s      |
| Triángulo ámbar   | Disparo triple    | Dispara 3 balas en abanico                                     | 10 s     |
| Rombo violeta     | Slow motion       | Los asteroides se mueven a la mitad de velocidad; la nave no   | 6 s      |
| Pentágono verde   | Hiperpropulsión   | Más aceleración y velocidad máxima (260→560 px/s², 340→500 px/s) | 8 s    |
| Estrella roja     | Bomba nova        | Destruye todos los asteroides en pantalla, sin fragmentos      | 1 uso    |

La bomba nova no se activa al recogerla: se guarda como carga (hasta 3) y se detona con `B`.
Los efectos activos se muestran abajo a la izquierda con una barra de tiempo restante.

Notas de diseño:

- El **disparo triple** solo cae de asteroides grandes; el resto puede caer de cualquier tamaño.
- Perder una vida cancela los efectos temporizados, pero conserva las cargas de nova.

## Características

- 3 vidas con invencibilidad temporal al reaparecer (parpadeo)
- Asteroides se parten en fragmentos más pequeños al ser destruidos
- Partículas de explosión al destruir asteroides
- 5 power-ups con retroalimentación visual (escudo orbital, llama verde en hiper,
  asteroides teñidos en cámara lenta, onda expansiva de la nova)
