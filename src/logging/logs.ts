import {colors, getColoredText} from "../cli/cliUtils";

export function logInfo(message: string) {
    global.console.log(message);
}

export function logWarning(message: string) {
    global.console.log(...getColoredText(message, colors.fgYellow));
}

export function logError(message: string) {
    global.console.log(...getColoredText(message, colors.fgRed));
}

export function logSuccess(message: string) {
    global.console.log(...getColoredText(message, colors.fgGreen));
}
