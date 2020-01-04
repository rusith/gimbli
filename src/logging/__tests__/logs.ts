import {colors} from "../../utils/cliUtils";
import {logError, logInfo, logSuccess, logWarning} from "../logs";

describe("logInfo", () => {
    test("Should call console log with right parameters", () => {
        const spy = jest.spyOn(global.console, "log");
        logInfo("Doing work");
        expect(spy).toBeCalledWith("Doing work");
    });
});

describe("logWarning", () => {
    test("Should call console log with right parameters", () => {
        const spy = jest.spyOn(global.console, "log");
        const message = "This is not right";
        logWarning(message);
        expect(spy).toBeCalledWith(`${colors.fgYellow}%s${colors.reset}`, message);
    });
});

describe("logError", () => {
    test("Should call console log with right parameters", () => {
        const spy = jest.spyOn(global.console, "log");
        const message = "Something went wrong";
        logError(message);
        expect(spy).toBeCalledWith(`${colors.fgRed}%s${colors.reset}`, message);
    });
});

describe("logSuccess", () => {
    test("Should call console log with right parameters", () => {
        const spy = jest.spyOn(global.console, "log");
        const message = "Everything went fine";
        logSuccess(message);
        expect(spy).toBeCalledWith(`${colors.fgGreen}%s${colors.reset}`, message);
    });
});
