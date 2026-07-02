import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerListCustomersPrompt(server: McpServer) {
    server.registerPrompt(
        "list_customers_prompt",
        {
            description: "Prompt to list all customers using the list_customers tool",
            argsSchema: {},
        },
        () => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: "List all customers using the list_customers tool. Return the result in a concise table with _id, name, and phone.",
                    },
                },
            ],
        })
    )
}
