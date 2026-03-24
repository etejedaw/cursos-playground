import OpenAI from "openai";

const openai = new OpenAI({
	baseURL: "https://api.deepseek.com",
	apiKey: process.env.DEEPSEEK_API_KEY
});

async function main() {
	const question =
		"Cómo podría hacer un sistema de arriendo de stands similar a los arriendos de pasajes de buses?";

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content:
					"You are an expert monolitic software architect in nodejs with typescript." +
					"Your main stack is mariadb/postgresql with sequelize, express, typescript and zod." +
					"Your approach is more theoretical and don't tend to directly provide the database tables in SQL format"
			},
			{
				role: "user",
				content: question
			}
		],
		model: "deepseek-chat"
	});

	const answer = completion.choices[0].message.content;

	console.log(answer);
}

void main();
