/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
	showDetails(ident?: string): void;
}

class Fichero implements FileSystemComponent {
	constructor(private name: string) {}

	showDetails(ident?: string): void {
		console.log(`${ident}-Archivo: ${this.name}`);
	}
}

class Folder implements FileSystemComponent {
	private contents: FileSystemComponent[] = [];
	constructor(private name: string) {}

	showDetails(ident: string = ""): void {
		console.log(`${ident}+Carpeta: ${this.name}`);
		this.contents.forEach(component => component.showDetails(ident + "\t"));
	}

	add(component: FileSystemComponent) {
		this.contents.push(component);
	}
}

function main() {
	const file1 = new Fichero("archivo1.txt");
	const file2 = new Fichero("archivo2.txt");
	const file3 = new Fichero("archivo3.txt");
	const file4 = new Fichero("archivo4.txt");

	const folder1 = new Folder("Carpeta 1");
	folder1.add(file1);
	folder1.add(file2);

	const folder2 = new Folder("Carpeta 2");
	folder2.add(file3);

	const folder3 = new Folder("Carpeta 3");
	folder3.add(file4);
	folder2.add(folder3);

	const rootFolder = new Folder("/root");
	rootFolder.add(folder1);
	rootFolder.add(folder2);

	rootFolder.showDetails();
}

main();
