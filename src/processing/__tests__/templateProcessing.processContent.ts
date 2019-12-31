import * as path from "path";
import {IFileDefinition} from "../../models";
import * as fileUtils from "../../utils/fileUtils";
import {processContent} from "../templateProcessing";

jest.mock("../../utils/fileUtils");

describe("TemplateProcessor.processContent", () => {
    test("Should return static content", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const file: IFileDefinition = {
            config: "",
            content: `Content`,
        };

        const result = processContent(file, {
            command: null,
            content: null,
            file: null,
            name: "test",
            path: path.join("rusith", "app"),
        });
        expect(result).toBe("Content");
    });

    test("Should return static content - multiline", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const content = `Content
fsh`;
        const file: IFileDefinition = {
            config: "",
            content,
        };

        const result = processContent(file, {
            command: null,
            content: null,
            file: null,
            name: "test",
            path: path.join("rusith", "app"),
        });
        expect(result).toBe(content);
    });

    test("Should be able to use arguments inside the content", () => {
        const result = processContent({
            config: "",
            content: "export class {{className}} {}",
        }, {
            command: null,
            content: null,
            file: null,
            name: "test",
            path: path.join("rusith", "app"),
        }, [{
            name: "className",
            value: "Dog",
        }]);
        expect(result).toBe("export class Dog {}");
    });

    test("Should replace the $path placeholder inside content", () => {
        const result = processContent({
            config: "",
            content: "export class Test {} // $path",
        }, {
            command: null,
            content: null,
            file: null,
            name: null,
            path: path.join("rusith", "app", "App"),
        });
        expect(result).toBe("export class Test {} // " + path.join("rusith", "app"));
    });

    test("Should replace the $name placeholder inside content", () => {
        const result = processContent({
            config: "",
            content: "export class Test {} // $name",
        }, {
            command: null,
            content: null,
            file: null,
            name: null,
            path: path.join("rusith", "app", "App"),
        });
        expect(result).toBe("export class Test {} // App");
    });

    test("Should replace the $name and $path placeholders inside content", () => {
        const result = processContent({
            config: "",
            content: "export class Test {} // $path -> $name",
        }, {
            command: null,
            content: null,
            file: null,
            name: null,
            path: path.join("rusith", "app", "components", "general", "ButtonComponent"),
        });
        expect(result)
            .toBe(`export class Test {} // ${path.join("rusith", "app", "components", "general")} -> ButtonComponent`);
    });
});
