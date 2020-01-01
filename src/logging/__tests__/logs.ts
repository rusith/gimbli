import {colors, logError, logInfo, logWarning} from "../logs";

describe("logs.logInfo", () => {
    test("Should call console log with right parameters", () => {
        const spy = jest.spyOn(global.console, "log");
        logInfo("Doing work");
        expect(spy).toBeCalledWith("Doing work");
    });
});

describe("logs.logWarning", () => {
    test("Should call console log with right parameters", () => {
        const spy = jest.spyOn(global.console, "log");
        const message = "This is not right";
        logWarning(message);
        expect(spy).toBeCalledWith(`${colors.fgYellow}%s${colors.reset}`, message);
    });
});

describe("logs.logError", () => {
    test("Should call console log with right parameters", () => {
        const spy = jest.spyOn(global.console, "log");
        const message = "Something went wrong";
        logError(message);
        expect(spy).toBeCalledWith(`${colors.fgRed}%s${colors.reset}`, message);
    });
});
