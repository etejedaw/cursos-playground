import { randomUUID } from "node:crypto";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand,
	UpdateCommand,
	GetCommand
} from "@aws-sdk/lib-dynamodb";

const sqsClient = new SQSClient({ region: process.env.REGION });
const client = new DynamoDBClient({ region: process.env.REGION });
const docClient = DynamoDBDocumentClient.from(client);

export const newOrder = async event => {
	const orderId = randomUUID();
	try {
		const orderDetails = JSON.parse(event.body);
		const order = { orderId, ...orderDetails };

		await saveItemToDynamoDB(order);

		const PENDING_ORDERS_QUEUE = process.env.PENDING_ORDERS_QUEUE;
		await sendMessageToSQS(order, PENDING_ORDERS_QUEUE);

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
	const orderId = event.pathParameters.orderId;

	try {
		const order = await getItemFromDynamoDb(orderId);
		return {
			statusCode: 200,
			body: JSON.stringify(order)
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify(error)
		};
	}
};

export const prepOrder = async event => {
	const body = JSON.parse(event.Records[0].body);
	const orderId = body.orderId;
	await updateStatusInOrder(orderId, "COMPLETED");
	return;
};

export const sendOrder = async event => {
	if (event.Records[0].eventName === "MODIFY") {
		const eventBody = event.Records[0].dynamodb;
		const orderDetails = eventBody.NewImage;

		const ORDERS_TO_SEND_QUEUE_URL = process.env.ORDERS_TO_SEND_QUEUE_URL;

		const order = {
			orderId: orderDetails.orderId.S,
			pizza: orderDetails.pizza.S,
			customerId: orderDetails.customerId.S,
			order_status: orderDetails.order_status.S
		};

		await sendMessageToSQS(order, ORDERS_TO_SEND_QUEUE_URL);
	}
	return;
};

async function sendMessageToSQS(message, queueUrl) {
	const params = {
		QueueUrl: queueUrl,
		MessageBody: JSON.stringify(message)
	};

	try {
		const command = new SendMessageCommand(params);
		const data = await sqsClient.send(command);
		console.log("Message sent successfully", data.MessageId);
		return data;
	} catch (error) {
		console.error("Error sending message", error);
		throw error;
	}
}

async function saveItemToDynamoDB(item) {
	const params = {
		TableName: process.env.ORDERS_TABLE,
		Item: item
	};
	try {
		const command = new PutCommand(params);
		const response = await docClient.send(command);
		return response;
	} catch (error) {
		console.error("Error saving item", error);
		throw error;
	}
}

async function updateStatusInOrder(orderId, status) {
	const params = {
		TableName: process.env.ORDERS_TABLE,
		Key: { orderId },
		UpdateExpression: "SET order_status = :c",
		ExpressionAttributeValues: { ":c": status },
		ReturnValues: "ALL_NEW"
	};

	try {
		const command = new UpdateCommand(params);
		const response = await docClient(command);
		return response.Attributes;
	} catch (error) {
		console.error("Eror updating item:", err);
		throw err;
	}
}

async function getItemFromDynamoDb(orderId) {
	const params = {
		TableName: process.env.ORDERS_TABLE,
		Key: { orderId }
	};

	try {
		const command = new GetCommand(params);
		const response = await docClient.send(command);

		if (!response.Item) throw new Error("Item not found");
		return response.Item;
	} catch (error) {
		throw error;
	}
}
