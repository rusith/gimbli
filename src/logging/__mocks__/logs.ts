import {mapMocks} from "../../utils/mocking";

let logInfoMock: any = () => null;
let logWarningMock: any = () => null;
let logSuccessMock: any = () => null;
let logErrorMock: any = () => null;

export const setMockFn =  mapMocks([
    [logInfo, (f) => { logInfoMock = f; }],
    [logWarning, (f) => { logWarningMock = f; }],
    [logError, (f) => { logErrorMock = f; }],
    [logSuccess, (f) => { logSuccessMock = f; }],
]);

export function logInfo(...args) {
    logInfoMock(...args);
}

export function logWarning(...args) {
    logWarningMock(...args);
}

export function logError(...args) {
    logErrorMock(...args);
}

export function logSuccess(...args) {
    logSuccessMock(...args);
}
