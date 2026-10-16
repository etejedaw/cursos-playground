const CANVAS = { width: 480, height: 640 };
const MAX_DELTA_SECONDS = 1 / 30;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

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

let lastTimestamp = 0;

function update(dt) {}

function draw() {
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

function frame(timestamp) {
  const dt = Math.min((timestamp - lastTimestamp) / 1000, MAX_DELTA_SECONDS);
  lastTimestamp = timestamp;
  update(dt);
  draw();
  requestAnimationFrame(frame);
}

function startLoop() {
  lastTimestamp = performance.now();
  requestAnimationFrame(frame);
}

loadSpritesheet(startLoop);
