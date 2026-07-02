import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../../application/customerService.ts";
import { CustomerMutationSchema, CustomerUpdateSchema } from "../../domain/customer.ts";
import { toolErrorResponse } from "../toolError.ts";

export function registerUpdateCustomersTool(
    server: McpServer,
    service: CustomerService
) {

    server.registerTool(
        "update_customer",
        {
            description:
                "Update an existing customer's name and/or phone number by their _id",

            inputSchema: CustomerUpdateSchema.shape,
            outputSchema: CustomerMutationSchema.shape,
        },
        async (customer) => {
            try {
                const result = await service.updateCustomer(customer)
                return {
                    content: [
                        {
                            type: "text",
                            text: result.message ?? ""
                        }
                    ],
                    structuredContent: result
                }
            } catch (error) {
                return toolErrorResponse("update customer", error)
            }
        }
    )
}
