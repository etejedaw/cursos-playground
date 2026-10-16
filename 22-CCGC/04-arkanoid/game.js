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

const BLOCK = { width: 32, height: 16, columns: 15, top: 64 };
const ROW_COLORS = ['red', 'yellow', 'cyan', 'magenta', 'hotpink', 'green'];

function createBlocks() {
  const blocks = [];
  ROW_COLORS.forEach((color, row) => {
    for (let column = 0; column < BLOCK.columns; column++) {
      blocks.push({
        x: column * BLOCK.width,
        y: BLOCK.top + row * BLOCK.height,
        w: BLOCK.width,
        h: BLOCK.height,
        color,
        alive: true,
      });
    }
  });
  return blocks;
}

state.blocks = createBlocks();

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

function overlapsBlock(ball, block) {
  return (
    ball.x < block.x + block.w &&
    ball.x + ball.size > block.x &&
    ball.y < block.y + block.h &&
    ball.y + ball.size > block.y
  );
}

function bounceBallOffBlock(ball, block) {
  const penetrationX = Math.min(ball.x + ball.size - block.x, block.x + block.w - ball.x);
  const penetrationY = Math.min(ball.y + ball.size - block.y, block.y + block.h - ball.y);
  const ballCenterX = ball.x + ball.size / 2;
  const ballCenterY = ball.y + ball.size / 2;
  const blockCenterX = block.x + block.w / 2;
  const blockCenterY = block.y + block.h / 2;

  if (penetrationX < penetrationY) {
    const direction = ballCenterX < blockCenterX ? -1 : 1;
    ball.x += direction * penetrationX;
    ball.vx = direction * Math.abs(ball.vx);
  } else {
    const direction = ballCenterY < blockCenterY ? -1 : 1;
    ball.y += direction * penetrationY;
    ball.vy = direction * Math.abs(ball.vy);
  }
}

function collideBallWithBlocks() {
  const { ball, blocks } = state;
  const hitBlock = blocks.find((block) => block.alive && overlapsBlock(ball, block));
  if (!hitBlock) return;
  hitBlock.alive = false;
  bounceBallOffBlock(ball, hitBlock);
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
  collideBallWithBlocks();

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

function drawBlocks() {
  state.blocks.forEach((block) => {
    if (!block.alive) return;
    drawSprite(ctx, `block_${block.color}`, block.x, block.y, block.w, block.h);
  });
}

function drawBall() {
  const { ball } = state;
  drawSprite(ctx, 'ball', ball.x, ball.y, ball.size, ball.size);
}

function draw() {
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  drawBlocks();
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
