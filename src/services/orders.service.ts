import {settings} from "../models";
import {assertResponse} from "../tools";

const ordersService = (function () {
    const getAll = async ({filter = "", skip = 0, take = 25, shouldBeOk = true}) => {
        const body = JSON.stringify({
            filter: filter,
            filterMode: "Mixed",
            giveChainIds: [],
            skip: skip,
            take: take,
            takeChainIds: []
        });

        const request: RequestInit = {
            body: body,
            headers: {"content-type": "application/json-patch+json"},
            method: "POST",
            redirect: "follow"
        };

        const response = await fetch(`${settings.baseUrl}/api/Orders/filteredList`, request);
        assertResponse(response, shouldBeOk);
        const json: any = await response.json();

        return json.orders;
    };

    const getDetails = async (orderId: string = "", shouldBeOk: boolean = true) => {
        const request: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        const response = await fetch(`${settings.baseUrl}/api/Orders/${orderId}`, request);
        assertResponse(response, shouldBeOk);

        return await response.json();
    };

    return {
        getAll: getAll,
        getDetails: getDetails
    };
})();

export {ordersService};
