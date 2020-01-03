import {mapMocks} from "../mocking";

let  matchMultipleMock: any = () => null;
let  replaceMock: any = () => null;

export const setMockFn = mapMocks([
    [replace, (f) => { replaceMock = f; }],
    [matchMultiple, (f) => { matchMultipleMock = f; }],
]);

export function matchMultiple(...args) {
    return matchMultipleMock(...args);
}

export function replace(...args) {
    return matchMultipleMock(...args);
}
