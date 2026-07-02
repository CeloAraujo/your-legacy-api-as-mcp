import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerListCustomersTool } from "./tools/listCustomers.ts";
import { CustomerService } from "../application/customerService.ts";
import { registerApiInfoResource } from "./resources/apiInfo.ts";
import { registerCustomerOperationResources } from "./resources/customerOperations.ts";
import { registerCreateCustomersTool } from "./tools/createCustomer.ts";
import { registerGetCustomerTool } from "./tools/getCustomer.ts";
import { registerFindCustomerPrompt } from "./prompts/findCustomer.ts";
import { registerListCustomersPrompt } from "./prompts/listCustomers.ts";
import { registerCreateCustomerPrompt } from "./prompts/createCustomer.ts";
import { registerUpdateCustomerPrompt } from "./prompts/updateCustomer.ts";
import { registerDeleteCustomerPrompt } from "./prompts/deleteCustomer.ts";
import { registerUpdateCustomersTool } from "./tools/updateCustomer.ts";
import { registerDeleteCustomersTool } from "./tools/deleteCustomer.ts";
import { CustomerHttpClient } from "../infrastructure/customerHttpClient.ts";

const BASE_URL = process.env.CUSTOMERS_API_BASE_URL ?? "http://localhost:9999/v1";
const customerHttpClient = new CustomerHttpClient(BASE_URL)
const service = new CustomerService(customerHttpClient)

export const server = new McpServer({
    name: "@marceloaraujo/ew-customers-mcp",
    version: "0.0.1",
});

registerListCustomersTool(server, service)
registerGetCustomerTool(server, service)
registerCreateCustomersTool(server, service)
registerApiInfoResource(server, BASE_URL)
registerCustomerOperationResources(server, BASE_URL)
registerListCustomersPrompt(server)
registerFindCustomerPrompt(server)
registerCreateCustomerPrompt(server)
registerUpdateCustomerPrompt(server)
registerDeleteCustomerPrompt(server)
registerUpdateCustomersTool(server, service)
registerDeleteCustomersTool(server, service)
