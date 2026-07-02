# Customers MCP

Servidor MCP que expoe uma API REST de customers como ferramentas para clientes compativeis com MCP, como VS Code Copilot Chat, Claude Desktop ou o MCP Inspector.

## Requisitos

- Node.js 22.6+
- API REST `nodejs-fastify-mongodb-crud` rodando em `http://localhost:9999/v1`

## Instalar

```bash
npm install
```

## Rodar

```bash
npm start
```

Por padrao o MCP chama a API em `http://localhost:9999/v1`. Para trocar:

```bash
CUSTOMERS_API_BASE_URL=http://localhost:9999/v1 npm start
```

No PowerShell:

```powershell
$env:CUSTOMERS_API_BASE_URL="http://localhost:9999/v1"
npm.cmd start
```

## Ferramentas MCP

| Tipo | Nome | O que faz |
| --- | --- | --- |
| Tool | `list_customers` | Lista customers via `GET /customers` |
| Tool | `get_customer` | Busca customer por `_id`, `name` ou `phone` |
| Tool | `create_customer` | Cria customer via `POST /customers` |
| Tool | `update_customer` | Atualiza customer via `PUT /customers/:id` |
| Tool | `delete_customer` | Remove customer via `DELETE /customers/:id` |
| Resource | `customers://api-info` | Descreve a API REST usada pelo MCP |
| Prompt | `find_customer_prompt` | Prompt pronto para procurar customers |

## MCP Inspector

Com a API REST rodando:

```bash
npm run mcp:inspect
```

## Testes

Os testes das ferramentas MCP chamam a API REST real. Suba MongoDB e API antes:

```bash
cd ../nodejs-fastify-mongodb-crud
docker compose up -d mongodb
npm start
```

Em outro terminal:

```bash
cd ../customers-mcp
npm test
```
