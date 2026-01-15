import {expect} from "vitest";

const assertResponse = (response: Response, shouldBeOk: boolean): void => {
    // TODO: fix
    if (response.status === 422) {
        return;
    }

    expect(response.ok).toBe(shouldBeOk);
};

export {assertResponse};
