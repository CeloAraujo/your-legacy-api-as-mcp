# Customers API

API REST de customers criada com Node.js, Fastify e MongoDB.

## Stacks

- Node.js 20+
- Fastify
- MongoDB
- Docker Compose
- Node.js Test Runner

## Instalar dependencias

```bash
npm install
```

## Rodar a API

Suba o MongoDB:

```bash
docker compose up -d mongodb
```

Inicie a API:

```bash
npm start
```

A API fica disponivel em:

```text
http://localhost:9999
```

Health check:

```bash
curl http://localhost:9999/v1/health
```

## Rodar testes

```bash
docker compose up -d mongodb
npm test
```

## Endpoints

Criar customer:

```bash
curl -X POST http://localhost:9999/v1/customers \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "phone": "123456789"}'
```

Listar customers:

```bash
curl http://localhost:9999/v1/customers
```

Buscar customer por ID:

```bash
curl http://localhost:9999/v1/customers/<customer_id>
```

Atualizar customer:

```bash
curl -X PUT http://localhost:9999/v1/customers/<customer_id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "phone": "987654321"}'
```

Remover customer:

```bash
curl -X DELETE http://localhost:9999/v1/customers/<customer_id>
```
