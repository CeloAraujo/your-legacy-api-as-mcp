import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerDeleteCustomerPrompt(server: McpServer) {
    server.registerPrompt(
        "delete_customer_prompt",
        {
            description: "Prompt to delete a customer by _id after confirming intent",
            argsSchema: {
                _id: z.string().describe("MongoDB ObjectId of the customer to delete"),
            },
        },
        ({ _id }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Delete the customer with _id "${_id}" using the delete_customer tool. Confirm that this is a destructive action before executing it.`,
                    },
                },
            ],
        })
    )
}
