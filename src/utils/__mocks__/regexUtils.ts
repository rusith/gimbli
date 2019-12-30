let  matchMultipleMock: any = () => null;
let  replaceMock: any = () => null;

export function setMockFn(fn: any, mock: any) {
    if (fn === matchMultiple) {
        matchMultipleMock = mock;
    } else if (fn === replace) {
        replaceMock = mock;
    }
}

export function matchMultiple(...args) {
    return matchMultipleMock(...args);
}

export function replace(...args) {
    return matchMultipleMock(...args);
}
