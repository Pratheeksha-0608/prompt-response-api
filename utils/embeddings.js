import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export async function getEmbedding(text) {
  const model = await ai.getGenerativeModel({
    model: "gemini-embedding-001",
  });

  const res = await model.embedContent(text);
  if (!res?.embedding?.values) {
    throw new Error("Embedding response missing values: " + JSON.stringify(res));
  }

  return res.embedding.values;
}