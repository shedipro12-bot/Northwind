// Tools to be used by the MCP server
// Tools - what the MCP server do?

import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { orderService } from "../services/order-service";

class McpTools {

    public async getAllOrdersTool(): Promise<CallToolResult> {
        console.log("Using tool: getAllOrdersTool");
        const orders = await orderService.getAllOrders();
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(orders)
            }]
        };
        return result;
    }

    public async getOneOrderTool(args: { id: number }): Promise<CallToolResult> {
        console.log("Using tool: getOneOrderTool");
        const order = await orderService.getOneOrder(args.id);
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(order)
            }]
        };
        return result;
    }

    public async getOrdersByYearTool(args: { year: number }): Promise<CallToolResult> {
        console.log("Using tool: getOrdersByYearTool");
        const orders = await orderService.getOrdersByYear(args.year);
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(orders)
            }]
        };
        return result;
    }

}

export const mcpTools = new McpTools();
