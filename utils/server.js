import 'dotenv/config';   
import OpenAI from "openai";
const API_KEY=process.env.GROQ_API_KEY;
export const client=new OpenAI({
    apiKey:API_KEY,
    baseURL:"https://api.groq.com/openai/v1"
});
export async function getcompletion(prompt,temperature=0){
    const response=await client.chat.completions.create({
        model:"llama-3.1-8b-instant",
        messages:[{role:"user",content:prompt}]
    });
    return response.choices[0].message.content;
}


