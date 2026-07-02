import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerUpdateSchema } from "../../domain/customer.ts";

export function registerUpdateCustomerPrompt(server: McpServer) {
    server.registerPrompt(
        "update_customer_prompt",
        {
            description: "Prompt to update a customer by _id",
            argsSchema: CustomerUpdateSchema.shape,
        },
        (customer) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Update the customer using the update_customer tool.\nCustomer update: ${JSON.stringify(customer)}`,
                    },
                },
            ],
        })
    )
}
