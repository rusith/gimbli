import { validate} from "../commandLineInputValidation";

describe("CommandLineInputValidator.validate", () => {
    test("Not valid if no enough arguments", () => {
        const args = ["exe", "path"]; // default stuff
        const result = validate(args);
        expect(result.isValid).toBe(false);
    });

    test("Message if no enough arguments", () => {
        const args = ["exe", "path"]; // default stuff
        const result = validate(args);
        expect(result.errors).not.toBe(null);
        expect(result.errors[0]).toBe("Not enough arguments provided.command name and target path is required");
    });

    test("Message if no enough arguments", () => {
        const args = ["exe", "path", "name"]; // default stuff
        const result = validate(args);
        expect(result.errors).not.toBe(null);
        expect(result.errors[0]).toBe("Not enough arguments provided.command name and target path is required");
    });

    test("Should be valid if the arguments are sufficient", () => {
        const args = ["exe", "path", "component", "App"]; // default stuff
        const result = validate(args);
        expect(result.isValid).toBe(true);
        expect(result.errors.length).toBe(0);
    });

    test("Special arguments should not contain unknown arguments", () => {
        const args = ["exe", "path", "component", "App", "--name"]; // default stuff
        const result = validate(args);
        expect(result.isValid).toBe(true);
        expect(result.warnings[0]).toBe("name (--name) is not a recognized argument");
    });

    test("Two special arguments should not contain unknown arguments", () => {
        const args = ["exe", "path", "component", "App", "--name", "--count"]; // default stuff
        const result = validate(args);
        expect(result.isValid).toBe(true);
        expect(result.warnings[0]).toBe("name (--name) is not a recognized argument");
        expect(result.warnings[1]).toBe("count (--count) is not a recognized argument");
    });
});
