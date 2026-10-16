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

const KEY_BINDINGS = {
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
};

function setKey(event, pressed) {
  const direction = KEY_BINDINGS[event.code];
  if (!direction) return;
  state.keys[direction] = pressed;
  event.preventDefault();
}

window.addEventListener('keydown', (event) => setKey(event, true));
window.addEventListener('keyup', (event) => setKey(event, false));
window.addEventListener('blur', () => {
  state.keys.left = false;
  state.keys.right = false;
});

function movePaddle(dt) {
  const { paddle, keys } = state;
  const direction = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  paddle.x += direction * paddle.speed * dt;
  paddle.x = Math.max(0, Math.min(CANVAS.width - paddle.w, paddle.x));
}

function update(dt) {
  movePaddle(dt);
}

function drawPaddle() {
  const { paddle } = state;
  drawSprite(ctx, 'paddle', paddle.x, paddle.y, paddle.w, paddle.h);
}

function draw() {
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  drawPaddle();
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
