export function toolErrorResponse(action: string, error: unknown) {
    console.error(`[customers-mcp] ${action} failed`, error)

    return {
        isError: true,
        content: [
            {
                type: "text" as const,
                text: `Unable to ${action}. Check the MCP server logs for details.`,
            },
        ],
    }
}
