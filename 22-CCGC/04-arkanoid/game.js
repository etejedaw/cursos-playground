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

window.addEventListener('keydown', (event) => {
  setKey(event, true);
  if (event.code === 'Space' && !event.repeat) {
    handleActionKey();
    event.preventDefault();
  }
});
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

const LAUNCH_ANGLE_FROM_VERTICAL = Math.PI / 6;

function placeBallOnPaddle() {
  const { ball, paddle } = state;
  ball.x = paddle.x + (paddle.w - ball.size) / 2;
  ball.y = paddle.y - ball.size;
}

function launchBall() {
  const { ball } = state;
  ball.vx = ball.speed * Math.sin(LAUNCH_ANGLE_FROM_VERTICAL);
  ball.vy = -ball.speed * Math.cos(LAUNCH_ANGLE_FROM_VERTICAL);
}

function handleActionKey() {
  if (state.phase === 'start') {
    state.phase = 'ready';
    placeBallOnPaddle();
  } else if (state.phase === 'ready') {
    state.phase = 'playing';
    launchBall();
  }
}

function bounceBallOnPaddle(previousBottom) {
  const { ball, paddle } = state;
  const descending = ball.vy > 0;
  const crossedPaddleTop = previousBottom <= paddle.y && ball.y + ball.size >= paddle.y;
  const overlapsHorizontally = ball.x + ball.size > paddle.x && ball.x < paddle.x + paddle.w;
  if (descending && crossedPaddleTop && overlapsHorizontally) {
    ball.y = paddle.y - ball.size;
    ball.vy = -Math.abs(ball.vy);
  }
}

function loseLife() {
  state.lives = Math.max(0, state.lives - 1);
  state.phase = 'ready';
  state.ball.vx = 0;
  state.ball.vy = 0;
  placeBallOnPaddle();
}

function moveBall(dt) {
  const { ball } = state;
  const previousBottom = ball.y + ball.size;
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;

  if (ball.x < 0) {
    ball.x = 0;
    ball.vx = Math.abs(ball.vx);
  } else if (ball.x + ball.size > CANVAS.width) {
    ball.x = CANVAS.width - ball.size;
    ball.vx = -Math.abs(ball.vx);
  }

  if (ball.y < 0) {
    ball.y = 0;
    ball.vy = Math.abs(ball.vy);
  }

  bounceBallOnPaddle(previousBottom);

  if (ball.y > CANVAS.height) loseLife();
}

function update(dt) {
  movePaddle(dt);
  if (state.phase === 'ready') placeBallOnPaddle();
  if (state.phase === 'playing') moveBall(dt);
}

function drawPaddle() {
  const { paddle } = state;
  drawSprite(ctx, 'paddle', paddle.x, paddle.y, paddle.w, paddle.h);
}

function drawBall() {
  const { ball } = state;
  drawSprite(ctx, 'ball', ball.x, ball.y, ball.size, ball.size);
}

function draw() {
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  drawPaddle();
  if (state.phase === 'ready' || state.phase === 'playing') drawBall();
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
