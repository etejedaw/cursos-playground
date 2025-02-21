/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

interface Handler {
	setNext(handler: Handler): Handler;
	handle(request: string): void;
}

abstract class BaseHandler implements Handler {
	constructor(private nextHandler?: Handler) {}

	setNext(handler: Handler): Handler {
		this.nextHandler = handler;
		return handler;
	}

	handle(request: string): void {
		if (this.nextHandler) this.nextHandler.handle(request);
	}
}

class BasicSupport extends BaseHandler {
	override handle(request: string): void {
		if (request === "basic")
			console.log("Soporte básico: Resolviendo problema");
		else {
			console.log("Pasando el problema a soporte avanzado");
			super.handle(request);
		}
	}
}

class AdvancedSupport extends BaseHandler {
	override handle(request: string): void {
		if (request === "advance")
			console.log("Soporte avanzando: Resolviendo problema");
		else {
			console.log("Pasando el problema a soporte experto");
			super.handle(request);
		}
	}
}

class ExpertSupport extends BaseHandler {
	override handle(request: string): void {
		if (request === "expert")
			console.log("Soporte experto: Resolviendo problema");
		else {
			console.log("Todo terminó señores, no hay escapatoria");
		}
	}
}

function main() {
	const basicSupport = new BasicSupport();
	const advancedSupport = new AdvancedSupport();
	const expertSupport = new ExpertSupport();

	basicSupport.setNext(advancedSupport).setNext(expertSupport);

	basicSupport.handle("god");
}

main();
