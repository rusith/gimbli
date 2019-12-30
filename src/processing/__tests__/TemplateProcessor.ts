import * as path from "path";
import {IFileDefinition, ITemplateDefinition} from "../../models";
import * as fileUtils from "../../utils/fileUtils";
import {processConfig, processContent, processTemplate} from "../templateProcessing";

jest.mock("../../utils/fileUtils");

describe("TemplateProcessor.processConfig", () => {
    test("Should fail if the config is empty", () => {
        expect(() => processConfig("", null)).toThrowError("Config should not be empty");
    });

    test("Path is required", () => {
        const config = "name.tsx";
        expect(() => processConfig(config, null))
            .toThrowError("$path is required in the template config");
    });

    test("Should identify $path", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("/component", "App"),
            },
        };
        const result = processConfig("$path" , def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component"));
    });

    test("Should identify $name", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("component", "App"),
            },
        };
        const result = processConfig("$path/$name.tsx" , def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component", "App.tsx"));
    });

    test("Path separator should be identified in all platforms", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("component", "App"),
            },
        };
        const result = processConfig("$path/someFolder/$name.tsx" , def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component", "someFolder", "App.tsx"));
    });
});

describe("TemplateProcessor.processContent", () => {
    test("Should return static content", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const file: IFileDefinition = {
            config: "",
            content: `Content`,
        };

        const result = processContent(file);
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

        const result = processContent(file);
        expect(result).toBe(content);
    });
});

describe("TemplateProcessor.process", () => {
    test("Should return the command set", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            files: [{
                config: "$path/$name.txt",
                content: "contentOne",
            }, {
                config: "$path/$name.tsx",
                content: "contentTwo",
            }],
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("component", "App"),
            },
        };

        const result = processTemplate(def);
        expect(result.writeFiles[0].content).toBe("contentOne");
        expect(result.writeFiles[0].fullPath).toBe(path.join("rusith", "app", "component", "App.txt"));

        expect(result.writeFiles[1].content).toBe("contentTwo");
        expect(result.writeFiles[1].fullPath).toBe(path.join("rusith", "app", "component", "App.tsx"));
    });
});
