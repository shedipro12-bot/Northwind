import { OpenAIEmbedding } from "@llamaindex/openai";
import { Settings, storageContextFromDefaults, TextNode, VectorStoreIndex } from "llamaindex";
import { appConfig } from "../utils/app-config";
import path from "path";

class RagRetrieval {

    // Vector store:
    private vectorStore: VectorStoreIndex = null!;

    public constructor() {
        this.loadVectorDB();
    }

    // Load vector-db once:
    private async loadVectorDB(): Promise<void> {

        // RAG Settings: 
        Settings.embedModel = new OpenAIEmbedding({ apiKey: appConfig.openaiApiKey }); // Embedding model to use for the vector db.

        // Define the vector-db storage: 
        const vectorDbFolder = path.join(__dirname, "..", "assets", "vector-db");
        const vectorDbStorage = await storageContextFromDefaults({ persistDir: vectorDbFolder });

        // Read the vector-db:
        this.vectorStore = await VectorStoreIndex.init({ storageContext: vectorDbStorage });
    }

    // Retrieve relevant chunks: 
    public async retrieve(question: string, topResultsCount: number): Promise<string> {

        // Retrieve relevant chunks from the given question: 
        const results = await this.vectorStore.asRetriever({ similarityTopK: topResultsCount }).retrieve(question);

        // Combine results into chunks:
        let chunks = "";
        for(let i = 0; i < results.length; i++) {
            const score = results[i].score;
            const text = (results[i].node as TextNode).text.replace(/\s+/g, " ");
            chunks += `[chunk ${i+1} | score: ${score}]: ${text}\n\n`;
        }

        // Return chunks: 
        return chunks;
    }

}

export const ragRetrieval = new RagRetrieval();
