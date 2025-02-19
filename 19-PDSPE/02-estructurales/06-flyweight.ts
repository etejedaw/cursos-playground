/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

interface Location {
	display(coordinates: { x: number; y: number }): void;
}

class LocationIcon implements Location {
	constructor(private type: string, private iconImage: string) {}

	display(coordinates: { x: number; y: number }): void {
		console.log(
			`Coords: ${this.type} en ${coordinates.x}, ${coordinates.y} con ícono [${this.iconImage}]`
		);
	}
}

class LocationFactory {
	private icons: Record<string, LocationIcon> = {};

	getLocationIcon(type: string): LocationIcon {
		if (!this.icons[type]) {
			console.log(`Creando una instancia de ${type}`);
			this.icons[type] = new LocationIcon(
				type,
				`imagen_de_${type.toLowerCase()}`
			);
		}
		return this.icons[type];
	}
}

class MapLocation {
	private coordinates: { x: number; y: number };
	private icon: LocationIcon;

	constructor(x: number, y: number, icon: LocationIcon) {
		this.coordinates = { x, y };
		this.icon = icon;
	}

	display() {
		this.icon.display(this.coordinates);
	}
}

function main() {
	const factory = new LocationFactory();

	const locations = [
		new MapLocation(10, 20, factory.getLocationIcon("hospital")),
		new MapLocation(20, 40, factory.getLocationIcon("hospital")),
		new MapLocation(30, 60, factory.getLocationIcon("hospital")),
		new MapLocation(35, 65, factory.getLocationIcon("parque")),
		new MapLocation(45, 75, factory.getLocationIcon("parque")),
		new MapLocation(65, 105, factory.getLocationIcon("parque")),
		new MapLocation(165, 105, factory.getLocationIcon("hospital"))
	];

	locations.forEach(location => location.display());
}

main();
