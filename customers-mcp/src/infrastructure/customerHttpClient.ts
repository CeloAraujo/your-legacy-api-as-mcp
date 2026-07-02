import { type CustomerMutation, type Customer, type CustomerUpdate } from "../domain/customer.ts"

export class CustomerHttpClient {
    private baseUrl: string
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private normalizeCustomer(customer: Customer & { id?: string }): Customer {
        const { id, ...remaining } = customer
        return {
            ...remaining,
            _id: customer._id ?? id,
        }
    }

    private async parseJsonResponse<T>(res: Response): Promise<T> {
        if (!res.ok) {
            throw new Error(`Customers API request failed with status ${res.status}`)
        }

        return res.json() as Promise<T>
    }

    async listCustomers(): Promise<Customer[]> {
        const res = await fetch(`${this.baseUrl}/customers`)
        const customers = await this.parseJsonResponse<Array<Customer & { id?: string }>>(res)
        return customers.map(customer => this.normalizeCustomer(customer))
    }

    async createCustomer(customer: Customer) {
        const res = await fetch(`${this.baseUrl}/customers`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer),
        })
        return this.parseJsonResponse<CustomerMutation>(res)
    }

    async getCustomerById(id: string): Promise<Customer | null> {
        const res = await fetch(`${this.baseUrl}/customers/${id}`)
        if (res.status === 404) return null

        const customer = await this.parseJsonResponse<Customer & { id?: string }>(res)
        return this.normalizeCustomer(customer)
    }

    async updateCustomer(customer: CustomerUpdate) {
        const {_id, ...remaining } = customer
        const res = await fetch(`${this.baseUrl}/customers/${_id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(remaining),
        })

        return this.parseJsonResponse<CustomerMutation>(res)
    }

    async deleteCustomer(id: string): Promise<CustomerMutation> {
        const response = await fetch(`${this.baseUrl}/customers/${id}`, {
            method: "DELETE"
        })

        return this.parseJsonResponse<CustomerMutation>(response)
    }
}
