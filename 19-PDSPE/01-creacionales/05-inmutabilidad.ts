/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
	constructor(
		readonly content: string,
		readonly cursorPosition: number,
		readonly unsavedChanges: boolean
	) {}

	displayState() {
		console.log("Estado del editor");
		console.log(
			`Contenido: ${this.content} \n Cursor Pos: ${this.cursorPosition} \n Unsaved Changes: ${this.unsavedChanges}`
		);
	}

	copyWith(codeEditorState: Partial<CodeEditorState>): CodeEditorState {
		const content = codeEditorState.content ?? this.content;
		const cursorPosition =
			codeEditorState.cursorPosition ?? this.cursorPosition;
		const unsavedChanges =
			codeEditorState.unsavedChanges ?? this.unsavedChanges;

		return new CodeEditorState(content, cursorPosition, unsavedChanges);
	}
}

class CodeEditorHistory {
	#history: CodeEditorState[] = [];
	#currentIndex = -1;

	save(state: CodeEditorState) {
		if (this.#currentIndex < this.#history.length - 1)
			this.#history = this.#history.splice(0, this.#currentIndex + 1);
		this.#history.push(state);
		this.#currentIndex++;
	}

	redo(): CodeEditorState | undefined {
		if (this.#currentIndex >= this.#history.length - 1) return;
		this.#currentIndex++;
		return this.#history[this.#currentIndex];
	}

	undo(): CodeEditorState | undefined {
		if (this.#currentIndex <= 0) return;
		this.#currentIndex--;
		return this.#history[this.#currentIndex];
	}
}

function main() {
	const history = new CodeEditorHistory();

	let editorState = new CodeEditorState(
		"console.log('Hola Mundo');",
		2,
		false
	);
	history.save(editorState);

	console.log("Estado inicial");
	editorState.displayState();

	editorState = editorState.copyWith({
		content: "console.log('Hello World')",
		cursorPosition: 3,
		unsavedChanges: true,
	});
	history.save(editorState);
	editorState.displayState();

	editorState = editorState.copyWith({ cursorPosition: 5 });
	history.save(editorState);
	editorState.displayState();

	editorState = history.undo()!;
	editorState.displayState();

	editorState = history.redo()!;
	editorState.displayState();
}

main();
