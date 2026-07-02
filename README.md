# Your Legacy API as MCP

Projeto exemplo mostrando como expor uma API REST existente como um servidor MCP.

## Visao geral

O projeto tem duas partes:

- `nodejs-fastify-mongodb-crud`: API REST de customers feita com Node.js, Fastify e MongoDB.
- `customers-mcp`: servidor MCP em TypeScript que transforma os endpoints da API em tools, resource e prompt.

Fluxo:

```text
Agente com LLM -> Servidor MCP -> API REST Fastify -> MongoDB
```

O MCP nao substitui a API. Ele adapta a API para que clientes com LLM, como VS Code Copilot, Claude Desktop ou Cursor, consigam usar os endpoints como ferramentas.

## Stacks

- Node.js
- TypeScript
- Fastify
- MongoDB
- Docker Compose
- Model Context Protocol SDK
- Zod
- Node.js Test Runner

## Como rodar

Instale as dependencias da API:

```bash
cd nodejs-fastify-mongodb-crud
npm install
```

Instale as dependencias do MCP:

```bash
cd ../customers-mcp
npm install
```

Suba o MongoDB:

```bash
cd ../nodejs-fastify-mongodb-crud
docker compose up -d mongodb
```

Rode a API:

```bash
npm start
```

A API fica disponivel em:

```text
http://localhost:9999/v1
```

Em outro terminal, rode o MCP:

```bash
cd customers-mcp
npm start
```

## Configuracao MCP no VS Code

O arquivo `.vscode/mcp.json` registra o servidor MCP local:

```json
{
  "servers": {
    "customers-mcp": {
      "command": "node",
      "args": [
        "--experimental-strip-types",
        "${workspaceFolder}/customers-mcp/src/index.ts"
      ],
      "env": {
        "CUSTOMERS_API_BASE_URL": "http://localhost:9999/v1"
      }
    }
  }
}
```

Com a API rodando, um cliente MCP consegue chamar as tools expostas pelo servidor.

## Tools MCP

- `list_customers`: lista customers.
- `get_customer`: busca customer por `_id`, `name` ou `phone`.
- `create_customer`: cria customer.
- `update_customer`: atualiza customer.
- `delete_customer`: remove customer.

## Resource MCP

- `customers://api-info`: descreve a API REST usada pelo servidor MCP.

## Prompt MCP

- `find_customer_prompt`: prompt pronto para orientar uma busca de customer.

## Como validar

Valide a API:

```bash
cd nodejs-fastify-mongodb-crud
docker compose up -d mongodb
npm test
```

Valide o MCP:

```bash
cd nodejs-fastify-mongodb-crud
npm start
```

Em outro terminal:

```bash
cd customers-mcp
npm test
```

Os testes MCP dependem da API rodando em `http://localhost:9999/v1`.

## Endpoints REST

- `GET /v1/health`
- `GET /v1/customers`
- `GET /v1/customers/:id`
- `POST /v1/customers`
- `PUT /v1/customers/:id`
- `DELETE /v1/customers/:id`
