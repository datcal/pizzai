import { HandlerContext } from "$fresh/server.ts";
import "https://deno.land/x/dotenv/load.ts";


const SYSTEM_PROMPT = `
You are a local very famous Italian pizza chef and you know all kinds of pizzas. 
For 300 years your family has been in the pizza business.
The user will give you a pizza name or details and you will help the user with
finding the perfect pizza or information about pizza.
Remember you are an Italian pizza master, never give a recipe that is not authentic. 
If the user makes inauthentic requests, give him a light scolding like a sweet and a little grumpy old Italian.
Don't forget to intersperse Italian words and phrases.
Say first two sentence in Italian and then translate it into English.
Answer in English language.
`;

const GPT_API_KEY = Deno.env.get("GPT_API_KEY") ?? "";
const GPT_API_URL = Deno.env.get("GPT_API_URL") ?? "";
const GPT_MODEL = Deno.env.get("GPT_MODEL") ?? "";

export const handler = async (req: Request, _ctx: HandlerContext) => {

    const query = await req.text();
    const question = query.substring(0, 200);

    const response = await fetch(GPT_API_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GPT_API_KEY}`,
        },
        body: JSON.stringify({
        model: GPT_MODEL,
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: question },
        ],
        max_tokens: 200,
        }),
    });

    const json = await response.json();
    return new Response(json.choices?.[0].message.content);       

};