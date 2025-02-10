import { Logger } from "jsr:@deno-library/logger";

// TODO: Implementar el LoggerAdapter

interface ILoggerAdapter {
	file: string;
	writeLog: (message: string) => void;
	writeError: (message: string) => void;
	writeWarning: (message: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
	file: string;
	#logger = new Logger();

	constructor(file: string) {
		this.file = file;
	}

	writeLog(message: string) {
		this.#logger.info(`[${this.file} log] ${message}`);
	}

	writeError(message: string) {
		this.#logger.warn(`[${this.file} error] ${message}`);
	}

	writeWarning(message: string) {
		this.#logger.error(`[${this.file} warning] ${message}`);
	}
}
