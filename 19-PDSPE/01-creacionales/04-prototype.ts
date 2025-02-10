/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Documento {
	title: string;
	#content: string;
	author: string;

	constructor(title: string, content: string, author: string) {
		this.title = title;
		this.#content = content;
		this.author = author;
	}

	displayInfo() {
		console.log(`
            Title: ${this.title}
            Content: ${this.#content}
            Author: ${this.author}
            `);
	}

	clone(): Documento {
		return new Documento(this.title, this.#content, this.author);
	}
}

function main() {
	const document1 = new Documento("Cotización", "500 USD", "Pricila");
	document1.displayInfo();

	const document2 = document1.clone();
	document2.title = "Nueva Cotización";
	document2.displayInfo();
}

main();
