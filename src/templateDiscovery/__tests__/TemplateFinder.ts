import {ITemplateDiscoveryUtils, ITemplateFile, TemplateFinder} from "..";
import {FileUtils} from "../../utils";

describe("TemplateFinder.findTemplate", () => {
    test("Should fail if the name is not valid", async () => {
        const finder = new TemplateFinder(null, null);
        let err: Error = null;
        try {
            await finder.findTemplate(null);
        } catch (e) {
            err = e;
        }

        expect(err!.message).toBe("Invalid command name");
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
        const file = await finder.findTemplate({ type: "test", path: "App"});
        expect(file.name).toBe("test");
        expect(file.path).toBe("App");
        expect(file.file.fullPath).toBe("templates/test.gimbli");
    });

    test("Should throw an error if not in templates folder", async () => {
        const utils: ITemplateDiscoveryUtils = {
            async getTemplateFileOfFolder(folder: string): Promise<ITemplateFile[]> {
                return [];
            },
            isTemplateFolderPresent(folder: string) {
                return true;
            },
        };

        const finder = new TemplateFinder(utils, new FileUtils());
        let err: Error = null;
        try {
            await finder.findTemplate({ type: "test", path: "App"});
        } catch (e) {
            err = e;
        }
        expect(err!.message).toBe(`Template with name (test) not found`);
    });
});
