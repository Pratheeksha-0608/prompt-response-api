// routes/vectordb.js
import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbedding } from "../utils/embeddings.js";
const pinecone = new Pinecone({
  apiKey: process.env.PINE_CONE
});
const documents = [
  { id: "1", text: "NodeJS is a JavaScript runtime built on Chrome's V8 engine" },
  { id: "2", text: "React is a frontend library for building user interfaces" },
  { id: "3", text: "MongoDB is a NoSQL database that stores data in JSON format" },
  { id: "4", text: "Express is a minimal web framework for NodeJS" },
  { id: "5", text: "LangChain is a framework for building LLM applications" },
  { id: "6", text: "ChromaDB is a vector database for semantic search" },
  { id: "7", text: "Embeddings convert text into numerical vectors" }
];
export async function storeDocuments() {
  const index = pinecone.Index("sample-index").namespace("example-namespace");
  const vectors = [];

  console.log(`Starting embedding generation for ${documents.length} documents...`);

  for (const doc of documents) {
    try {
      const embedding = await getEmbedding(doc.text);
      
      if (!Array.isArray(embedding)) {
        console.error(`Skipping doc ${doc.id}: Embedding is not an array.`);
        continue;
      }

      vectors.push({
        id: doc.id,
        values: embedding,
        metadata: { text: doc.text }
      });
    } catch (error) {
      console.error(`Error generating embedding for doc ${doc.id}:`, error.message);
    }
  }
  if (vectors.length === 0) {
    console.error("Aborting Upsert: No valid vectors were generated.");
    return;
  }
  console.log(`Prepared ${vectors.length} total vectors. Upserting...`);
const upsertRequest={vectors};
  try {
    await index.upsert({upsertRequest});

    console.log("All vectors stored successfully in Pinecone!");
    return "Documents stored successfully";
  } catch (upsertError) {
    console.error("Pinecone rejected the payload batch:", upsertError.message);
    throw upsertError;
  }
}
// Execute the function safely
storeDocuments().catch(err => console.error("Execution failed:", err));