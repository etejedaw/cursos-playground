'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = 800;
const H = 600;

// ── Input ─────────────────────────────────────────────────────────────────────
const keys = {};
const justPressed = {};

window.addEventListener('keydown', e => {
  justPressed[e.code] = !keys[e.code];
  keys[e.code] = true;
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code))
    e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.code] = false; });

function pressed(code) {
  const val = justPressed[code];
  justPressed[code] = false;
  return val;
}

// ── Utils ─────────────────────────────────────────────────────────────────────
const wrap  = (v, max) => ((v % max) + max) % max;
const dist  = (a, b)   => Math.hypot(a.x - b.x, a.y - b.y);
const rand  = (min, max) => min + Math.random() * (max - min);
const randInt = (min, max) => Math.floor(rand(min, max + 1));

// ── Bullet ────────────────────────────────────────────────────────────────────
class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    const SPEED = 520;
    this.vx = Math.cos(angle) * SPEED;
    this.vy = Math.sin(angle) * SPEED;
    this.ttl  = 1.1;
    this.radius = 2;
    this.dead = false;
  }

  update(dt) {
    this.x = wrap(this.x + this.vx * dt, W);
    this.y = wrap(this.y + this.vy * dt, H);
    this.ttl -= dt;
    if (this.ttl <= 0) this.dead = true;
  }

  draw() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ── Asteroid ──────────────────────────────────────────────────────────────────
const RADII  = [0, 16, 30, 50];   // por tamaño 1, 2, 3
const SPEEDS = [0, 85, 55, 32];   // velocidad base por tamaño
const POINTS = [0, 100, 50, 20];  // puntos por tamaño

// Silueta clásica del arcade, en radio unitario (la magnitud máxima es 1).
// Tiene una muesca cóncava en el flanco derecho.
const SHAPE_CLASSIC = [
  [-0.114, -0.933],
  [ 0.437, -0.786],
  [ 0.316, -0.235],   // entrada de la muesca
  [ 0.853, -0.061],
  [ 0.691,  0.544],
  [ 0.235,  0.537],
  [ 0.020,  0.900],
  [-0.638,  0.584],
  [-0.960,  0.027],
  [-0.839, -0.544],
];

// Variantes de silueta para asteroides grandes; `null` = polígono irregular
// generado al vuelo (la variante original). Añadir siluetas aquí basta.
const BIG_SHAPES = [null, SHAPE_CLASSIC];

// Polígono irregular de 8..12 lados inscrito en `radius`.
function randomVerts(radius) {
  const n = randInt(8, 13);
  const verts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = radius * rand(0.6, 1.0);
    verts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  return verts;
}

class Asteroid {
  constructor(x, y, size = 3) {
    this.x    = x;
    this.y    = y;
    this.size = size;
    this.radius = RADII[size];
    this.dead = false;

    const angle = rand(0, Math.PI * 2);
    const speed = SPEEDS[size] + rand(-15, 15);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.rotSpeed = rand(-1.2, 1.2);
    this.rot = rand(0, Math.PI * 2);

    // Silueta: los grandes sortean entre las variantes; el resto, procedural
    const shape = size === 3 ? BIG_SHAPES[randInt(0, BIG_SHAPES.length - 1)] : null;
    this.verts = shape
      ? shape.map(([x, y]) => [x * this.radius, y * this.radius])
      : randomVerts(this.radius);
  }

  update(dt) {
    this.x   = wrap(this.x + this.vx * dt, W);
    this.y   = wrap(this.y + this.vy * dt, H);
    this.rot += this.rotSpeed * dt;
  }

  split() {
    if (this.size <= 1) return [];
    return [
      new Asteroid(this.x, this.y, this.size - 1),
      new Asteroid(this.x, this.y, this.size - 1),
    ];
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    // Tinte violeta mientras la cámara lenta está activa
    ctx.strokeStyle = timers.slow > 0 ? POWERUPS.slow.color : '#fff';
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';
    ctx.beginPath();
    ctx.moveTo(this.verts[0][0], this.verts[0][1]);
    for (let i = 1; i < this.verts.length; i++)
      ctx.lineTo(this.verts[i][0], this.verts[i][1]);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

// ── Ship ──────────────────────────────────────────────────────────────────────
class Ship {
  constructor() { this.reset(); }

  reset() {
    this.x      = W / 2;
    this.y      = H / 2;
    this.angle  = -Math.PI / 2;
    this.vx     = 0;
    this.vy     = 0;
    this.radius = 12;
    this.thrusting     = false;
    this.invincible    = 3;
    this.shootCooldown = 0;
    this.dead          = false;
  }

  update(dt) {
    if (this.dead) return;
    if (this.invincible    > 0) this.invincible    -= dt;
    if (this.shootCooldown > 0) this.shootCooldown -= dt;

    const hyper = timers.hyper > 0;
    const ROT       = 3.5;                  // rad/s
    const THRUST    = hyper ? 560 : 260;    // px/s²
    const MAX_SPEED = hyper ? 500 : 340;    // px/s
    const DRAG      = 0.987;

    if (keys['ArrowLeft'])  this.angle -= ROT * dt;
    if (keys['ArrowRight']) this.angle += ROT * dt;

    this.thrusting = !!keys['ArrowUp'];
    if (this.thrusting) {
      this.vx += Math.cos(this.angle) * THRUST * dt;
      this.vy += Math.sin(this.angle) * THRUST * dt;
    }

    this.vx *= DRAG;
    this.vy *= DRAG;

    const speed = Math.hypot(this.vx, this.vy);
    if (speed > MAX_SPEED) {
      this.vx = (this.vx / speed) * MAX_SPEED;
      this.vy = (this.vy / speed) * MAX_SPEED;
    }

    this.x = wrap(this.x + this.vx * dt, W);
    this.y = wrap(this.y + this.vy * dt, H);
  }

  tryShoot() {
    if (this.shootCooldown > 0 || this.dead) return [];
    this.shootCooldown = 0.2;
    const NOSE = 21;
    const ox = this.x + Math.cos(this.angle) * NOSE;
    const oy = this.y + Math.sin(this.angle) * NOSE;
    // Disparo triple: abanico de ±0.22 rad alrededor del eje de la nave
    const spread = timers.triple > 0 ? [-0.22, 0, 0.22] : [0];
    return spread.map(off => new Bullet(ox, oy, this.angle + off));
  }

  drawShield() {
    // Se debilita visualmente en el último segundo y medio
    const t = timers.shield;
    if (t <= 0) return;
    if (t < 1.5 && Math.floor(t * 8) % 2 === 0) return;

    const r = this.radius + 12 + Math.sin(performance.now() / 90) * 1.5;
    ctx.strokeStyle = 'rgba(61, 242, 255, 0.85)';
    ctx.lineWidth   = 1.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  draw() {
    if (this.dead) return;
    this.drawShield();
    // Parpadeo durante invencibilidad de reaparición
    if (this.invincible > 0 && Math.floor(this.invincible * 8) % 2 === 0) return;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';

    // Silueta clásica: triángulo con muesca trasera
    ctx.beginPath();
    ctx.moveTo( 20,  0);   // nariz
    ctx.lineTo(-12, -9);   // ala izquierda
    ctx.lineTo( -7,  0);   // muesca trasera
    ctx.lineTo(-12,  9);   // ala derecha
    ctx.closePath();
    ctx.stroke();

    // Llama del propulsor (más larga y verde con hiperpropulsión)
    if (this.thrusting && Math.random() > 0.35) {
      const hyper = timers.hyper > 0;
      ctx.beginPath();
      ctx.moveTo(-8, hyper ? -6 : -4);
      ctx.lineTo(-8 - (hyper ? rand(14, 28) : rand(6, 14)), 0);
      ctx.lineTo(-8, hyper ?  6 :  4);
      ctx.strokeStyle = hyper ? 'rgba(77, 255, 136, 0.9)' : 'rgba(255, 130, 0, 0.85)';
      ctx.stroke();
    }

    ctx.restore();
  }
}

// ── Partículas (explosión) ────────────────────────────────────────────────────
class Particle {
  constructor(x, y) {
    this.x  = x;
    this.y  = y;
    const angle = rand(0, Math.PI * 2);
    const speed = rand(30, 130);
    this.vx   = Math.cos(angle) * speed;
    this.vy   = Math.sin(angle) * speed;
    this.life = rand(0.4, 1.1);
    this.ttl  = this.life;
    this.dead = false;
  }

  update(dt) {
    this.x  += this.vx * dt;
    this.y  += this.vy * dt;
    this.ttl -= dt;
    if (this.ttl <= 0) this.dead = true;
  }

  draw() {
    const alpha = this.ttl / this.life;
    ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 0.05, this.y - this.vy * 0.05);
    ctx.stroke();
  }
}

// ── Power-ups ─────────────────────────────────────────────────────────────────
// Tabla de tipos. `sides` = lados del polígono wireframe (0 = estrella),
// `duration` = segundos de efecto (0 = carga de un solo uso, no temporizada),
// `weight` = peso en el sorteo de la caída (mayor = más común),
// `minSize` = tamaño mínimo de asteroide que puede soltarlo (ausente = cualquiera).
const POWERUPS = {
  shield: { label: 'ESCUDO',   sides: 6, color: '#3df2ff', duration: 5,  weight: 26 },
  triple: { label: 'TRIPLE',   sides: 3, color: '#ffd23d', duration: 10, weight: 26, minSize: 3 },
  slow:   { label: 'LENTO',    sides: 4, color: '#b76dff', duration: 6,  weight: 22 },
  hyper:  { label: 'HIPER',    sides: 5, color: '#4dff88', duration: 8,  weight: 18 },
  nova:   { label: 'NOVA [B]', sides: 0, color: '#ff4d4d', duration: 0,  weight: 8  },
};
const POWERUP_KEYS  = Object.keys(POWERUPS);
const DROP_CHANCE   = 0.16;   // probabilidad de caída al destruir un asteroide
const POWERUP_TTL   = 12;     // segundos en pantalla antes de desvanecerse

// Sorteo ponderado entre los tipos que ese tamaño de asteroide puede soltar.
function randomPowerUpType(size) {
  const pool  = POWERUP_KEYS.filter(k => size >= (POWERUPS[k].minSize || 0));
  const total = pool.reduce((sum, k) => sum + POWERUPS[k].weight, 0);
  let r = rand(0, total);
  for (const k of pool) {
    r -= POWERUPS[k].weight;
    if (r <= 0) return k;
  }
  return pool[pool.length - 1];
}

// Polígono / estrella regular centrados en el origen (usan el `ctx` actual).
function strokePolygon(r, n) {
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
}

function strokeStar(outer, inner, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i / (points * 2)) * Math.PI * 2;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
}

class PowerUp {
  constructor(x, y, type) {
    this.x    = x;
    this.y    = y;
    this.type = type;
    this.def  = POWERUPS[type];
    this.radius = 13;

    const angle = rand(0, Math.PI * 2);
    const speed = rand(10, 32);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.rot   = 0;
    this.pulse = rand(0, Math.PI * 2);
    this.ttl   = POWERUP_TTL;
    this.dead  = false;
  }

  update(dt) {
    this.x = wrap(this.x + this.vx * dt, W);
    this.y = wrap(this.y + this.vy * dt, H);
    this.rot   += 1.1 * dt;
    this.pulse += dt;
    this.ttl   -= dt;
    if (this.ttl <= 0) this.dead = true;
  }

  draw() {
    // Parpadeo de aviso en los últimos 3 s de vida
    if (this.ttl < 3 && Math.floor(this.ttl * 8) % 2 === 0) return;

    const scale = 0.85 + Math.sin(this.pulse * 6) * 0.15;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.scale(scale, scale);
    ctx.strokeStyle = this.def.color;
    ctx.lineWidth   = 1.6;
    ctx.lineJoin    = 'round';
    if (this.def.sides === 0) {
      strokeStar(this.radius, this.radius * 0.45, 5);
    } else {
      strokePolygon(this.radius, this.def.sides);
      strokePolygon(this.radius * 0.42, this.def.sides);
    }
    ctx.restore();
  }
}

// ── Estado del juego ──────────────────────────────────────────────────────────
let ship, bullets, asteroids, particles, powerups;
let timers, novaCharges, novaFlash;
let score, lives, level;
let state;      // 'playing' | 'dead' | 'gameover'
let deadTimer;

function spawnAsteroids(count) {
  const SAFE_DIST = 130;
  for (let i = 0; i < count; i++) {
    let x, y;
    do {
      x = rand(0, W);
      y = rand(0, H);
    } while (Math.hypot(x - W / 2, y - H / 2) < SAFE_DIST);
    asteroids.push(new Asteroid(x, y, 3));
  }
}

// Solo los efectos temporizados; las cargas de nova se conservan.
function clearTimers() {
  timers = { shield: 0, triple: 0, slow: 0, hyper: 0 };
}

function initGame() {
  ship          = new Ship();
  bullets   = [];
  asteroids = [];
  particles = [];
  powerups  = [];
  clearTimers();
  novaCharges = 0;
  novaFlash   = 0;
  score  = 0;
  lives  = 3;
  level  = 1;
  state  = 'playing';
  spawnAsteroids(4);
}

function nextLevel() {
  level++;
  bullets   = [];
  particles = [];
  powerups  = [];
  ship.reset();
  spawnAsteroids(3 + level);
}

function explode(x, y, count = 8) {
  for (let i = 0; i < count; i++) particles.push(new Particle(x, y));
}

function maybeDropPowerUp(x, y, size) {
  if (Math.random() < DROP_CHANCE)
    powerups.push(new PowerUp(x, y, randomPowerUpType(size)));
}

function collectPowerUp(p) {
  if (p.type === 'nova') novaCharges = Math.min(novaCharges + 1, 3);
  else timers[p.type] = POWERUPS[p.type].duration;
  p.dead = true;
}

// Bomba nova: vaporiza todo lo que haya en pantalla, sin partirlo en fragmentos.
function detonateNova() {
  novaCharges--;
  novaFlash = 0.45;
  for (const a of asteroids) {
    score += POINTS[a.size];
    explode(a.x, a.y, a.size * 6);
    a.dead = true;
  }
  asteroids = asteroids.filter(a => !a.dead);
}

function killShip() {
  explode(ship.x, ship.y, 14);
  ship.dead = true;
  clearTimers();
  lives--;
  if (lives <= 0) {
    state = 'gameover';
  } else {
    state     = 'dead';
    deadTimer = 2;
  }
}

// ── Update ────────────────────────────────────────────────────────────────────
function update(dt) {
  if (novaFlash > 0) novaFlash -= dt;

  if (state === 'gameover') {
    if (pressed('Space')) initGame();
    particles.forEach(p => p.update(dt));
    particles = particles.filter(p => !p.dead);
    return;
  }

  if (state === 'dead') {
    deadTimer -= dt;
    particles.forEach(p => p.update(dt));
    particles = particles.filter(p => !p.dead);
    asteroids.forEach(a => a.update(dt));
    powerups.forEach(p => p.update(dt));
    powerups = powerups.filter(p => !p.dead);
    if (deadTimer <= 0) { state = 'playing'; ship.reset(); }
    return;
  }

  // Temporizadores de power-ups
  for (const k of POWERUP_KEYS)
    if (timers[k] > 0) timers[k] = Math.max(0, timers[k] - dt);

  // Disparar
  if (pressed('Space')) {
    bullets.push(...ship.tryShoot());
  }

  // Bomba nova (carga guardada, se detona a voluntad)
  if (pressed('KeyB') && novaCharges > 0 && asteroids.length > 0) detonateNova();

  // Cámara lenta: solo los asteroides avanzan a la mitad de ritmo
  const astDt = timers.slow > 0 ? dt * 0.5 : dt;

  ship.update(dt);
  bullets.forEach(b => b.update(dt));
  asteroids.forEach(a => a.update(astDt));
  particles.forEach(p => p.update(dt));
  powerups.forEach(p => p.update(dt));

  bullets   = bullets.filter(b => !b.dead);
  particles = particles.filter(p => !p.dead);

  // Bala vs asteroide
  const newAsteroids = [];
  for (const b of bullets) {
    for (const a of asteroids) {
      if (!a.dead && !b.dead && dist(b, a) < a.radius) {
        b.dead = true;
        a.dead = true;
        score += POINTS[a.size];
        explode(a.x, a.y, a.size * 5);
        maybeDropPowerUp(a.x, a.y, a.size);
        newAsteroids.push(...a.split());
      }
    }
  }
  asteroids = asteroids.filter(a => !a.dead).concat(newAsteroids);
  bullets   = bullets.filter(b => !b.dead);

  // Nave vs power-up
  for (const p of powerups)
    if (!p.dead && !ship.dead && dist(ship, p) < ship.radius + p.radius)
      collectPowerUp(p);
  powerups = powerups.filter(p => !p.dead);

  // Nave vs asteroide
  if (ship.invincible <= 0) {
    for (const a of asteroids) {
      if (dist(ship, a) < ship.radius + a.radius * 0.82) {
        if (timers.shield > 0) {
          // El escudo absorbe el impacto: vaporiza el asteroide sin partirlo
          timers.shield  = 0;
          ship.invincible = 1.5;   // margen para salir de la zona
          a.dead = true;
          score += POINTS[a.size];
          explode(a.x, a.y, a.size * 6);
        } else {
          killShip();
        }
        break;
      }
    }
    asteroids = asteroids.filter(a => !a.dead);
  }

  // Nivel completado
  if (asteroids.length === 0) nextLevel();
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function drawLifeIcon(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth   = 1.2;
  ctx.lineJoin    = 'round';
  ctx.beginPath();
  ctx.moveTo( 9,  0);
  ctx.lineTo(-6, -5);
  ctx.lineTo(-3,  0);
  ctx.lineTo(-6,  5);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawHUD() {
  ctx.fillStyle = '#fff';
  ctx.font = '15px monospace';

  ctx.textAlign = 'left';
  ctx.fillText(`SCORE  ${score}`, 14, 26);

  ctx.textAlign = 'center';
  ctx.fillText(`NIVEL ${level}`, W / 2, 26);

  for (let i = 0; i < lives; i++)
    drawLifeIcon(W - 16 - i * 22, 18);

  drawPowerHUD();
}

// Pila de efectos activos abajo a la izquierda: etiqueta + barra de tiempo.
function drawPowerHUD() {
  ctx.textAlign = 'left';
  ctx.font      = '12px monospace';

  let y = H - 16;

  if (novaCharges > 0) {
    ctx.fillStyle = POWERUPS.nova.color;
    ctx.fillText(`${POWERUPS.nova.label} ×${novaCharges}`, 14, y);
    y -= 22;
  }

  for (const k of POWERUP_KEYS) {
    const def = POWERUPS[k];
    if (!def.duration || timers[k] <= 0) continue;

    ctx.fillStyle = def.color;
    ctx.fillText(`${def.label} ${timers[k].toFixed(1)}`, 14, y);

    const BAR_W = 96;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(14, y + 4, BAR_W, 3);
    ctx.globalAlpha = 1;
    ctx.fillRect(14, y + 4, BAR_W * (timers[k] / def.duration), 3);

    y -= 22;
  }
}

// Onda expansiva de la bomba nova.
function drawNovaFlash() {
  const t = novaFlash / 0.45;                 // 1 → 0
  const r = (1 - t) * Math.hypot(W, H) * 0.6;
  ctx.strokeStyle = `rgba(255, 77, 77, ${(t * 0.9).toFixed(2)})`;
  ctx.lineWidth   = 3;
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = `rgba(255, 255, 255, ${(t * 0.18).toFixed(2)})`;
  ctx.fillRect(0, 0, W, H);
}

function drawOverlay(title, sub) {
  ctx.textAlign   = 'center';
  ctx.fillStyle   = '#fff';
  ctx.font        = 'bold 46px monospace';
  ctx.fillText(title, W / 2, H / 2 - 18);
  ctx.font        = '18px monospace';
  ctx.fillStyle   = 'rgba(255,255,255,0.65)';
  ctx.fillText(sub, W / 2, H / 2 + 22);
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  particles.forEach(p => p.draw());
  asteroids.forEach(a => a.draw());
  powerups.forEach(p => p.draw());
  bullets.forEach(b => b.draw());
  ship.draw();

  if (novaFlash > 0) drawNovaFlash();

  drawHUD();

  if (state === 'gameover')
    drawOverlay('GAME OVER', `PUNTAJE: ${score}   —   ESPACIO PARA REINICIAR`);
}

// ── Loop principal ────────────────────────────────────────────────────────────
let lastTime = null;

function loop(ts) {
  const dt = lastTime === null ? 0 : Math.min((ts - lastTime) / 1000, 0.05);
  lastTime = ts;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

initGame();
requestAnimationFrame(loop);
