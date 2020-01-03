import * as readline from "readline";
import {colors, getColoredText, getConfirmation, getRelevantArguments} from "../cliUtils";
jest.mock("readline");

describe("CliUtils.getRelevantArguments", () => {

    test("Get arguments should return empty if input is empty", () => {
        const result = getRelevantArguments([]);
        expect(result.length).toBe(0);
    });

    test("Get arguments should return empty if input is null", () => {
        const result = getRelevantArguments(null);
        expect(result.length).toBe(0);
    });

    test("Get arguments should return empty list if input length is two", () => {
        const result = getRelevantArguments(["a", "b"]);
        expect(result.length).toBe(0);
    });

    test("Get arguments should return last item if input length is 3", () => {
        const result = getRelevantArguments(["a", "b", "c"]);
        expect(result.length).toBe(1);
        expect(result[0]).toBe("c");
    });

    test("Get arguments should return last items if input length is more than 3 long", () => {
        const result = getRelevantArguments(["a", "b", "c", "d"]);
        expect(result.length).toBe(2);
        expect(result[0]).toBe("c");
        expect(result[1]).toBe("d");
    });
});

describe("getColoredText", () => {
    test("Should return the original content if the color is not provided", () => {
        const text = "original content";
        const result = getColoredText(text, null);
        expect(result[0]).toBe("%s");
        expect(result[1]).toBe(text);
    });

    test("Should replace color tag - green", () => {
        const text = "original content";
        const result = getColoredText(text, colors.fgGreen);
        expect(result[0]).toBe(`${colors.fgGreen}%s${colors.reset}`);
        expect(result[1]).toBe(text);
    });
});

describe("getConfirmation", () => {
    test("Should not call log if no message", async () => {
        let called = false;
        (readline as any).setMockFn(readline.createInterface, jest.fn()
            .mockImplementation(() => {
                called = true;
            }),
        );

        await getConfirmation(null);
        await getConfirmation("");

        expect(called).toBeFalsy();
    });

    test("Should call the readline with correct question", async () => {
        const question = "Do you confirm this action";
        let called = false;
        (readline as any).setMockFn(readline.createInterface, jest.fn().mockReturnValue({
            question: jest.fn()
                .mockImplementation((q, c) => { called = q === `${question}? (Y/n)`; c("y"); }),
        }));

        await getConfirmation(question);
    });

    test("Should return true if the user confirms the action with simple y", async () => {
        const question = "Do you confirm this action";
        (readline as any).setMockFn(readline.createInterface, jest.fn().mockReturnValue({
            question: jest.fn()
                .mockImplementation((q, c) => { c("y"); }),
        }));

        expect(await getConfirmation(question)).toBeTruthy();
    });

    test("Should return true if the user confirms the action with simple y and extra text", async () => {
        const question = "Do confirm this action";
        (readline as any).setMockFn(readline.createInterface, jest.fn().mockReturnValue({
            question: jest.fn()
                .mockImplementation((q, c) => { c("yes"); }),
        }));

        expect(await getConfirmation(question)).toBeTruthy();
    });

    test("Should return true if the user confirms the action with capital Y", async () => {
        const question = "Do you confirm this action";
        (readline as any).setMockFn(readline.createInterface, jest.fn().mockReturnValue({
            question: jest.fn()
                .mockImplementation((q, c) => { c("Y"); }),
        }));

        expect(await getConfirmation(question)).toBeTruthy();
    });

    test("Should return true if the user confirms the action with capital Y and extra text", async () => {
        const question = "Do confirm this action";
        (readline as any).setMockFn(readline.createInterface, jest.fn().mockReturnValue({
            question: jest.fn()
                .mockImplementation((q, c) => { c("Yes no"); }),
        }));

        expect(await getConfirmation(question)).toBeTruthy();
    });

    test("Should return false if the SIGINT is called", async () => {
        const question = "Do confirm this action";
        (readline as any).setMockFn(readline.createInterface, jest.fn().mockReturnValue({
            on: jest.fn().mockImplementation((e, callback) => {
                if (e === "SIGINT") {
                    setTimeout(callback, 10);
                }
            }),
            question: jest.fn()
                .mockImplementation(() => { /**/ }),
        }));

        expect(await getConfirmation(question)).toBeFalsy();
    });

});
