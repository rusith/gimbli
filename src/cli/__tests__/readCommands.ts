import {ICommandArgument} from "../models/ICommandArgument";
import {readArguments, readExtraArguments, readValue} from "../readCommands";

describe("readArguments", () => {
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

    test("Arguments with double hyphen should be considered as special arguments", () => {
        const result = readArguments(["component", "App", "-componentName",
            "AppComponent", "--templateDir", "--someOtherArg", "argValue"]);
        expect(result.specialArgs.length).toBe(2);
        expect(result.specialArgs[0].name).toBe("templateDir");
        expect(result.specialArgs[0].value).toBe(true);

        expect(result.specialArgs[1].name).toBe("someOtherArg");
        expect(result.specialArgs[1].value).toBe("argValue");
    });

    test("Should read compound values", () => {
        const result = readArguments(["component", "App", "-someArg", "#j[1,2]"]);
        expect(result.args[0].value[0]).toBe(1);
        expect(result.args[0].value[1]).toBe(2);
    });
});

describe("readExtraArguments", () => {
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

describe("readValue", () => {
    test("Should read normal string value as string", () => {
        const result = readValue("test");
        expect(result).toBe("test");
    });

    test("Should read normal string value as string", () => {
        const result = readValue("test");
        expect(result).toBe("test");
    });

    test("Should read integer as number", () => {
        const result = readValue("1249");
        expect(result).toBe(1249);
    });

    test("Should read float as number", () => {
        const result = readValue("12.49");
        expect(result).toBe(12.49);
    });

    test("Should read compound list as list", () => {
        const result = readValue('#j["val1", "val2"]');
        expect(result.length).toBe(2);
        expect(result[0]).toBe("val1");
        expect(result[1]).toBe("val2");
    });

    test("Should read compound object as object", () => {
        const result = readValue('#j{"name": "Gimbli", "values": [1,2]}');
        expect(result.name).toBe("Gimbli");
        expect(result.values[0]).toBe(1);
        expect(result.values[1]).toBe(2);
    });

    test("Should read compound object as object multiline", () => {
        const result = readValue(`#j
{
    "name": "Gimbli",
    "values": [1,2]
}
`);

        expect(result.name).toBe("Gimbli");
        expect(result.values[0]).toBe(1);
        expect(result.values[1]).toBe(2);
    });
});
