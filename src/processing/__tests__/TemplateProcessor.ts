import {ITemplateProcessor, TemplateProcessor} from "..";
import {ITemplateDefinition} from "../../models";
import {IFileUtils} from "../../utils";

describe("TemplateProcessor.processConfig", () => {
    test("Should fail if the config is empty", () => {
        const processor = new TemplateProcessor(null);
        expect(() => processor.processConfig("", null)).toThrowError("Config should not be empty");
    });

    test("Path is required", () => {
        const config = "name.tsx";
        const processor = new TemplateProcessor(null);
        expect(() => processor.processConfig(config, null))
            .toThrowError("$path is required in the template config");
    });

    test("Should identify $path", () => {
        const fileUtils: IFileUtils = {
            getCurrentDirectory(): string {
                return "/rusith/app/";
            },
        };
        const processor = new TemplateProcessor(fileUtils);
        const def: ITemplateDefinition = {
            files: null,
            template: {
                content: null,
                file: null,
                name: "component",
                path: "/component/App",
            },
        };
        const result = processor.processConfig("$path" , def.template);
        expect(result.fullPath).toBe("/rusith/app/component");
    });

    test("Should identify $name", () => {
        const fileUtils: IFileUtils = {
            getCurrentDirectory(): string {
                return "/rusith/app/";
            },
        };
        const processor = new TemplateProcessor(fileUtils);
        const def: ITemplateDefinition = {
            files: null,
            template: {
                content: null,
                file: null,
                name: "component",
                path: "/component/App",
            },
        };
        const result = processor.processConfig("$path/$name.tsx" , def.template);
        expect(result.fullPath).toBe("/rusith/app/component/App.tsx");
    });
});
