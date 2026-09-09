import { appConfig } from "../utils/app-config";
import OpenAI from "openai";

class GptService {

    private openai = new OpenAI({
        apiKey: appConfig.openaiApiKey,
        dangerouslyAllowBrowser: true
    });

    public async getCompletion(question: string): Promise<string> {

        const body: OpenAI.Responses.ResponseCreateParams = {
            model: "gpt-5",
            input: question,
            tools: [
                {
                    type: "mcp",
                    server_label: "Northwind",
                    server_description: "Northwind traders MCP server.",
                    require_approval: "never",
                    server_url: appConfig.mcpServerUrl
                }
            ]
        };

        const response = await this.openai.responses.create(body);
        const completion = response.output_text;
        return completion;
    }

}

export const gptService = new GptService();
