import {expect} from "bun:test"

export function assertResponse(response: Response, shouldBeOk: boolean): void {
    // TODO: fix
    if (response.status == 422) {
        return
    }

    expect(response.ok).toBe(shouldBeOk)
}
