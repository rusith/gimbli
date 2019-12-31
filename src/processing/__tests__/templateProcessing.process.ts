import * as path from "path";
import {ITemplateDefinition} from "../../models";
import * as fileUtils from "../../utils/fileUtils";
import {processTemplate} from "../templateProcessing";

jest.mock("../../utils/fileUtils");

describe("TemplateProcessor.process", () => {
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
});
