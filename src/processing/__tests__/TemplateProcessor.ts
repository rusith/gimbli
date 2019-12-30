import * as path from "path";
import {ITemplateProcessor, TemplateProcessor} from "..";
import {IFileDefinition, ITemplateDefinition} from "../../models";
import {IFileUtils} from "../../utils";
import {RegexUtils} from "../../utils/concrete/RegexUtils";

describe("TemplateProcessor.processConfig", () => {
    test("Should fail if the config is empty", () => {
        const processor = new TemplateProcessor(null, new RegexUtils());
        expect(() => processor.processConfig("", null)).toThrowError("Config should not be empty");
    });

    test("Path is required", () => {
        const config = "name.tsx";
        const processor = new TemplateProcessor(null, new RegexUtils());
        expect(() => processor.processConfig(config, null))
            .toThrowError("$path is required in the template config");
    });

    test("Should identify $path", () => {
        const fileUtils: IFileUtils = {
            getCurrentDirectory(): string {
                return path.join("rusith/app");
            },
        };
        const processor = new TemplateProcessor(fileUtils, new RegexUtils());
        const def: ITemplateDefinition = {
            files: null,
            template: {
                command: null,
                content: null,
                file: null,
                name: "component",
                path: path.join("/component/App"),
            },
        };
        const result = processor.processConfig("$path" , def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component"));
    });

    test("Should identify $name", () => {
        const fileUtils: IFileUtils = {
            getCurrentDirectory(): string {
                return path.join("rusith", "app");
            },
        };
        const processor = new TemplateProcessor(fileUtils, new RegexUtils());
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
        const result = processor.processConfig("$path/$name.tsx" , def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component", "App.tsx"));
    });

    test("Path separator should be identified in all platforms", () => {
        const fileUtils: IFileUtils = {
            getCurrentDirectory(): string {
                return path.join("rusith", "app");
            },
        };
        const processor = new TemplateProcessor(fileUtils, new RegexUtils());
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
        const result = processor.processConfig("$path/someFolder/$name.tsx" , def.template);
        expect(result.fullPath).toBe(path.join("rusith", "app", "component", "someFolder", "App.tsx"));
    });
});

describe("TemplateProcessor.processContent", () => {
    test("Should return static content", () => {
        const fileUtils: IFileUtils = {
            getCurrentDirectory(): string {
                return "/rusith/app/";
            },
        };
        const processor = new TemplateProcessor(fileUtils, new RegexUtils());
        const file: IFileDefinition = {
            config: "",
            content: `Content`,
        };

        const result = processor.processContent(file);
        expect(result).toBe("Content");
    });

    test("Should return static content - multiline", () => {
        const fileUtils: IFileUtils = {
            getCurrentDirectory(): string {
                return "/rusith/app/";
            },
        };
        const processor = new TemplateProcessor(fileUtils, new RegexUtils());

        const content = `Content
fsh`;
        const file: IFileDefinition = {
            config: "",
            content,
        };

        const result = processor.processContent(file);
        expect(result).toBe(content);
    });
});

describe("TemplateProcessor.process", () => {
    test("Should return the command set", () => {
        const fileUtils: IFileUtils = {
            getCurrentDirectory(): string {
                return path.join("rusith", "app");
            },
        };
        const processor: ITemplateProcessor = new TemplateProcessor(fileUtils, new RegexUtils());

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

        const result = processor.process(def);
        expect(result.writeFiles[0].content).toBe("contentOne");
        expect(result.writeFiles[0].fullPath).toBe(path.join("rusith", "app", "component", "App.txt"));

        expect(result.writeFiles[1].content).toBe("contentTwo");
        expect(result.writeFiles[1].fullPath).toBe(path.join("rusith", "app", "component", "App.tsx"));
    });
});
