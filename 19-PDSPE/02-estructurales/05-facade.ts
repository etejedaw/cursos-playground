/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Projector {
	turnOn() {
		console.log("Proyector encendido");
	}

	turnOff() {
		console.log("Proyector Apagado");
	}
}

class SoundSystem {
	on() {
		console.log("Sistema de sonido encendido");
	}

	off() {
		console.log("Sistema de sonido apagado");
	}
}

class VideoPlayer {
	on() {
		console.log("Reproductor de video encendido");
	}

	play(movie: string) {
		console.log(`Reproduciendo ${movie}`);
	}

	stop() {
		console.log("Película detenida");
	}

	off() {
		console.log("Reproductor de video apagado");
	}
}

class PopcornMaker {
	poppingPopCorn() {
		console.log("Haciendo palomitas");
	}

	turnOffPoppingPopCorn() {
		console.log("Deteniendo las palomitas");
	}
}

class HomeTheaterFacade {
	constructor(
		private projector: Projector,
		private soundSystem: SoundSystem,
		private videoPlayer: VideoPlayer,
		private popcornMaker: PopcornMaker
	) {}

	watchMovie(movie: string) {
		console.log("Preparando para ver la película\n");
		this.projector.turnOn();
		this.soundSystem.on();
		this.popcornMaker.poppingPopCorn();
		this.videoPlayer.on();
		this.videoPlayer.play(movie);
		console.log("> Disfrute la película\n");
	}

	endWatchingMovie() {
		console.log("Preparando para detener la película\n");
		this.projector.turnOff();
		this.soundSystem.off();
		this.popcornMaker.turnOffPoppingPopCorn();
		this.videoPlayer.stop();
		this.videoPlayer.off();
		console.log("> Sistema Apagado\n");
	}
}

function main() {
	const homeTheaterFacade = new HomeTheaterFacade(
		new Projector(),
		new SoundSystem(),
		new VideoPlayer(),
		new PopcornMaker()
	);
	homeTheaterFacade.watchMovie("The Avengers");
	homeTheaterFacade.endWatchingMovie();
}

main();
