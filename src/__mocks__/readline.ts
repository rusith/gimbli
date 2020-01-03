let createInterfaceMock: any = () => null;

export function setMockFn(fn: any, mock: any) {
    if (fn === createInterface) {
        createInterfaceMock =  mock;
    }
}
export function createInterface() {
    return createInterfaceMock();
}
