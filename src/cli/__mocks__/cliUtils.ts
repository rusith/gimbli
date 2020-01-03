import {mapMocks} from "../../utils/mocking";
const original = jest.requireActual("../cliUtils");

let getRelevantArgumentsMock: any = original.getRelevantArguments;
let getConfirmationMock: any = async () => true;

export const setMockFn = mapMocks([
    [getConfirmation, (f) => { getConfirmationMock = f; }],
    [getRelevantArguments, (f) => { getRelevantArgumentsMock = f; }],
]);

export function getConfirmation(...args): Promise<boolean> {
    return getConfirmationMock(...args);
}

export function getRelevantArguments(...args) {
    return getRelevantArgumentsMock(...args);
}
