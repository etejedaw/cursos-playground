/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class ConfigManager {
	#config: Record<string, string> = {};

	setConfig(key: string, value: string) {
		this.#config[key] = value;
	}

	getConfig(key: string): string | null {
		return this.#config[key];
	}

	getAllConfig(): Readonly<Record<string, string>> {
		return { ...this.#config };
	}
}

export const configManager = new ConfigManager();
