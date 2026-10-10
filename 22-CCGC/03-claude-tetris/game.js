"use strict";

const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

const COLORS = [
	null,
	"#4dd0e1", // I - cyan
	"#ffd54f", // O - yellow
	"#ba68c8", // T - purple
	"#81c784", // S - green
	"#e57373", // Z - red
	"#7986cb", // J - indigo
	"#ffb74d" // L - orange
];

const PIECES = [
	null,
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	], // I
	[
		[2, 2],
		[2, 2]
	], // O
	[
		[0, 3, 0],
		[3, 3, 3],
		[0, 0, 0]
	], // T
	[
		[0, 4, 4],
		[4, 4, 0],
		[0, 0, 0]
	], // S
	[
		[5, 5, 0],
		[0, 5, 5],
		[0, 0, 0]
	], // Z
	[
		[6, 0, 0],
		[6, 6, 6],
		[0, 0, 0]
	], // J
	[
		[0, 0, 7],
		[7, 7, 7],
		[0, 0, 0]
	] // L
];

const LINE_SCORES = [0, 100, 300, 500, 800];

const POWER_UP_EVERY_LINES = 5;
const FREEZE_DURATION = 5000;
const NOTICE_DURATION = 1500;
const DESTROYED_BLOCK_SCORE = 10;

const POWER_UPS = {
	bomb: { color: "#ff7043", icon: "💣", label: "BOMBA" },
	lightning: { color: "#fbc02d", icon: "⚡", label: "RAYO" },
	tint: { color: "#ec407a", icon: "🎨", label: "TINTE" },
	gravity: { color: "#8d6e63", icon: "⬇️", label: "GRAVEDAD" },
	freeze: { color: "#29b6f6", icon: "❄️", label: "CONGELAR" }
};
const POWER_UP_KINDS = Object.keys(POWER_UPS);

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const nextCanvas = document.getElementById("next-canvas");
const nextCtx = nextCanvas.getContext("2d");
const scoreEl = document.getElementById("score");
const linesEl = document.getElementById("lines");
const levelEl = document.getElementById("level");
const powerUpEl = document.getElementById("power-up-progress");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayScore = document.getElementById("overlay-score");
const restartBtn = document.getElementById("restart-btn");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = document.getElementById("theme-toggle-label");

let gridColor;

let board,
	current,
	next,
	score,
	lines,
	level,
	paused,
	gameOver,
	lastTime,
	dropAccum,
	dropInterval,
	animId,
	pendingPowerUp,
	freezeRemaining,
	notice;

function createBoard() {
	return Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
}

function powerUpPiece() {
	const kind = POWER_UP_KINDS[Math.floor(Math.random() * POWER_UP_KINDS.length)];
	return {
		type: 0,
		powerUp: kind,
		shape: [[kind]],
		x: Math.floor(COLS / 2),
		y: 0
	};
}

function randomPiece() {
	if (pendingPowerUp) {
		pendingPowerUp = false;
		return powerUpPiece();
	}
	const type = Math.floor(Math.random() * 7) + 1;
	const shape = PIECES[type].map(row => [...row]);
	return {
		type,
		shape,
		x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
		y: 0
	};
}

function collide(shape, ox, oy) {
	for (let r = 0; r < shape.length; r++) {
		for (let c = 0; c < shape[r].length; c++) {
			if (!shape[r][c]) continue;
			const nx = ox + c;
			const ny = oy + r;
			if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
			if (ny >= 0 && board[ny][nx]) return true;
		}
	}
	return false;
}

function rotateCW(shape) {
	const rows = shape.length,
		cols = shape[0].length;
	const result = Array.from({ length: cols }, () => new Array(rows).fill(0));
	for (let r = 0; r < rows; r++)
		for (let c = 0; c < cols; c++) result[c][rows - 1 - r] = shape[r][c];
	return result;
}

function tryRotate() {
	const rotated = rotateCW(current.shape);
	const kicks = [0, -1, 1, -2, 2];
	for (const kick of kicks) {
		if (!collide(rotated, current.x + kick, current.y)) {
			current.shape = rotated;
			current.x += kick;
			return;
		}
	}
}

function merge() {
	for (let r = 0; r < current.shape.length; r++)
		for (let c = 0; c < current.shape[r].length; c++)
			if (current.shape[r][c])
				board[current.y + r][current.x + c] = current.shape[r][c];
}

function clearLines() {
	let cleared = 0;
	for (let r = ROWS - 1; r >= 0; r--) {
		if (board[r].every(v => v !== 0)) {
			board.splice(r, 1);
			board.unshift(new Array(COLS).fill(0));
			cleared++;
			r++;
		}
	}
	if (cleared) {
		const powerUpsBefore = Math.floor(lines / POWER_UP_EVERY_LINES);
		lines += cleared;
		if (Math.floor(lines / POWER_UP_EVERY_LINES) > powerUpsBefore) {
			pendingPowerUp = true;
		}
		score += (LINE_SCORES[cleared] || 0) * level;
		level = Math.floor(lines / 10) + 1;
		dropInterval = Math.max(100, 1000 - (level - 1) * 90);
		updateHUD();
	}
}

function ghostY() {
	let gy = current.y;
	while (!collide(current.shape, current.x, gy + 1)) gy++;
	return gy;
}

function hardDrop() {
	const gy = ghostY();
	score += (gy - current.y) * 2;
	current.y = gy;
	lockPiece();
}

function softDrop() {
	if (!collide(current.shape, current.x, current.y + 1)) {
		current.y++;
		score += 1;
		updateHUD();
	} else {
		lockPiece();
	}
}

function impactRow(y) {
	return Math.min(y + 1, ROWS - 1);
}

function destroyBlocks(shouldDestroy) {
	let destroyed = 0;
	for (let r = 0; r < ROWS; r++)
		for (let c = 0; c < COLS; c++)
			if (board[r][c] && shouldDestroy(r, c)) {
				board[r][c] = 0;
				destroyed++;
			}
	score += destroyed * DESTROYED_BLOCK_SCORE;
}

function mostCommonColor() {
	const counts = new Array(COLORS.length).fill(0);
	for (const value of board.flat()) if (value) counts[value]++;
	const highest = Math.max(...counts);
	return highest > 0 ? counts.indexOf(highest) : 0;
}

function compactColumns() {
	for (let c = 0; c < COLS; c++) {
		const stack = board.map(row => row[c]).filter(Boolean);
		for (let r = ROWS - 1, i = stack.length - 1; r >= 0; r--, i--)
			board[r][c] = i >= 0 ? stack[i] : 0;
	}
}

const POWER_UP_EFFECTS = {
	bomb(x, y) {
		const centerRow = impactRow(y);
		destroyBlocks(
			(r, c) => Math.abs(r - centerRow) <= 1 && Math.abs(c - x) <= 1
		);
	},
	lightning(x, y) {
		const row = impactRow(y);
		destroyBlocks((r, c) => r === row || c === x);
	},
	tint(x, y) {
		const target = board[impactRow(y)][x] || mostCommonColor();
		destroyBlocks((r, c) => board[r][c] === target);
	},
	gravity() {
		compactColumns();
	},
	freeze() {
		freezeRemaining = FREEZE_DURATION;
	}
};

function activatePowerUp(kind, x, y) {
	POWER_UP_EFFECTS[kind](x, y);
	notice = { text: POWER_UPS[kind].label, remaining: NOTICE_DURATION };
}

function lockPiece() {
	if (current.powerUp) activatePowerUp(current.powerUp, current.x, current.y);
	else merge();
	clearLines();
	spawn();
}

function spawn() {
	current = next;
	next = randomPiece();
	if (collide(current.shape, current.x, current.y)) {
		endGame();
	}
	drawNext();
}

function updateHUD() {
	scoreEl.textContent = score.toLocaleString();
	linesEl.textContent = lines;
	levelEl.textContent = level;
	powerUpEl.textContent = `${lines % POWER_UP_EVERY_LINES}/${POWER_UP_EVERY_LINES}`;
}

function drawPowerUpBlock(context, x, y, kind, size, alpha) {
	const { color, icon } = POWER_UPS[kind];
	context.globalAlpha = alpha ?? 1;
	context.fillStyle = color;
	context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
	context.strokeStyle = "#ffffff";
	context.lineWidth = 2;
	context.strokeRect(x * size + 2, y * size + 2, size - 4, size - 4);
	context.font = `${Math.floor(size * 0.6)}px sans-serif`;
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(icon, x * size + size / 2, y * size + size / 2 + 1);
	context.globalAlpha = 1;
}

function drawBlock(context, x, y, colorIndex, size, alpha) {
	if (!colorIndex) return;
	if (typeof colorIndex === "string") {
		drawPowerUpBlock(context, x, y, colorIndex, size, alpha);
		return;
	}
	const color = COLORS[colorIndex];
	context.globalAlpha = alpha ?? 1;
	context.fillStyle = color;
	context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
	// highlight
	context.fillStyle = "rgba(255,255,255,0.12)";
	context.fillRect(x * size + 1, y * size + 1, size - 2, 4);
	context.globalAlpha = 1;
}

function drawGrid() {
	ctx.strokeStyle = gridColor;
	ctx.lineWidth = 0.5;
	for (let c = 1; c < COLS; c++) {
		ctx.beginPath();
		ctx.moveTo(c * BLOCK, 0);
		ctx.lineTo(c * BLOCK, ROWS * BLOCK);
		ctx.stroke();
	}
	for (let r = 1; r < ROWS; r++) {
		ctx.beginPath();
		ctx.moveTo(0, r * BLOCK);
		ctx.lineTo(COLS * BLOCK, r * BLOCK);
		ctx.stroke();
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();

	// board
	for (let r = 0; r < ROWS; r++)
		for (let c = 0; c < COLS; c++) drawBlock(ctx, c, r, board[r][c], BLOCK);

	// ghost
	const gy = ghostY();
	for (let r = 0; r < current.shape.length; r++)
		for (let c = 0; c < current.shape[r].length; c++)
			if (current.shape[r][c])
				drawBlock(ctx, current.x + c, gy + r, current.shape[r][c], BLOCK, 0.2);

	// current piece
	for (let r = 0; r < current.shape.length; r++)
		for (let c = 0; c < current.shape[r].length; c++)
			drawBlock(ctx, current.x + c, current.y + r, current.shape[r][c], BLOCK);

	drawStatus();
}

function drawCenteredText(text, y) {
	ctx.font = "bold 22px 'Courier New', monospace";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.lineWidth = 4;
	ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
	ctx.strokeText(text, canvas.width / 2, y);
	ctx.fillStyle = "#ffffff";
	ctx.fillText(text, canvas.width / 2, y);
}

function drawStatus() {
	if (freezeRemaining > 0) {
		ctx.fillStyle = "rgba(41, 182, 246, 0.15)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		drawCenteredText(`❄️ ${Math.ceil(freezeRemaining / 1000)}s`, 24);
	}
	if (notice) drawCenteredText(notice.text, canvas.height / 3);
}

function drawNext() {
	const NB = 30;
	nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
	const shape = next.shape;
	const offX = Math.floor((4 - shape[0].length) / 2);
	const offY = Math.floor((4 - shape.length) / 2);
	for (let r = 0; r < shape.length; r++)
		for (let c = 0; c < shape[r].length; c++)
			drawBlock(nextCtx, offX + c, offY + r, shape[r][c], NB);
}

function endGame() {
	gameOver = true;
	cancelAnimationFrame(animId);
	overlayTitle.textContent = "GAME OVER";
	overlayScore.textContent = `Puntuación: ${score.toLocaleString()}`;
	overlay.classList.remove("hidden");
}

function togglePause() {
	if (gameOver) return;
	paused = !paused;
	if (!paused) {
		lastTime = performance.now();
		loop(lastTime);
	} else {
		cancelAnimationFrame(animId);
		overlayTitle.textContent = "PAUSA";
		overlayScore.textContent = "";
		overlay.classList.remove("hidden");
	}
}

function tickTimers(dt) {
	freezeRemaining = Math.max(0, freezeRemaining - dt);
	if (notice) {
		notice.remaining -= dt;
		if (notice.remaining <= 0) notice = null;
	}
}

function loop(ts) {
	const dt = ts - lastTime;
	lastTime = ts;
	tickTimers(dt);
	if (freezeRemaining === 0) dropAccum += dt;
	if (dropAccum >= dropInterval) {
		dropAccum = 0;
		if (!collide(current.shape, current.x, current.y + 1)) {
			current.y++;
		} else {
			lockPiece();
		}
	}
	draw();
	if (gameOver) return;
	animId = requestAnimationFrame(loop);
}

function init() {
	board = createBoard();
	score = 0;
	lines = 0;
	level = 1;
	paused = false;
	gameOver = false;
	dropInterval = 1000;
	dropAccum = 0;
	lastTime = performance.now();
	pendingPowerUp = false;
	freezeRemaining = 0;
	notice = null;
	next = randomPiece();
	spawn();
	updateHUD();
	overlay.classList.add("hidden");
	cancelAnimationFrame(animId);
	animId = requestAnimationFrame(loop);
}

document.addEventListener("keydown", e => {
	if (e.code === "KeyP") {
		togglePause();
		return;
	}
	if (paused || gameOver) return;
	switch (e.code) {
		case "ArrowLeft":
			if (!collide(current.shape, current.x - 1, current.y)) current.x--;
			break;
		case "ArrowRight":
			if (!collide(current.shape, current.x + 1, current.y)) current.x++;
			break;
		case "ArrowDown":
			softDrop();
			break;
		case "ArrowUp":
		case "KeyX":
			tryRotate();
			break;
		case "Space":
			e.preventDefault();
			hardDrop();
			break;
	}
	updateHUD();
});

restartBtn.addEventListener("click", init);

function applyTheme(theme) {
	const isLight = theme === "light";
	document.documentElement.dataset.theme = theme;
	themeToggle.setAttribute("aria-checked", String(isLight));
	themeToggleLabel.textContent = isLight ? "Claro" : "Oscuro";
	gridColor = getComputedStyle(document.documentElement)
		.getPropertyValue("--grid-line")
		.trim();
}

themeToggle.addEventListener("click", () => {
	const isLight = document.documentElement.dataset.theme === "light";
	applyTheme(isLight ? "dark" : "light");
	themeToggle.blur();
	draw();
});

applyTheme("dark");
init();
