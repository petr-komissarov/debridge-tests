import {config} from "../src/models"
import {describe, expect, test} from "bun:test"
import {getOrderDetails, getOrders} from "../src/services"

describe("deBridge", () => {

    test("orders", async () => {
            const take = 25

            // 1. fetch orders list
            const orders = await getOrders({take: take})
            expect(orders.length).toEqual(take)

            // 2. filter by wallet address
            const filteredOrders = await getOrders({filter: config.walletAddress, take: take})
            expect(filteredOrders.length).toBeLessThanOrEqual(take)
            expect(filteredOrders).not.toEqual(orders)

            // 3-4. fetch order details + validate wallet address
            async function processOrderDetails(order: any): Promise<void> {
                const orderId = order.orderId.stringValue
                const orderDetails = await getOrderDetails({orderId: orderId})
                expect(JSON.stringify(orderDetails)).toContain(config.walletAddress)
            }

            await Promise.all(filteredOrders.map((order: any) => processOrderDetails(order)))
        },
        {retry: config.maxRetries},
    )
})
