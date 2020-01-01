let logInfoMock: any = () => null;
let logWarningMock: any = () => null;
let logSuccessMock: any = () => null;
let logErrorMock: any = () => null;

export function setMockFn(fn: any, mock: any) {
    if (fn === logInfo) {
        logInfoMock = mock;
    } else if (fn === logWarning) {
        logWarningMock = mock;
    } else if (fn === logError) {
        logErrorMock = mock;
    } else if (fn === logSuccess) {
        logSuccessMock =  mock;
    }
}

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

export const colors = {
    fgGreen: "\x1b[32m",
    fgRed: "\x1b[31m",
    fgYellow: "\x1b[33m",
    reset: "\x1b[0m",
};
