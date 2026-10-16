# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Clon de **Arkanoid** con HTML + CSS + JS puro y cero dependencias. Es un ejercicio del curso "Claude Code: Guía completa para desarrolladores de software" dentro del monorepo `cursos-playground`: cada carpeta numerada de `22-CCGC` es un ejercicio independiente, así que no compartas código con `02-asteroids`, `03-claude-tetris` ni otros hermanos.

**El juego todavía no está implementado.** Solo existen el `README.md` (una línea con el objetivo), los assets y las skills del flujo spec-driven. No hay `index.html`, `game.js` ni `style.css`; no hay `package.json`, bundler, tests ni linter, y no debes introducir tooling salvo petición explícita.

## Correr

Cuando exista `index.html`, ábrelo en el navegador o sirve la carpeta (necesario si el navegador bloquea la carga de assets desde `file://`):

```bash
npx serve .                  # http://localhost:3000
```

No hay paso de build: los cambios se ven recargando la página.

## Flujo spec-driven

El trabajo se organiza con dos skills de `Klerith/fernando-skills` (versionadas en `skills-lock.json`, fuente real en `.agents/skills/`, enlazadas con symlinks desde `.claude/skills/`):

- `/spec <descripción>` diseña una spec de forma guiada (hace preguntas, sin escribir código) y la guarda en `specs/NN-slug.md` con la estructura de `.agents/skills/spec/template.md`.
- `/spec-impl <NN-slug>` implementa una spec **solo si su estado significa "Aprobado"**, crea una rama git con el nombre de la spec y avanza paso a paso pausando para revisar diffs. `specs/.spec-config.yml` puede desactivar la creación de rama (`AutoCreateBranch`).

La carpeta `specs/` aún no existe. Si te piden implementar algo grande, el camino previsto es spec primero, código después.

`.claude/commands/SKILL.md` es la skill `alfred` (responder como el mayordomo de Batman); solo se activa si el usuario la invoca.

## Assets

- `assets/spritesheet-breakout.png` es la hoja de sprites única y `assets/spritesheet.js` es el único código existente. Es un script clásico (no módulo ES) que declara globales: `SPRITES` (`paddle`, `ball` y `blocks` por color: `gray`, `red`, `yellow`, `cyan`, `magenta`, `hotpink`, `green`), `EXPLOSION_FRAMES` (4 fotogramas de 32×16 por color; `gray` reutiliza los de `red`) y `EXPLOSION_DURATION` (150 ms).
- Para usarlo: `loadSpritesheet(cb)` carga la imagen en un canvas fuera de pantalla y ejecuta los callbacks cuando está lista (varias llamadas se encolan); `drawSprite(ctx, name, x, y, w, h)` acepta `'paddle'`, `'ball'` o `'block_<color>'`; `drawFrame(ctx, frame, x, y, w, h)` pinta un fotograma suelto (explosiones). Ambas funciones no hacen nada hasta que la hoja ha cargado, así que el bucle de juego debe arrancar desde el callback de `loadSpritesheet`. La ruta `assets/spritesheet-breakout.png` es relativa al HTML.
- `assets/sounds/` contiene `ball-bounce.mp3` y `break-sound.mp3`.

## Notas

- Textos de UI y documentación en español; identificadores en inglés.
