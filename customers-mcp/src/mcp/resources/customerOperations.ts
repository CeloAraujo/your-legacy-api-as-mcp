import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

type CustomerOperationResource = {
    name: string
    uri: string
    description: string
    method: string
    path: string
    tool: string
    requestBody?: string
    successResponse: string
    notes: string[]
}

const operations: CustomerOperationResource[] = [
    {
        name: "list-customers",
        uri: "customers://operations/list-customers",
        description: "Describes how to list customers through the wrapped REST API",
        method: "GET",
        path: "/customers",
        tool: "list_customers",
        successResponse: "Customer[]",
        notes: [
            "Returns all customers sorted by name.",
            "Use this when the agent needs an overview or must search by partial customer data.",
        ],
    },
    {
        name: "get-customer",
        uri: "customers://operations/get-customer",
        description: "Describes how to get a customer by id through the wrapped REST API",
        method: "GET",
        path: "/customers/:id",
        tool: "get_customer",
        successResponse: "Customer | null",
        notes: [
            "Use _id when available for an exact lookup.",
            "The MCP tool can also search by name or phone by listing customers and matching locally.",
        ],
    },
    {
        name: "create-customer",
        uri: "customers://operations/create-customer",
        description: "Describes how to create a customer through the wrapped REST API",
        method: "POST",
        path: "/customers",
        tool: "create_customer",
        requestBody: "{ name: string, phone: string }",
        successResponse: "{ id: string, message: string }",
        notes: [
            "Both name and phone are required.",
            "Ask the user for missing required fields before calling the tool.",
        ],
    },
    {
        name: "update-customer",
        uri: "customers://operations/update-customer",
        description: "Describes how to update a customer through the wrapped REST API",
        method: "PUT",
        path: "/customers/:id",
        tool: "update_customer",
        requestBody: "{ name: string, phone: string }",
        successResponse: "{ id: string, message: string }",
        notes: [
            "The _id is required to select the customer.",
            "The REST API expects both name and phone in the update body.",
        ],
    },
    {
        name: "delete-customer",
        uri: "customers://operations/delete-customer",
        description: "Describes how to delete a customer through the wrapped REST API",
        method: "DELETE",
        path: "/customers/:id",
        tool: "delete_customer",
        successResponse: "{ id: string, message: string }",
        notes: [
            "The _id is required.",
            "Confirm destructive intent with the user before deleting data.",
        ],
    },
]

function operationText(operation: CustomerOperationResource, baseUrl: string) {
    return [
        `Customer operation: ${operation.name}`,
        "",
        `Base URL: ${baseUrl}`,
        `REST endpoint: ${operation.method} ${operation.path}`,
        `MCP tool: ${operation.tool}`,
        operation.requestBody ? `Request body: ${operation.requestBody}` : undefined,
        `Success response: ${operation.successResponse}`,
        "",
        "Guidance:",
        ...operation.notes.map(note => `- ${note}`),
    ].filter(Boolean).join("\n")
}

export function registerCustomerOperationResources(
    server: McpServer,
    baseUrl: string
) {
    for (const operation of operations) {
        server.registerResource(
            operation.uri,
            operation.uri,
            {
                description: operation.description,
            },
            () => ({
                contents: [
                    {
                        uri: operation.uri,
                        mimeType: "text/plain",
                        text: operationText(operation, baseUrl),
                    },
                ],
            })
        )
    }
}
