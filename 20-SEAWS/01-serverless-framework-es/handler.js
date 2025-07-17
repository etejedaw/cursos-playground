import { randomUUID } from "node:crypto";

export const newOrder = async event => {
	const orderId = randomUUID();
	try {
		const orderDetails = JSON.parse(event.body);
		const order = { orderId, ...orderDetails };

		return {
			statusCode: 200,
			body: JSON.stringify({ message: order })
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 400,
			body: JSON.stringify({ message: "Invalid JSON format" })
		};
	}
};

export const getOrder = async event => {
	const orderId = event.pathParameters.orderId || "NOT FOUND";

	const orderDetails = {
		order_status: "COMPLETED",
		orderId,
		customerId: "abc123",
		pizza: "Margarita"
	};

	const order = { orderId, ...orderDetails };
	return {
		statusCode: 200,
		body: JSON.stringify({ message: order })
	};
};

export const prepOrder = async event => {
	console.log(event);
	return;
};
