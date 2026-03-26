import OpenAI from "openai";
import { PDFParse } from "pdf-parse";
import { readFileSync } from "node:fs";
import * as readline from "node:readline/promises";

async function generateSystemPrompt() {
	const LINKEDIN_PATH = "./docs/linkedin.pdf";

	const buffer = readFileSync(LINKEDIN_PATH);
	const parser = new PDFParse({ data: buffer });
	const result = await parser.getText();
	const pdfText = result.text;

	const SUMMARY_PATH = "./docs/summary.txt";
	const summaryText = readFileSync(SUMMARY_PATH, "utf-8");

	const NAME = "Esteban";

	return [
		`You are acting as ${NAME}. You are answering questions on ${NAME}'s website, particularly questions related to ${NAME}'s career, background, skills and experience`,
		`Your responsibility is to represent ${NAME} for interactions on the website as faithfully as possible`,
		`You are given a summary of ${NAME}'s background and LinkedIn profile which you can use to answer questions`,
		`Be professional and engaging, as if talking to a potential client or future employer who came across the website. If you don't know the answer, say so.`,
		`## Summary: ${summaryText}`,
		`## LinkedIn Profile: ${pdfText}`,
		`With this context, please chat with the user, always staying in character as ${NAME}.`
	].join("\n");
}

async function chat(message, history = []) {
	const systemPrompt = await generateSystemPrompt();

	const openai = new OpenAI({
		baseURL: "https://api.deepseek.com",
		apiKey: process.env.DEEPSEEK_API_KEY
	});

	const messages = [
		{
			role: "system",
			content: systemPrompt
		}
	]
		.concat(history)
		.concat([{ role: "user", content: message }]);

	const response = openai.chat.completions.create({
		messages,
		model: "deepseek-chat"
	});

	return (await response).choices[0].message.content;
}

async function main() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	const history = [];
	let running = true;

	console.log("Chat iniciado. Envía un mensaje vacío para salir.\n");

	while (running) {
		const userMessage = await rl.question("Tú: > ");

		if (!userMessage.trim()) {
			running = false;
			console.log("Chat finalizado.");
			break;
		}

		const answer = await chat(userMessage, history);
		console.log(`\nAsistente: ${answer}\n`);

		history.push({ role: "user", content: userMessage });
		history.push({ role: "assistant", content: answer });
	}

	rl.close();
}

void main();
