/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Interfaz PaymentProcessor
interface PaymentProcessor {
	processPayment(amount: number): void;
}

// 2. Clases de Servicios de Pago Externos
// Estas clases simulan los servicios externos de PayPal, Stripe y MercadoPago

class PayPalService {
	sendPayment(amount: number): void {
		console.log(`Procesando pago de $${amount} con %cPayPal`, COLORS.blue);
	}
}

class StripeService {
	makeCharge(amount: number): void {
		console.log(
			`Procesando pago de $${amount} con %cStripe`,
			COLORS.purple
		);
	}
}

class MercadoPagoService {
	pay(amount: number): void {
		console.log(
			`Procesando pago de $${amount} con %cMercadoPago`,
			COLORS.yellow
		);
	}
}

// 3. Clases Adaptadoras

// Adaptador para PayPal
class PayPalAdapter implements PaymentProcessor {
	#service: PayPalService;

	constructor(service: PayPalService) {
		this.#service = service;
	}

	processPayment(amount: number): void {
		this.#service.sendPayment(amount);
		console.log("Pago Realizado por Paypal");
	}
}

// Adaptador para Stripe
class StripeAdapter implements PaymentProcessor {
	#service: StripeService;

	constructor(service: StripeService) {
		this.#service = service;
	}

	processPayment(amount: number): void {
		this.#service.makeCharge(amount);
		console.log("Pago realizado por stripe");
	}
}

// Adaptador para MercadoPago
class MercadoPagoAdapter implements PaymentProcessor {
	#service: MercadoPagoService;

	constructor(service: MercadoPagoService) {
		this.#service = service;
	}

	processPayment(amount: number): void {
		this.#service.pay(amount);
		console.log("Pago realizado por Mercado Pago");
	}
}

// 4. Código Cliente para probar el Adapter

function main() {
	const paymentAmount = 100;

	// TODO: Agregar los adaptadores para los servicios de pago
	const paypalProcessor = new PayPalAdapter(new PayPalService());
	const stripeProcessor = new StripeAdapter(new StripeService());
	const mercadoPagoProcessor = new MercadoPagoAdapter(
		new MercadoPagoService()
	);

	// Procesar pagos con los diferentes servicios
	// Los 3 procesadores de pago trabajan exactamente igual después de adaptaros
	console.log("Usando PayPal:");
	paypalProcessor.processPayment(paymentAmount);

	console.log("\nUsando Stripe:");
	stripeProcessor.processPayment(paymentAmount);

	console.log("\nUsando MercadoPago:");
	mercadoPagoProcessor.processPayment(paymentAmount);
}

main();
