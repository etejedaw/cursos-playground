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
	"#ffb74d", // L - orange
	"#aed581", // + - lime
	"#4db6ac", // U - teal
	"#f48fb1", // Y - pink
	"#90a4ae", // single - blue grey
	"#a1887f", // hollow - brown
	"#78788a" // garbage - grey
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
	], // L
	[
		[0, 8, 0],
		[8, 8, 8],
		[0, 8, 0]
	], // +
	[
		[9, 0, 9],
		[9, 9, 9],
		[0, 0, 0]
	], // U
	[
		[0, 0, 0, 0],
		[10, 10, 10, 10],
		[0, 10, 0, 0],
		[0, 0, 0, 0]
	], // Y
	[[11]], // single
	[
		[12, 12, 12],
		[12, 0, 12],
		[12, 12, 12]
	] // hollow
];

const STANDARD_PIECE_TYPES = [1, 2, 3, 4, 5, 6, 7];
const EXTRA_PIECE_TYPES = [8, 9, 10, 12];
const SINGLE_PIECE_TYPE = 11;
const EXTRA_PIECE_CHANCE = 0.1;
const GARBAGE_CELL = 13;
const TETRIS_LINES = 4;
const T_PIECE_TYPE = 3;

const LINE_SCORES = [0, 100, 300, 500, 800];
const TSPIN_SCORES = [400, 800, 1200, 1600];
const TSPIN_LABELS = [
	"T-SPIN",
	"T-SPIN SINGLE",
	"T-SPIN DOUBLE",
	"T-SPIN TRIPLE"
];
const BACK_TO_BACK_MULTIPLIER = 1.5;
const PERFECT_CLEAR_SCORE = 2000;
const FLASH_DURATION = 300;
const CLEAR_ROOT_FREQUENCY = 330;
const CLEAR_NOTE_STEP_MS = 70;
const MAX_COMBO_PITCH_STEPS = 12;
const PERFECT_CLEAR_TONES = [523, 659, 784, 1047, 1319];

const CHALLENGES = {
	classic: {
		label: "Clásico",
		description: "Sin objetivo: sobrevive y puntúa"
	},
	sprint: {
		label: "Sprint",
		description: "Limpia 40 líneas en 2 minutos",
		goalLines: 40,
		timeLimit: 120000
	},
	garbage: {
		label: "Basura",
		description: "Sobrevive 60 s con basura subiendo cada 10 s",
		surviveTime: 60000,
		garbageEvery: 10000
	},
	prefilled: {
		label: "Bloques fijos",
		description: "Limpia 15 líneas con el tablero ya ocupado",
		goalLines: 15,
		prefilledRows: 6
	},
	invisible: {
		label: "Invisibles",
		description: "Limpia 10 líneas: las piezas se ocultan al asentarse",
		goalLines: 10,
		invisibleLocked: true
	},
	reverse: {
		label: "Rotación inversa",
		description: "Limpia 10 líneas desde el nivel 8 con el giro invertido",
		goalLines: 10,
		startLevel: 8,
		reverseRotation: true
	}
};
const ENERGY_MAX = 100;
const ENERGY_PER_LINE = 12;
const LOOKAHEAD_COUNT = 5;
const SLOW_DURATION = 10000;
const SLOW_FACTOR = 0.4;
const QUEUE_BLOCK = 15;
const QUEUE_SLOT_BLOCKS = 4;

const PREFILL_FILL_CHANCE = 0.7;
const INVISIBLE_REVEAL_DURATION = 1000;

const POWER_UP_EVERY_LINES = 5;
const FREEZE_DURATION = 5000;
const NOTICE_DURATION = 1500;
const NOTICE_LINE_HEIGHT = 30;
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
const comboEl = document.getElementById("combo");
const holdCanvas = document.getElementById("hold-canvas");
const holdCtx = holdCanvas.getContext("2d");
const energyBar = document.getElementById("energy-bar");
const energyFill = document.getElementById("energy-fill");
const energyHint = document.getElementById("energy-hint");
const queueSection = document.getElementById("queue-section");
const queueCanvas = document.getElementById("queue-canvas");
const queueCtx = queueCanvas.getContext("2d");
const abilityMenu = document.getElementById("ability-menu");
const abilityList = document.getElementById("ability-list");
const modeSelect = document.getElementById("mode-select");
const objectiveTextEl = document.getElementById("objective-text");
const objectiveProgressEl = document.getElementById("objective-progress");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayScore = document.getElementById("overlay-score");
const restartBtn = document.getElementById("restart-btn");
const pauseMenu = document.getElementById("pause-menu");
const pauseResumeBtn = document.getElementById("pause-resume-btn");
const pauseRestartBtn = document.getElementById("pause-restart-btn");
const pauseControlsBtn = document.getElementById("pause-controls-btn");
const pauseControlsList = document.getElementById("pause-controls-list");
const pauseStartLevel = document.getElementById("pause-start-level");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = document.getElementById("theme-toggle-label");
const skinSelect = document.getElementById("skin-select");
const pauseSoundToggle = document.getElementById("pause-sound-toggle");
const pauseGhostToggle = document.getElementById("pause-ghost-toggle");
const resumeCountdown = document.getElementById("resume-countdown");
const resumeCountdownNumber = document.getElementById("resume-countdown-number");

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
	pendingSingle,
	freezeRemaining,
	notice,
	combo,
	backToBack,
	lastMoveWasRotation,
	flash,
	challenge,
	elapsed,
	garbageAccum,
	revealRemaining,
	energy,
	queue,
	abilityMenuOpen,
	slowRemaining,
	undoSnapshot,
	held,
	holdUsed,
	activeStartLevel,
	maxCombo;

let modeKey = "classic";
let chosenStartLevel = 1;
let muted = false;
let audioContext;

function createBoard() {
	return Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
}

function powerUpPiece(kind = pickRandom(POWER_UP_KINDS)) {
	return {
		type: 0,
		powerUp: kind,
		shape: [[kind]],
		x: Math.floor(COLS / 2),
		y: 0
	};
}

function pickRandom(items) {
	return items[Math.floor(Math.random() * items.length)];
}

function randomPieceType() {
	if (Math.random() < EXTRA_PIECE_CHANCE) return pickRandom(EXTRA_PIECE_TYPES);
	return pickRandom(STANDARD_PIECE_TYPES);
}

function createPiece(type) {
	const shape = PIECES[type].map(row => [...row]);
	return {
		type,
		shape,
		x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
		y: 0
	};
}

function freshCopy(piece) {
	return piece.powerUp ? powerUpPiece(piece.powerUp) : createPiece(piece.type);
}

function randomPiece() {
	if (pendingPowerUp) {
		pendingPowerUp = false;
		return powerUpPiece();
	}
	const type = pendingSingle ? SINGLE_PIECE_TYPE : randomPieceType();
	pendingSingle = false;
	return createPiece(type);
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

function rotateCCW(shape) {
	return rotateCW(rotateCW(rotateCW(shape)));
}

function tryRotate() {
	const rotate = challenge.reverseRotation ? rotateCCW : rotateCW;
	const rotated = rotate(current.shape);
	const kicks = [0, -1, 1, -2, 2];
	for (const kick of kicks) {
		if (!collide(rotated, current.x + kick, current.y)) {
			current.shape = rotated;
			current.x += kick;
			lastMoveWasRotation = true;
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

function tryMove(dx, dy) {
	if (collide(current.shape, current.x + dx, current.y + dy)) return false;
	current.x += dx;
	current.y += dy;
	lastMoveWasRotation = false;
	return true;
}

function isBlocked(x, y) {
	return x < 0 || x >= COLS || y >= ROWS || (y >= 0 && board[y][x] !== 0);
}

function isTSpin() {
	if (current.type !== T_PIECE_TYPE || !lastMoveWasRotation) return false;
	const centerX = current.x + 1;
	const centerY = current.y + 1;
	const blockedCorners = [
		[-1, -1],
		[1, -1],
		[-1, 1],
		[1, 1]
	].filter(([dx, dy]) => isBlocked(centerX + dx, centerY + dy));
	return blockedCorners.length >= 3;
}

function removeFullRows() {
	let cleared = 0;
	for (let r = ROWS - 1; r >= 0; r--) {
		if (board[r].every(v => v !== 0)) {
			board.splice(r, 1);
			board.unshift(new Array(COLS).fill(0));
			cleared++;
			r++;
		}
	}
	return cleared;
}

function isBoardEmpty() {
	return board.every(row => row.every(v => v === 0));
}

function baseLevel() {
	return challenge.startLevel ?? activeStartLevel;
}

function dropIntervalFor(forLevel) {
	return Math.max(100, 1000 - (forLevel - 1) * 90);
}

function advanceLineProgress(cleared) {
	const powerUpsBefore = Math.floor(lines / POWER_UP_EVERY_LINES);
	lines += cleared;
	if (Math.floor(lines / POWER_UP_EVERY_LINES) > powerUpsBefore) {
		pendingPowerUp = true;
	}
	if (cleared === TETRIS_LINES) pendingSingle = true;
	energy = Math.min(ENERGY_MAX, energy + cleared * ENERGY_PER_LINE);
	level = baseLevel() + Math.floor(lines / 10);
	dropInterval = dropIntervalFor(level);
}

function clearTones(cleared, isSpecial) {
	const pitchSteps = Math.min(combo, MAX_COMBO_PITCH_STEPS);
	const root = CLEAR_ROOT_FREQUENCY * 2 ** ((pitchSteps * 2) / 12);
	const noteCount = Math.max(1, Math.min(cleared, TETRIS_LINES));
	const tones = Array.from(
		{ length: noteCount },
		(_, i) => root * 2 ** ((i * 4) / 12)
	);
	if (isSpecial) tones.push(root * 2);
	return tones;
}

function clearLines(tSpin = false) {
	const cleared = removeFullRows();
	combo = cleared ? combo + 1 : 0;
	maxCombo = Math.max(maxCombo, combo);
	const isTetris = cleared === TETRIS_LINES;
	const isDifficult = cleared > 0 && (tSpin || isTetris);
	const messages = [];
	if (tSpin) messages.push(TSPIN_LABELS[cleared]);
	else if (isTetris) messages.push("TETRIS");

	const baseScores = tSpin ? TSPIN_SCORES : LINE_SCORES;
	let points = (baseScores[cleared] ?? 0) * level;
	if (isDifficult && backToBack) {
		points *= BACK_TO_BACK_MULTIPLIER;
		messages.push("BACK-TO-BACK");
	}
	if (cleared) backToBack = isDifficult;
	if (combo > 1) {
		points *= combo;
		messages.push(`COMBO x${combo}`);
	}
	const isPerfectClear = cleared > 0 && isBoardEmpty();
	if (isPerfectClear) {
		points += PERFECT_CLEAR_SCORE * level;
		messages.push("PERFECT CLEAR");
	}
	score += Math.round(points);

	if (cleared) {
		advanceLineProgress(cleared);
		flash = FLASH_DURATION;
	}
	if (messages.length) showNotice(...messages);
	if (isPerfectClear) playTones(PERFECT_CLEAR_TONES, CLEAR_NOTE_STEP_MS);
	else if (cleared || tSpin)
		playTones(clearTones(cleared, isDifficult || tSpin), CLEAR_NOTE_STEP_MS);
	updateHUD();
}

function ghostY() {
	let gy = current.y;
	while (!collide(current.shape, current.x, gy + 1)) gy++;
	return gy;
}

function hardDrop() {
	const gy = ghostY();
	score += (gy - current.y) * 2;
	if (gy > current.y) lastMoveWasRotation = false;
	current.y = gy;
	lockPiece();
}

function softDrop() {
	if (tryMove(0, 1)) {
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

function showNotice(...noticeLines) {
	notice = { lines: noticeLines, remaining: NOTICE_DURATION };
}

function activatePowerUp(kind, x, y) {
	POWER_UP_EFFECTS[kind](x, y);
	showNotice(POWER_UPS[kind].label);
}

function saveUndoSnapshot() {
	undoSnapshot = {
		board: board.map(row => [...row]),
		piece: current,
		score,
		lines,
		level,
		dropInterval,
		combo,
		maxCombo,
		backToBack,
		pendingPowerUp,
		pendingSingle
	};
}

function lockPiece() {
	saveUndoSnapshot();
	let tSpin = false;
	if (current.powerUp) {
		activatePowerUp(current.powerUp, current.x, current.y);
	} else {
		tSpin = isTSpin();
		merge();
	}
	clearLines(tSpin);
	if (challenge.invisibleLocked) revealRemaining = INVISIBLE_REVEAL_DURATION;
	if (reachedGoalLines()) {
		endGame("¡RETO SUPERADO!", true);
		return;
	}
	spawn();
}

function reachedGoalLines() {
	return challenge.goalLines && lines >= challenge.goalLines;
}

function prefillBoard(rows) {
	for (let r = ROWS - rows; r < ROWS; r++) {
		const row = Array.from({ length: COLS }, () =>
			Math.random() < PREFILL_FILL_CHANCE ? pickRandom(STANDARD_PIECE_TYPES) : 0
		);
		row[Math.floor(Math.random() * COLS)] = 0;
		board[r] = row;
	}
}

function riseGarbage() {
	undoSnapshot = null;
	const pushedOut = board.shift().some(Boolean);
	const hole = Math.floor(Math.random() * COLS);
	board.push(
		Array.from({ length: COLS }, (_, c) => (c === hole ? 0 : GARBAGE_CELL))
	);
	while (collide(current.shape, current.x, current.y)) current.y--;
	if (pushedOut) endGame();
}

function updateChallenge(dt) {
	elapsed += dt;
	if (challenge.garbageEvery) {
		garbageAccum += dt;
		if (garbageAccum >= challenge.garbageEvery) {
			garbageAccum -= challenge.garbageEvery;
			riseGarbage();
		}
	}
	if (gameOver) return;
	if (challenge.surviveTime && elapsed >= challenge.surviveTime) {
		endGame("¡RETO SUPERADO!", true);
	} else if (challenge.timeLimit && elapsed >= challenge.timeLimit) {
		endGame("TIEMPO AGOTADO");
	}
}

function formatClock(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = String(totalSeconds % 60).padStart(2, "0");
	return `${minutes}:${seconds}`;
}

function objectiveStatus() {
	const parts = [];
	if (challenge.goalLines)
		parts.push(`Líneas ${Math.min(lines, challenge.goalLines)}/${challenge.goalLines}`);
	const totalTime = challenge.timeLimit ?? challenge.surviveTime;
	if (totalTime) {
		const remaining = Math.max(0, totalTime - elapsed);
		parts.push(`Tiempo ${formatClock(Math.ceil(remaining / 1000))}`);
	}
	if (challenge.garbageEvery) {
		const untilGarbage = challenge.garbageEvery - garbageAccum;
		parts.push(`Basura en ${Math.ceil(untilGarbage / 1000)}s`);
	}
	return parts.join("  ·  ");
}

function updateObjectiveHUD() {
	const status = objectiveStatus();
	if (objectiveProgressEl.textContent !== status)
		objectiveProgressEl.textContent = status;
}

function playTones(frequencies, stepMs) {
	const AudioContextClass = globalThis.AudioContext || globalThis.webkitAudioContext;
	if (muted || !AudioContextClass) return;
	audioContext = audioContext || new AudioContextClass();
	if (audioContext.state === "suspended") audioContext.resume();
	const stepSeconds = stepMs / 1000;
	frequencies.forEach((frequency, i) => {
		const start = audioContext.currentTime + i * stepSeconds;
		const oscillator = audioContext.createOscillator();
		const gain = audioContext.createGain();
		oscillator.type = "square";
		oscillator.frequency.value = frequency;
		gain.gain.setValueAtTime(0.06, start);
		gain.gain.exponentialRampToValueAtTime(0.0001, start + stepSeconds + 0.12);
		oscillator.connect(gain).connect(audioContext.destination);
		oscillator.start(start);
		oscillator.stop(start + stepSeconds + 0.15);
	});
}

function spawn() {
	current = next;
	lastMoveWasRotation = false;
	holdUsed = false;
	next = queue.length ? queue.shift() : randomPiece();
	if (collide(current.shape, current.x, current.y)) {
		endGame();
	}
	drawPreviews();
}

function holdPiece() {
	if (holdUsed) return;
	if (held) {
		const incoming = freshCopy(held);
		held = freshCopy(current);
		current = incoming;
		lastMoveWasRotation = false;
		dropAccum = 0;
		if (collide(current.shape, current.x, current.y)) endGame();
	} else {
		held = freshCopy(current);
		spawn();
	}
	holdUsed = true;
	drawHold();
}

function revealUpcoming() {
	while (queue.length < LOOKAHEAD_COUNT - 1) queue.push(randomPiece());
	return true;
}

function swapCurrentPiece() {
	const candidates = STANDARD_PIECE_TYPES.filter(type => type !== current.type);
	const replacement = createPiece(pickRandom(candidates));
	if (collide(replacement.shape, replacement.x, replacement.y)) return false;
	current = replacement;
	lastMoveWasRotation = false;
	return true;
}

function slowTime() {
	slowRemaining = SLOW_DURATION;
	return true;
}

function undoLastPlacement() {
	const snapshot = undoSnapshot;
	board = snapshot.board.map(row => [...row]);
	({
		score,
		lines,
		level,
		dropInterval,
		combo,
		maxCombo,
		backToBack,
		pendingPowerUp,
		pendingSingle
	} = snapshot);
	queue.unshift(next);
	next = current;
	current = freshCopy(snapshot.piece);
	lastMoveWasRotation = false;
	holdUsed = false;
	undoSnapshot = null;
	dropAccum = 0;
	return true;
}

const ABILITIES = [
	{
		label: "Ver 5 piezas",
		description: "Muestra las próximas 5 piezas",
		cost: 30,
		isAvailable: () => true,
		use: revealUpcoming
	},
	{
		label: "Cambiar pieza",
		description: "Sustituye la actual por otra al azar",
		cost: 40,
		isAvailable: () => true,
		use: swapCurrentPiece
	},
	{
		label: "Ralentizar",
		description: "Caída más lenta durante 10 s",
		cost: 50,
		isAvailable: () => true,
		use: slowTime
	},
	{
		label: "Deshacer",
		description: "Revierte la última colocación",
		cost: 60,
		isAvailable: () => undoSnapshot !== null,
		use: undoLastPlacement
	}
];
const MIN_ABILITY_COST = Math.min(...ABILITIES.map(ability => ability.cost));

function canUseAbility(ability) {
	return energy >= ability.cost && ability.isAvailable();
}

function renderAbilityMenu() {
	abilityList.replaceChildren(
		...ABILITIES.map((ability, index) => {
			const item = document.createElement("li");
			item.className = "ability-item";
			item.classList.toggle("disabled", !canUseAbility(ability));
			item.innerHTML = `<kbd>${index + 1}</kbd><span class="ability-text">${ability.label}<small>${ability.description}</small></span><span class="ability-cost">${ability.cost}</span>`;
			item.addEventListener("click", () => useAbility(ability));
			return item;
		})
	);
}

function openAbilityMenu() {
	if (paused || gameOver || abilityMenuOpen || energy < MIN_ABILITY_COST) return;
	abilityMenuOpen = true;
	cancelAnimationFrame(animId);
	renderAbilityMenu();
	abilityMenu.classList.remove("hidden");
}

function closeAbilityMenu() {
	abilityMenuOpen = false;
	abilityMenu.classList.add("hidden");
	lastTime = performance.now();
	loop(lastTime);
}

function useAbility(ability) {
	if (!canUseAbility(ability) || !ability.use()) return;
	energy -= ability.cost;
	showNotice(ability.label.toUpperCase());
	drawPreviews();
	updateHUD();
	closeAbilityMenu();
}

function handleAbilityMenuKey(e) {
	if (e.code === "Escape" || e.code === "KeyE") {
		e.preventDefault();
		closeAbilityMenu();
		return;
	}
	const ability = ABILITIES[Number(e.key) - 1];
	if (ability) useAbility(ability);
}

function updateHUD() {
	scoreEl.textContent = score.toLocaleString();
	linesEl.textContent = lines;
	levelEl.textContent = level;
	powerUpEl.textContent = `${lines % POWER_UP_EVERY_LINES}/${POWER_UP_EVERY_LINES}`;
	comboEl.textContent = combo > 0 ? `x${combo}` : "-";
	energyFill.style.width = `${(energy / ENERGY_MAX) * 100}%`;
	const abilityReady = energy >= MIN_ABILITY_COST;
	energyBar.classList.toggle("ready", abilityReady);
	energyHint.textContent = abilityReady
		? "E: elegir habilidad"
		: "Se carga al limpiar líneas";
	updateObjectiveHUD();
}

const SKIN_STORAGE_KEY = "tetris.skin";
const DEFAULT_SKIN_KEY = "retro";
const NEON_GLOW_RATIO = 0.5;
const PIXEL_GRID_STEPS = 6;

function drawRetroCell(context, px, py, size, color) {
	context.fillStyle = color;
	context.fillRect(px + 1, py + 1, size - 2, size - 2);
	context.fillStyle = "rgba(255,255,255,0.12)";
	context.fillRect(px + 1, py + 1, size - 2, 4);
}

function drawNeonCell(context, px, py, size, color) {
	context.shadowColor = color;
	context.shadowBlur = size * NEON_GLOW_RATIO;
	context.fillStyle = color;
	context.fillRect(px + 3, py + 3, size - 6, size - 6);
	context.shadowBlur = 0;
	context.fillStyle = "rgba(255,255,255,0.35)";
	context.fillRect(px + 5, py + 5, size - 10, size - 10);
}

function traceRoundedRect(context, x, y, width, height, radius) {
	context.beginPath();
	context.moveTo(x + radius, y);
	context.arcTo(x + width, y, x + width, y + height, radius);
	context.arcTo(x + width, y + height, x, y + height, radius);
	context.arcTo(x, y + height, x, y, radius);
	context.arcTo(x, y, x + width, y, radius);
	context.closePath();
}

function drawPastelCell(context, px, py, size, color) {
	context.fillStyle = color;
	traceRoundedRect(context, px + 1, py + 1, size - 2, size - 2, size * 0.3);
	context.fill();
	context.fillStyle = "rgba(255,255,255,0.4)";
	traceRoundedRect(context, px + size * 0.2, py + size * 0.15, size * 0.35, size * 0.15, size * 0.08);
	context.fill();
}

function drawPixelCell(context, px, py, size, color) {
	const inner = size - 2;
	const step = inner / PIXEL_GRID_STEPS;
	const last = PIXEL_GRID_STEPS - 1;
	context.fillStyle = color;
	context.fillRect(px + 1, py + 1, inner, inner);
	for (let row = 0; row < PIXEL_GRID_STEPS; row++) {
		for (let col = 0; col < PIXEL_GRID_STEPS; col++) {
			if (row === 0 || col === 0) context.fillStyle = "rgba(255,255,255,0.4)";
			else if (row === last || col === last) context.fillStyle = "rgba(0,0,0,0.35)";
			else if ((row + col) % 2 === 0) context.fillStyle = "rgba(255,255,255,0.12)";
			else context.fillStyle = "rgba(0,0,0,0.12)";
			const left = Math.round(col * step);
			const top = Math.round(row * step);
			context.fillRect(
				px + 1 + left,
				py + 1 + top,
				Math.round((col + 1) * step) - left,
				Math.round((row + 1) * step) - top
			);
		}
	}
}

const GAMEBOY_TONES = ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"];

function drawGameboyCell(context, px, py, size, color) {
	const [darkest, dark, light] = GAMEBOY_TONES;
	context.fillStyle = darkest;
	context.fillRect(px, py, size, size);
	context.fillStyle = color;
	context.fillRect(px + 1, py + 1, size - 2, size - 2);
	context.fillStyle = light;
	context.fillRect(px + 1, py + 1, size - 2, 1);
	context.fillRect(px + 1, py + 1, 1, size - 2);
	context.fillStyle = dark;
	context.fillRect(px + 1, py + size - 2, size - 2, 1);
	context.fillRect(px + size - 2, py + 1, 1, size - 2);
}

const SKINS = {
	retro: { label: "Retro", colors: COLORS, drawCell: drawRetroCell },
	neon: {
		label: "Neón",
		colors: [
			null,
			"#00f0ff",
			"#fff200",
			"#d500f9",
			"#39ff14",
			"#ff1744",
			"#536dfe",
			"#ff9100",
			"#c6ff00",
			"#1de9b6",
			"#ff4081",
			"#40c4ff",
			"#ff6e40",
			"#8c8ca8"
		],
		drawCell: drawNeonCell
	},
	pastel: {
		label: "Pastel",
		colors: [
			null,
			"#a8e6ef",
			"#fff1b8",
			"#d9b8e6",
			"#bfe8c4",
			"#f5b8b8",
			"#b8c2f0",
			"#fbd2a2",
			"#d6ecb0",
			"#a9e0d9",
			"#f8c8dc",
			"#c5d3da",
			"#d3c1b8",
			"#bdbdcc"
		],
		drawCell: drawPastelCell
	},
	pixel: {
		label: "Pixel art",
		colors: [
			null,
			"#29b6f6",
			"#fdd835",
			"#ab47bc",
			"#43a047",
			"#e53935",
			"#3949ab",
			"#fb8c00",
			"#9ccc65",
			"#00897b",
			"#ec407a",
			"#78909c",
			"#8d6e63",
			"#616170"
		],
		drawCell: drawPixelCell
	}
};

for (const skin of Object.values(SKINS)) skin.sprites = new Map();

let activeSkin = SKINS[DEFAULT_SKIN_KEY];

function cellSprite(skin, colorIndex, size) {
	const spriteKey = `${colorIndex}:${size}`;
	if (skin.sprites.has(spriteKey)) return skin.sprites.get(spriteKey);
	const padding = Math.ceil(size * NEON_GLOW_RATIO);
	const sprite = document.createElement("canvas");
	sprite.width = size + padding * 2;
	sprite.height = size + padding * 2;
	skin.drawCell(sprite.getContext("2d"), padding, padding, size, skin.colors[colorIndex]);
	const entry = { sprite, padding };
	skin.sprites.set(spriteKey, entry);
	return entry;
}

function loadSkinKey() {
	try {
		const storedKey = localStorage.getItem(SKIN_STORAGE_KEY);
		return Object.hasOwn(SKINS, storedKey) ? storedKey : DEFAULT_SKIN_KEY;
	} catch {
		return DEFAULT_SKIN_KEY;
	}
}

function saveSkinKey(skinKey) {
	try {
		localStorage.setItem(SKIN_STORAGE_KEY, skinKey);
	} catch {}
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
	context.globalAlpha = alpha ?? 1;
	const { sprite, padding } = cellSprite(activeSkin, colorIndex, size);
	context.drawImage(sprite, x * size - padding, y * size - padding);
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
	if (!challenge.invisibleLocked || revealRemaining > 0)
		for (let r = 0; r < ROWS; r++)
			for (let c = 0; c < COLS; c++) drawBlock(ctx, c, r, board[r][c], BLOCK);

	// ghost
	const gy = ghostY();
	if (ghostVisible)
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
	if (slowRemaining > 0) {
		ctx.fillStyle = "rgba(171, 71, 188, 0.1)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		const y = freezeRemaining > 0 ? 52 : 24;
		drawCenteredText(`🐢 ${Math.ceil(slowRemaining / 1000)}s`, y);
	}
	if (flash > 0) {
		ctx.fillStyle = `rgba(255, 235, 130, ${0.35 * (flash / FLASH_DURATION)})`;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	if (notice)
		notice.lines.forEach((line, i) =>
			drawCenteredText(line, canvas.height / 3 + i * NOTICE_LINE_HEIGHT)
		);
}

function drawPreviews() {
	drawNext();
	drawQueue();
	drawHold();
}

function drawHold() {
	drawPieceCentered(holdCtx, holdCanvas, held);
	holdCanvas.classList.toggle("locked", holdUsed);
}

function drawQueue() {
	queueSection.classList.toggle("hidden", queue.length === 0);
	queueCtx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
	const slotWidthBlocks = queueCanvas.width / QUEUE_BLOCK;
	queue.forEach((piece, slot) => {
		const shape = piece.shape;
		const offX = Math.floor((slotWidthBlocks - shape[0].length) / 2);
		const offY =
			slot * QUEUE_SLOT_BLOCKS + Math.floor((QUEUE_SLOT_BLOCKS - shape.length) / 2);
		for (let r = 0; r < shape.length; r++)
			for (let c = 0; c < shape[r].length; c++)
				drawBlock(queueCtx, offX + c, offY + r, shape[r][c], QUEUE_BLOCK);
	});
}

function drawPieceCentered(context, targetCanvas, piece) {
	const NB = 30;
	context.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
	if (!piece) return;
	const shape = piece.shape;
	const offX = Math.floor((4 - shape[0].length) / 2);
	const offY = Math.floor((4 - shape.length) / 2);
	for (let r = 0; r < shape.length; r++)
		for (let c = 0; c < shape[r].length; c++)
			drawBlock(context, offX + c, offY + r, shape[r][c], NB);
}

function drawNext() {
	drawPieceCentered(nextCtx, nextCanvas, next);
}

const RECORDS_STORAGE_KEY = "tetris.records";
const MAX_TOP_ENTRIES = 5;
const MAX_NAME_LENGTH = 12;
const MAX_HISTORY_ENTRIES = 10;
const EXPORT_FILE_NAME = "tetris-records.json";
const DEFAULT_PLAYER_NAME = "Anónimo";

const recordsListEl = document.getElementById("records-list");
const recordsBestComboEl = document.getElementById("records-best-combo");
const recordsMaxLinesEl = document.getElementById("records-max-lines");
const recordsResetBtn = document.getElementById("records-reset-btn");
const overlayRecords = document.getElementById("overlay-records");
const overlayRecordsList = document.getElementById("overlay-records-list");
const overlayBestComboEl = document.getElementById("overlay-best-combo");
const overlayMaxLinesEl = document.getElementById("overlay-max-lines");
const historyListEl = document.getElementById("history-list");
const recordsGamesPlayedEl = document.getElementById("records-games-played");
const recordsTotalTimeEl = document.getElementById("records-total-time");
const overlayGamesPlayedEl = document.getElementById("overlay-games-played");
const overlayTotalTimeEl = document.getElementById("overlay-total-time");
const recordsExportBtn = document.getElementById("records-export-btn");
const recordsImportBtn = document.getElementById("records-import-btn");
const recordsImportInput = document.getElementById("records-import-input");
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");

let records = loadRecords();
let pendingEntry = null;
let highlightedEntry = null;

function emptyRecords() {
	return { top: [], bestCombo: 0, maxLines: 0, history: [], gamesPlayed: 0, totalSeconds: 0 };
}

function toCount(value) {
	return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function isValidEntry(entry) {
	return Boolean(entry) && typeof entry.name === "string" && Number.isFinite(entry.score);
}

function byScoreDescending(a, b) {
	return b.score - a.score;
}

function sanitizeTop(entries) {
	return entries
		.filter(isValidEntry)
		.map(({ name, score }) => ({ name: name.slice(0, MAX_NAME_LENGTH), score }))
		.sort(byScoreDescending)
		.slice(0, MAX_TOP_ENTRIES);
}

function isValidHistoryEntry(entry) {
	return Boolean(entry)
		&& Number.isFinite(entry.date)
		&& Number.isFinite(entry.score)
		&& Number.isFinite(entry.lines)
		&& Number.isFinite(entry.level);
}

function sanitizeHistory(entries) {
	return entries
		.filter(isValidHistoryEntry)
		.map(({ date, score, lines, level }) => ({
			date,
			score: toCount(score),
			lines: toCount(lines),
			level: toCount(level)
		}))
		.slice(0, MAX_HISTORY_ENTRIES);
}

function sanitizeRecords(stored) {
	if (!stored || typeof stored !== "object" || Array.isArray(stored)) return emptyRecords();
	return {
		top: Array.isArray(stored.top) ? sanitizeTop(stored.top) : [],
		bestCombo: toCount(stored.bestCombo),
		maxLines: toCount(stored.maxLines),
		history: Array.isArray(stored.history) ? sanitizeHistory(stored.history) : [],
		gamesPlayed: toCount(stored.gamesPlayed),
		totalSeconds: toCount(stored.totalSeconds)
	};
}

function loadRecords() {
	try {
		return sanitizeRecords(JSON.parse(localStorage.getItem(RECORDS_STORAGE_KEY)));
	} catch {
		return emptyRecords();
	}
}

function saveRecords() {
	try {
		localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(records));
	} catch {}
}

function qualifiesForTop(points) {
	if (points <= 0) return false;
	if (records.top.length < MAX_TOP_ENTRIES) return true;
	return points > records.top[records.top.length - 1].score;
}

function createRecordItem(entry, index) {
	const item = document.createElement("li");
	item.classList.toggle("record-highlight", entry === highlightedEntry);
	const rank = document.createElement("span");
	rank.className = "record-rank";
	rank.textContent = index + 1;
	const name = document.createElement("span");
	name.className = "record-name";
	name.textContent = entry.name;
	const points = document.createElement("span");
	points.className = "record-score";
	points.textContent = entry.score.toLocaleString();
	item.append(rank, name, points);
	return item;
}

function createEmptyRecordItem() {
	const item = document.createElement("li");
	item.className = "record-empty";
	item.textContent = "Aún no hay records";
	return item;
}

function formatHistoryDate(timestamp) {
	const date = new Date(timestamp);
	const day = date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" });
	const time = date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
	return `${day} ${time}`;
}

function createHistoryItem(entry) {
	const item = document.createElement("li");
	const date = document.createElement("span");
	date.className = "history-date";
	date.textContent = formatHistoryDate(entry.date);
	const points = document.createElement("span");
	points.className = "history-score";
	points.textContent = entry.score.toLocaleString();
	const detail = document.createElement("span");
	detail.className = "history-detail";
	detail.textContent = `${entry.lines}L N${entry.level}`;
	item.append(date, points, detail);
	return item;
}

function createEmptyHistoryItem() {
	const item = document.createElement("li");
	item.className = "record-empty";
	item.textContent = "Aún no hay partidas";
	return item;
}

function formatPlayTime(totalSeconds) {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
	return formatClock(totalSeconds);
}

function renderHistoryAndStats() {
	const items = records.history.length
		? records.history.map(createHistoryItem)
		: [createEmptyHistoryItem()];
	historyListEl.replaceChildren(...items);
	const playTime = formatPlayTime(records.totalSeconds);
	recordsGamesPlayedEl.textContent = records.gamesPlayed;
	overlayGamesPlayedEl.textContent = records.gamesPlayed;
	recordsTotalTimeEl.textContent = playTime;
	overlayTotalTimeEl.textContent = playTime;
}

function recordGameStats() {
	records.history.unshift({ date: Date.now(), score, lines, level });
	records.history.splice(MAX_HISTORY_ENTRIES);
	records.gamesPlayed++;
	records.totalSeconds += Math.floor(elapsed / 1000);
}

function exportRecords() {
	const blob = new Blob([JSON.stringify(records, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = EXPORT_FILE_NAME;
	document.body.append(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(url);
}

function importRecordsFromText(text) {
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		alert("El archivo no es un JSON válido.");
		return;
	}
	if (!hasRecordsShape(parsed)) {
		alert("El archivo no contiene records válidos.");
		return;
	}
	const imported = sanitizeRecords(parsed);
	records = imported;
	pendingEntry = null;
	highlightedEntry = null;
	nameForm.classList.add("hidden");
	saveRecords();
	renderRecords();
}

function hasRecordsShape(parsed) {
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
	return Object.keys(emptyRecords()).some(key => key in parsed);
}

function renderRecords() {
	renderHistoryAndStats();
	const items = records.top.length
		? records.top.map(createRecordItem)
		: [createEmptyRecordItem()];
	recordsListEl.replaceChildren(...items);
	overlayRecordsList.replaceChildren(...items.map(item => item.cloneNode(true)));
	const bestCombo = records.bestCombo > 0 ? `x${records.bestCombo}` : "-";
	recordsBestComboEl.textContent = bestCombo;
	overlayBestComboEl.textContent = bestCombo;
	recordsMaxLinesEl.textContent = records.maxLines;
	overlayMaxLinesEl.textContent = records.maxLines;
}

function resetRecordsView() {
	document.activeElement?.blur();
	pendingEntry = null;
	highlightedEntry = null;
	nameInput.value = "";
	nameForm.classList.add("hidden");
	overlayRecords.classList.add("hidden");
	renderRecords();
}

function registerFinishedGame() {
	records.bestCombo = Math.max(records.bestCombo, maxCombo);
	records.maxLines = Math.max(records.maxLines, lines);
	recordGameStats();
	if (qualifiesForTop(score)) {
		pendingEntry = { name: DEFAULT_PLAYER_NAME, score };
		highlightedEntry = pendingEntry;
		records.top.push(pendingEntry);
		records.top.sort(byScoreDescending);
		records.top.splice(MAX_TOP_ENTRIES);
	}
	saveRecords();
	renderRecords();
	nameForm.classList.toggle("hidden", !pendingEntry);
	overlayRecords.classList.remove("hidden");
	if (pendingEntry) nameInput.focus();
}

function savePendingName() {
	if (!pendingEntry) return;
	pendingEntry.name = nameInput.value.trim() || DEFAULT_PLAYER_NAME;
	pendingEntry = null;
	nameInput.blur();
	nameInput.value = "";
	nameForm.classList.add("hidden");
	saveRecords();
	renderRecords();
}

function clearAllRecords() {
	const confirmed = confirm("¿Borrar todos los records?");
	lastTime = performance.now();
	if (!confirmed) return;
	records = emptyRecords();
	pendingEntry = null;
	highlightedEntry = null;
	nameForm.classList.add("hidden");
	saveRecords();
	renderRecords();
}

nameForm.addEventListener("submit", e => {
	e.preventDefault();
	savePendingName();
});

recordsExportBtn.addEventListener("click", () => {
	exportRecords();
	recordsExportBtn.blur();
});

recordsImportBtn.addEventListener("click", () => {
	recordsImportInput.click();
	recordsImportBtn.blur();
});

recordsImportInput.addEventListener("change", async () => {
	const file = recordsImportInput.files[0];
	recordsImportInput.value = "";
	if (!file) return;
	importRecordsFromText(await file.text());
	lastTime = performance.now();
});

recordsResetBtn.addEventListener("click", () => {
	clearAllRecords();
	recordsResetBtn.blur();
});

nameInput.addEventListener("input", () => {
	nameInput.value = nameInput.value.trimStart();
});

function endGame(title = "GAME OVER", won = false) {
	if (gameOver) return;
	gameOver = true;
	cancelAnimationFrame(animId);
	overlayTitle.textContent = title;
	overlayTitle.classList.toggle("victory", won);
	overlayScore.textContent = `Puntuación: ${score.toLocaleString()}`;
	if (won)
		overlayScore.textContent += `  ·  Tiempo ${formatClock(Math.floor(elapsed / 1000))}`;
	overlay.classList.remove("hidden");
	registerFinishedGame();
}

const MAX_START_LEVEL = 10;
const FORM_FIELD_TAGS = ["INPUT", "SELECT", "TEXTAREA"];
const PAUSE_TOGGLE_CODES = ["Escape", "KeyP"];
const ARROW_CODES = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

function isFormField(element) {
	return FORM_FIELD_TAGS.includes(element?.tagName);
}

function setPauseControlsVisible(visible) {
	pauseControlsList.classList.toggle("hidden", !visible);
	pauseControlsBtn.setAttribute("aria-expanded", String(visible));
	pauseControlsBtn.textContent = visible ? "Ocultar controles" : "Ver controles";
}

function openPauseMenu() {
	cancelAnimationFrame(animId);
	setPauseControlsVisible(false);
	pauseStartLevel.value = String(chosenStartLevel);
	renderPauseSwitches();
	pauseMenu.classList.remove("hidden");
	pauseResumeBtn.focus();
}

function closePauseMenu() {
	pauseMenu.classList.add("hidden");
	document.activeElement?.blur();
	lastTime = performance.now();
	loop(lastTime);
}

const MUTED_STORAGE_KEY = "tetris.muted";
const GHOST_STORAGE_KEY = "tetris.ghost";
const RESUME_COUNTDOWN_SECONDS = 3;
const RESUME_COUNTDOWN_STEP_MS = 1000;

function loadStoredFlag(storageKey, fallback) {
	try {
		const stored = localStorage.getItem(storageKey);
		return stored === null ? fallback : stored === "true";
	} catch {
		return fallback;
	}
}

function saveStoredFlag(storageKey, value) {
	try {
		localStorage.setItem(storageKey, String(value));
	} catch {}
}

let ghostVisible = loadStoredFlag(GHOST_STORAGE_KEY, true);
let countdownRemaining = 0;
let countdownAnimId;
let countdownLastTime;

muted = loadStoredFlag(MUTED_STORAGE_KEY, false);

function renderPauseSwitches() {
	pauseSoundToggle.setAttribute("aria-checked", String(!muted));
	pauseGhostToggle.setAttribute("aria-checked", String(ghostVisible));
}

function toggleMuted() {
	muted = !muted;
	saveStoredFlag(MUTED_STORAGE_KEY, muted);
	renderPauseSwitches();
}

function toggleGhostVisible() {
	ghostVisible = !ghostVisible;
	saveStoredFlag(GHOST_STORAGE_KEY, ghostVisible);
	renderPauseSwitches();
	draw();
}

function isResumeCountdownActive() {
	return countdownRemaining > 0;
}

function stopResumeCountdown() {
	cancelAnimationFrame(countdownAnimId);
	countdownRemaining = 0;
	resumeCountdown.classList.add("hidden");
}

function resumeCountdownTick(ts) {
	countdownRemaining -= ts - countdownLastTime;
	countdownLastTime = ts;
	if (countdownRemaining <= 0) {
		stopResumeCountdown();
		paused = false;
		closePauseMenu();
		return;
	}
	resumeCountdownNumber.textContent = String(
		Math.ceil(countdownRemaining / RESUME_COUNTDOWN_STEP_MS)
	);
	countdownAnimId = requestAnimationFrame(resumeCountdownTick);
}

function startResumeCountdown() {
	pauseMenu.classList.add("hidden");
	document.activeElement?.blur();
	countdownRemaining = RESUME_COUNTDOWN_SECONDS * RESUME_COUNTDOWN_STEP_MS;
	countdownLastTime = performance.now();
	resumeCountdown.classList.remove("hidden");
	resumeCountdownTick(countdownLastTime);
}

function togglePause() {
	if (gameOver || abilityMenuOpen) return;
	if (!paused) {
		paused = true;
		openPauseMenu();
	} else if (isResumeCountdownActive()) {
		stopResumeCountdown();
		openPauseMenu();
	} else {
		startResumeCountdown();
	}
}

function handlePauseMenuKey(e) {
	if (PAUSE_TOGGLE_CODES.includes(e.code)) {
		e.preventDefault();
		togglePause();
		return;
	}
	if (isFormField(e.target)) return;
	if (ARROW_CODES.includes(e.code)) e.preventDefault();
	if (e.code === "KeyM") toggleMuted();
}

for (let startLevel = 1; startLevel <= MAX_START_LEVEL; startLevel++) {
	const option = document.createElement("option");
	option.value = String(startLevel);
	option.textContent = String(startLevel);
	pauseStartLevel.append(option);
}

pauseStartLevel.addEventListener("change", () => {
	chosenStartLevel = Number(pauseStartLevel.value);
});

pauseSoundToggle.addEventListener("click", toggleMuted);
pauseGhostToggle.addEventListener("click", toggleGhostVisible);
pauseResumeBtn.addEventListener("click", togglePause);
pauseRestartBtn.addEventListener("click", init);
pauseControlsBtn.addEventListener("click", () => {
	setPauseControlsVisible(pauseControlsList.classList.contains("hidden"));
});

function tickTimers(dt) {
	freezeRemaining = Math.max(0, freezeRemaining - dt);
	flash = Math.max(0, flash - dt);
	revealRemaining = Math.max(0, revealRemaining - dt);
	slowRemaining = Math.max(0, slowRemaining - dt);
	if (notice) {
		notice.remaining -= dt;
		if (notice.remaining <= 0) notice = null;
	}
}

function loop(ts) {
	const dt = ts - lastTime;
	lastTime = ts;
	tickTimers(dt);
	updateChallenge(dt);
	if (!gameOver) {
		if (freezeRemaining === 0)
			dropAccum += slowRemaining > 0 ? dt * SLOW_FACTOR : dt;
		if (dropAccum >= dropInterval) {
			dropAccum = 0;
			if (!tryMove(0, 1)) lockPiece();
		}
	}
	draw();
	updateObjectiveHUD();
	if (gameOver) return;
	animId = requestAnimationFrame(loop);
}

function init() {
	challenge = CHALLENGES[modeKey];
	activeStartLevel = chosenStartLevel;
	board = createBoard();
	if (challenge.prefilledRows) prefillBoard(challenge.prefilledRows);
	score = 0;
	lines = 0;
	level = baseLevel();
	stopResumeCountdown();
	paused = false;
	gameOver = false;
	dropInterval = dropIntervalFor(level);
	dropAccum = 0;
	lastTime = performance.now();
	pendingPowerUp = false;
	pendingSingle = false;
	freezeRemaining = 0;
	notice = null;
	combo = 0;
	maxCombo = 0;
	backToBack = false;
	flash = 0;
	elapsed = 0;
	garbageAccum = 0;
	revealRemaining = 0;
	energy = 0;
	queue = [];
	slowRemaining = 0;
	undoSnapshot = null;
	held = null;
	resetRecordsView();
	abilityMenuOpen = false;
	abilityMenu.classList.add("hidden");
	pauseMenu.classList.add("hidden");
	objectiveTextEl.textContent = challenge.description;
	overlayTitle.classList.remove("victory");
	next = randomPiece();
	spawn();
	updateHUD();
	overlay.classList.add("hidden");
	cancelAnimationFrame(animId);
	animId = requestAnimationFrame(loop);
}

document.addEventListener("keydown", e => {
	if (paused) {
		handlePauseMenuKey(e);
		return;
	}
	if (isFormField(e.target)) return;
	if (abilityMenuOpen) {
		handleAbilityMenuKey(e);
		return;
	}
	if (PAUSE_TOGGLE_CODES.includes(e.code)) {
		e.preventDefault();
		togglePause();
		return;
	}
	if (e.code === "KeyM") {
		toggleMuted();
		return;
	}
	if (e.code === "KeyT") {
		cycleSkin();
		return;
	}
	if (paused || gameOver) return;
	switch (e.code) {
		case "KeyE":
			openAbilityMenu();
			break;
		case "KeyC":
		case "ShiftLeft":
		case "ShiftRight":
			holdPiece();
			break;
		case "ArrowLeft":
			e.preventDefault();
			tryMove(-1, 0);
			break;
		case "ArrowRight":
			e.preventDefault();
			tryMove(1, 0);
			break;
		case "ArrowDown":
			e.preventDefault();
			softDrop();
			break;
		case "ArrowUp":
		case "KeyX":
			e.preventDefault();
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

for (const [key, { label }] of Object.entries(CHALLENGES)) {
	const option = document.createElement("option");
	option.value = key;
	option.textContent = label;
	modeSelect.append(option);
}

modeSelect.addEventListener("change", () => {
	modeKey = modeSelect.value;
	modeSelect.blur();
	init();
});

function applyTheme(theme) {
	const isLight = theme === "light";
	document.documentElement.dataset.theme = theme;
	themeToggle.setAttribute("aria-checked", String(isLight));
	themeToggleLabel.textContent = isLight ? "Claro" : "Oscuro";
	readGridColor();
}

function readGridColor() {
	gridColor = getComputedStyle(document.documentElement)
		.getPropertyValue("--grid-line")
		.trim();
}

const skinPreviewCanvas = document.getElementById("skin-preview");
const skinPreviewCtx = skinPreviewCanvas.getContext("2d");
const SKIN_PREVIEW_BLOCK = 5;
const SKIN_PREVIEW_SLOT_CELLS = 5;
const SKIN_PREVIEW_ROWS = 4;

function trimmedShape(shape) {
	const rows = shape.filter(row => row.some(Boolean));
	const columns = shape[0]
		.map((_, col) => col)
		.filter(col => shape.some(row => row[col]));
	return rows.map(row => columns.map(col => row[col]));
}

function drawSkinPreview() {
	skinPreviewCtx.clearRect(0, 0, skinPreviewCanvas.width, skinPreviewCanvas.height);
	STANDARD_PIECE_TYPES.forEach((type, index) => {
		const shape = trimmedShape(PIECES[type]);
		const offsetX = index * SKIN_PREVIEW_SLOT_CELLS;
		const offsetY = Math.floor((SKIN_PREVIEW_ROWS - shape.length) / 2);
		shape.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell) drawBlock(skinPreviewCtx, offsetX + x, offsetY + y, type, SKIN_PREVIEW_BLOCK);
			});
		});
	});
}

function applySkin(skinKey) {
	activeSkin = SKINS[skinKey];
	document.documentElement.dataset.skin = skinKey;
	skinSelect.value = skinKey;
	readGridColor();
	drawSkinPreview();
}

function cycleSkin() {
	const skinKeys = Object.keys(SKINS);
	const currentIndex = skinKeys.indexOf(skinSelect.value);
	const nextKey = skinKeys[(currentIndex + 1) % skinKeys.length];
	applySkin(nextKey);
	saveSkinKey(nextKey);
	draw();
	drawPreviews();
}

for (const [key, { label }] of Object.entries(SKINS)) {
	const option = document.createElement("option");
	option.value = key;
	option.textContent = label;
	skinSelect.append(option);
}

skinSelect.addEventListener("keydown", e => {
	if (e.code.startsWith("Arrow")) e.preventDefault();
});

skinSelect.addEventListener("change", () => {
	applySkin(skinSelect.value);
	saveSkinKey(skinSelect.value);
	skinSelect.blur();
	draw();
	drawPreviews();
});

themeToggle.addEventListener("click", () => {
	const isLight = document.documentElement.dataset.theme === "light";
	applyTheme(isLight ? "dark" : "light");
	themeToggle.blur();
	draw();
});

applyTheme("dark");
applySkin(loadSkinKey());
init();
