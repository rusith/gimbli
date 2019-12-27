import {ITemplateDiscoveryUtils, ITemplateFile, TemplateFinder} from "..";
import {FileUtils} from "../../utils";

describe("TemplateFinder.findTemplate", () => {
    test("Should fail if the name is not valid", () => {
        const finder = new TemplateFinder(null, null);
        expect(finder.findTemplate(null)).rejects.toEqual(new Error("Invalid command name"));
    });

    test("Should return from the template folder if the template file exists", async () => {
        const utils: ITemplateDiscoveryUtils = {
            async getTemplateFileOfFolder(folder: string): Promise<ITemplateFile[]> {
                return [{
                    fullPath: "templates/test.gimbli",
                    name: "test",
                    nameWithExtension: "test.gimbli",
                }];
            },
            isTemplateFolderPresent(folder: string) {
                return true;
            },
        };

        const finder = new TemplateFinder(utils, new FileUtils());
        const file = await finder.findTemplate("test");
        expect(file.name).toBe("test");
        expect(file.file.fullPath).toBe("templates/test.gimbli");
    });
});
