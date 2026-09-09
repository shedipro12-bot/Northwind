import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { mcpRegister } from "./mcp-register";

class NorthwindMcpServer {

    public create(): McpServer {
        
        // Create mcp server: 
        const mcpServer = new McpServer({
            name: "northwind-mcp-server",
            version: "1.0.0"
        });

        // Register tools: 
        mcpRegister.registerGetAllOrdersTool(mcpServer);
        mcpRegister.registerGetOneOrderTool(mcpServer);
        mcpRegister.registerGetOrdersByYearTool(mcpServer);

        // Return the mcp server object: 
        return mcpServer;
    }

}

export const northwindMcpServer = new NorthwindMcpServer();
