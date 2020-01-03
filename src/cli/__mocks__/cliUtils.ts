import {mapMocks} from "../../utils/mocking";

let getConfirmationMock: any = async () => true;

export const setMockFn = mapMocks([
    [getConfirmation, (f) => { getConfirmationMock = f; }],
]);

export function getConfirmation(...args): Promise<boolean> {
    return getConfirmationMock(...args);
}
