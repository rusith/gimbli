import {ICommandArgument} from "../models/ICommandArgument";
import {readArguments, readExtraArguments} from "../readCommands";

describe("CommandReader.read", () => {
    test("Should read the first input as Type ", () => {
        function testInput(inputs: string[]) {
            const command = readArguments(inputs);
            expect(command.type).toBe(inputs[0]);
        }

        testInput(["component"]);
        testInput(["item"]);
    });

    test("Should read the first input as Type ", () => {
        const command = readArguments(["component", "component/App"]);
        expect(command.path).toBe("component/App");
    });

    test("Should return the argument set", () => {
        const result = readArguments(["component", "App", "-componentName",
            "AppComponent"]);
        expect(result.args.length).toBe(1);
        expect(result.args[0].name).toBe("componentName");
        expect(result.args[0].value).toBe("AppComponent");
    });
});

describe("CommandReader.readExtraArguments", () => {
    test("Should read one extra argument without a value specified. the value should be true", () => {
        const result: ICommandArgument[] = readExtraArguments(["component", "App", "-public"]);
        expect(result[0].name).toBe("public");
        expect(result[0].value).toBe(true);
    });

    test("Should read two extra argument without a value specified. the value should be true", () => {
        const result: ICommandArgument[] = readExtraArguments(["component", "App", "-isAbstract", "-isPublic"]);
        expect(result[0].name).toBe("isAbstract");
        expect(result[0].value).toBe(true);

        expect(result[1].name).toBe("isPublic");
        expect(result[1].value).toBe(true);
    });

    test("Should read three extra argument without a value specified. the value should be true", () => {
        const result: ICommandArgument[] = readExtraArguments(["component", "App",
            "-isAbstract", "-setters", "-isPublic"]);
        expect(result[0].name).toBe("isAbstract");
        expect(result[0].value).toBe(true);

        expect(result[1].name).toBe("setters");
        expect(result[1].value).toBe(true);

        expect(result[2].name).toBe("isPublic");
        expect(result[2].value).toBe(true);
    });

    test("Should ignore the extra argument if it doesnt start with a hyphen", () => {
        const result: ICommandArgument[] = readExtraArguments(["component", "App", "isAbstract"]);
        expect(result.length).toBe(0);
    });

    test("Should ignore two extra arguments if they doesnt start with a hyphen", () => {
        const result: ICommandArgument[] = readExtraArguments(["component", "App", "isAbstract", "isPublic"]);
        expect(result.length).toBe(0);
    });

    test("Should ignore three extra arguments if they doesnt start with a hyphen", () => {
        const result: ICommandArgument[] = readExtraArguments(["component", "App", "isAbstract",
            "isPublic", "useSetter"]);
        expect(result.length).toBe(0);
    });

    test("If a value is provided as the next argument to a name it should be the value", () => {
        const result: ICommandArgument[] = readExtraArguments(["component", "App", "-componentName",
            "AppComponent"]);
        expect(result.length).toBe(1);
        expect(result[0].name).toBe("componentName");
        expect(result[0].value).toBe("AppComponent");
    });
});
