import {assertResponse} from "../assertions"
import {config} from "../models"

export async function getOrderDetails({orderId = "", shouldBeOk = true}): Promise<any> {
    const request: RequestInit = {
        method: "GET",
        redirect: "follow"
    }

    const response: Response = await fetch(`${config.baseUrl}/api/Orders/${orderId}`, request)
    assertResponse(response, shouldBeOk)

    return await response.json()
}

export async function getOrders({
                                    filter = "",
                                    shouldBeOk = true,
                                    skip = 0,
                                    take = 25,
                                }): Promise<any> {
    const body: string = JSON.stringify({
        "filter": filter,
        "filterMode": "Mixed",
        "giveChainIds": [],
        "skip": skip,
        "take": take,
        "takeChainIds": [],
    })

    const request: RequestInit = {
        body: body,
        headers: {"content-type": "application/json-patch+json"},
        method: "POST",
        redirect: "follow"
    }

    const response: Response = await fetch(`${config.baseUrl}/api/Orders/filteredList`, request)
    assertResponse(response, shouldBeOk)

    const json: any = await response.json()
    return json.orders
}
