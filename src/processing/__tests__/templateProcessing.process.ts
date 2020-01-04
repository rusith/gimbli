import * as path from "path";
import {ITemplateDefinition} from "../../models";
import * as fileUtils from "../../utils/fileUtils";
import {processIf, processTemplate, splitPath} from "../templateProcessing";

jest.mock("../../utils/fileUtils");

describe("process", () => {
    test("Should return the command set", () => {
        (fileUtils as any).setMockFn(fileUtils.getCurrentDirectory, () => path.join("rusith", "app"));
        const def: ITemplateDefinition = {
            args: [],
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

    test("Should return the template instance", () => {

        const def: ITemplateDefinition = {
            args: [],
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
        expect(result.template).toBe(def.template);
    });

    test("Should not process file if @if is false - two files", () => {
        const def: ITemplateDefinition = {
            args: [{
                name: "isFalse",
                value: false,
            }],
            files: [{
                config: "$path/$name.txt",
                content: "contentOne",
                if: "isFalse",
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
        expect(result.writeFiles.length).toBe(1);
        expect(result.writeFiles[0].content).toBe("contentTwo");
    });

    test("Should not process file if @if is false - one file", () => {
        const def: ITemplateDefinition = {
            args: [{
                name: "isFalse",
                value: false,
            }],
            files: [{
                config: "$path/$name.txt",
                content: "contentOne",
                if: "isFalse",
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
        expect(result.writeFiles.length).toBe(0);
    });
});

describe("processIf", () => {
    test("Should be able to access the args as context - true value", () => {
        const result = processIf("isTrue", [ {
            name: "isTrue",
            value: true,
        }], "app/App");

        expect(result).toBeTruthy();
    });

    test("Should be able to access the args as context - false value", () => {
        const result = processIf("isFalse", [ {
            name: "isFalse",
            value: false,
        }], "app/App");

        expect(result).toBeFalsy();
    });

    test("Null value should be false", () => {
        const result = processIf("nullVal", [ {
            name: "nullVal",
            value: null,
        }], "app/App");

        expect(result).toBeFalsy();
    });

    test("Equal should work", () => {
        const result = processIf("val === text", [ {
            name: "val",
            value: "abc",
        }, {
            name: "text",
            value: "abc",
        }], "app/App");

        expect(result).toBeTruthy();
    });

    test("ToLowerCase should work", () => {
        const result = processIf("'abc' === text.toLowerCase()", [{
            name: "text",
            value: "ABC",
        }], "app/App");

        expect(result).toBeTruthy();
    });

    test("Accessing Node APIs should error", () => {
        expect(() => processIf("process", [], "app/App")).toThrow();
    });

    test("Should be able to use name in the condition", () => {
        const result = processIf("name === 'App'", [], "app/App");
        expect(result).toBeTruthy();
    });

    test("Should be able to use name in the condition - false expression", () => {
        const result = processIf("name !== 'App'", [], "app/App");
        expect(result).toBeFalsy();
    });

    test("Arguments should override name", () => {
        const result = processIf("name === 'ABC'", [{
            name: "name",
            value: "ABC",
        }], "app/App");

        expect(result).toBeTruthy();
    });
});

describe("splitPath", () => {
    test("Should return the base name and dirname", () => {
        const [name, p] = splitPath("template/gen/App");
        expect(name).toBe("App");
        expect(p).toBe("template/gen");
    });
});
