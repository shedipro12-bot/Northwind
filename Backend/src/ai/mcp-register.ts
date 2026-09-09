import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { mcpTools } from "./mcp-tools";
import z from "zod";

class McpRegister {

    public registerGetAllOrdersTool(mcpServer: McpServer): void {
        const uniqueName = "get_all_orders";
        const config = {
            description: "Get all database orders."
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getAllOrdersTool);
    }

    public registerGetOneOrderTool(mcpServer: McpServer): void {
        const uniqueName = "get_one_order";
        const config = {
            description: "Get database order by given id.",
            inputSchema: z.object({ id: z.number() })
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getOneOrderTool);
    }

    public registerGetOrdersByYearTool(mcpServer: McpServer): void {
        const uniqueName = "get_orders_by_year";
        const config = {
            description: "Get database orders by given year.",
            inputSchema: z.object({ year: z.number() })
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getOrdersByYearTool);
    }

}

export const mcpRegister = new McpRegister();
