import 'dotenv/config';   
import { GoogleGenAI } from "@google/genai";
import express from "express";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // or gemini-3-flash-preview, etc.
    contents: "give a joke",
  });
  console.log(response.text);
}
main();   