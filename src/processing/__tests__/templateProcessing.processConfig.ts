import * as path from "path";
import {ITemplateDefinition} from "../../models";
import * as fileUtils from "../../utils/fileUtils";
import {processConfig} from "../templateProcessing";

jest.mock("../../utils/fileUtils");

describe("processConfig", () => {
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
            args: [],
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("/component", "App"),
            },
        };
        const result = processConfig("$path", def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component"));
    });

    test("Should identify $name", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            args: [],
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("component", "App"),
            },
        };
        const result = processConfig("$path/$name.tsx", def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component", "App.tsx"));
    });

    test("Path separator should be identified in all platforms", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            args: [],
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("component", "App"),
            },
        };
        const result = processConfig("$path/someFolder/$name.tsx", def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component", "someFolder", "App.tsx"));
    });

    test("A variable can be injected to config string", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            args: [],
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("component", "App"),
            },
        };
        const result = processConfig("$path/{{subFolder}}/$name.tsx", def.template, [{
            name: "subFolder",
            value: "folder1",
        }]);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component", "folder1", "App.tsx"));
    });

    test("A path section before $path should work", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            args: [],
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("common", "App"),
            },
        };
        const result = processConfig("/components/$path/$name.tsx", def.template, []);
        expect(result.fullPath).toBe(path.join("rusith", "app", "components", "common", "App.tsx"));
    });
});
