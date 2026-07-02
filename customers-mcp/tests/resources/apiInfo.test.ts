import { describe, it, after, before } from 'node:test'
import assert from 'node:assert'
import { createTestClient } from '../helpers.ts'
import { Client } from '@modelcontextprotocol/sdk/client'

describe('Customer Resources', () => {
    let client: Client

    before(async () => {
        client = await createTestClient()
    })
    after(async () => {
        await client.close()
    })

    it('should list the customers://api-info resource', async () => {
        const { resources } = await client.listResources()
        const info = resources.find(r => r.uri === 'customers://api-info')
        assert.ok(
            info,
            'customers://api-info should exists'
        )

        assert.deepStrictEqual(
            info.description,
            'describes the customers rest API that this MCP server wraps',
            "description should be correct"
        )
    })

    it('should list resources for each customer operation', async () => {
        const { resources } = await client.listResources()
        const uris = resources.map(resource => resource.uri)

        assert.ok(uris.includes('customers://operations/list-customers'))
        assert.ok(uris.includes('customers://operations/get-customer'))
        assert.ok(uris.includes('customers://operations/create-customer'))
        assert.ok(uris.includes('customers://operations/update-customer'))
        assert.ok(uris.includes('customers://operations/delete-customer'))
    })

    it('should read an operation resource with endpoint and tool details', async () => {
        const result = await client.readResource({
            uri: 'customers://operations/create-customer'
        })
        const content = result.contents[0]

        assert.ok('text' in content)
        assert.ok(content.text.includes('POST /customers'))
        assert.ok(content.text.includes('create_customer'))
        assert.ok(content.text.includes('{ name: string, phone: string }'))
    })
})
