import {feature, owner} from "allure-js-commons";
import {beforeAll, describe, expect, test} from "vitest";
import {settings} from "../src/models";
import {ordersService} from "../src/services";

describe.concurrent("Orders", async () => {
    const take = 25;
    let orders: any;
    let filteredOrders: any;

    beforeAll(async () => {
        await feature("Orders");
        await owner("Petr Komissarov");
    });

    test.sequential("Fetch orders list", async () => {
        orders = await ordersService.getAll({take: take});
        expect(orders.length).toEqual(take);
    });

    test.sequential("Filter by wallet address", async (context) => {
        context.skip(orders === undefined);

        filteredOrders = await ordersService.getAll({
            filter: settings.walletAddress,
            take: take
        });

        expect(filteredOrders.length).toBeLessThanOrEqual(take);
        expect(filteredOrders).not.toEqual(orders);
    });

    test.sequential("Fetch order details + Validate wallet address", async (context) => {
        context.skip(filteredOrders === undefined);

        const processOrderDetails = async (order: any) => {
            const orderId = order.orderId.stringValue;
            const orderDetails = await ordersService.getDetails(orderId);
            expect(JSON.stringify(orderDetails)).toContain(settings.walletAddress);
        };

        await Promise.all(filteredOrders.map((order: any) => processOrderDetails(order)));
    });
});
