export function logInfo(message: string) {
    global.console.log(message);
}

export function logWarning(message: string) {
    global.console.log(`${colors.fgYellow}%s${colors.reset}`, message);
}

export function logError(message: string) {
    global.console.log(`${colors.fgRed}%s${colors.reset}`, message);
}

export function logSuccess(message: string) {
    global.console.log(`${colors.fgGreen}%s${colors.reset}`, message);
}

export const colors = {
    fgGreen: "\x1b[32m",
    fgRed: "\x1b[31m",
    fgYellow: "\x1b[33m",
    reset: "\x1b[0m",
};
