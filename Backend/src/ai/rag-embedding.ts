import { OpenAIEmbedding } from "@llamaindex/openai";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { Settings, storageContextFromDefaults, VectorStoreIndex } from "llamaindex";
import path from "path";
import { appConfig } from "../utils/app-config";

// To run this file: npm run embed
class RagEmbedding {

    public constructor() {
        this.embed();
    }

    private async embed(): Promise<void> {

        // RAG Settings: 
        Settings.embedModel = new OpenAIEmbedding({ apiKey: appConfig.openaiApiKey }); // Embedding model to use for the vector db.
        Settings.chunkSize = 512; // Size of each chunk in tokens (default is 1024)
        Settings.chunkOverlap = 128; // Overlap between chunks in tokens (default is undefined)

        // Read the knowledge-base: 
        const reader = new SimpleDirectoryReader();
        const docsFolder = path.join(__dirname, "..", "assets", "docs");
        const documents = await reader.loadData({ directoryPath: docsFolder });

        // Define the vector-db storage: 
        const vectorDbFolder = path.join(__dirname, "..", "assets", "vector-db");
        const vectorDbStorage = await storageContextFromDefaults({ persistDir: vectorDbFolder });

        // Create the vector-db files in that folder: 
        const vectorStore = await VectorStoreIndex.fromDocuments(documents, { storageContext: vectorDbStorage });

        // Display total chunks created: 
        const nodes = vectorStore.indexStruct.nodesDict;
        console.log("Total chunks created: " + Object.keys(nodes).length);

    }

}

export const ragEmbedding = new RagEmbedding();
