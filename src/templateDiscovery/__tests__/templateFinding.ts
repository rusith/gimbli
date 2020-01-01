import * as utils from "../templateDiscoveryUtils";
import {findTemplate} from "../templateFinding";

jest.mock("../templateDiscoveryUtils");

describe("TemplateFinder.findTemplate", () => {
    test("Should fail if the name is not valid", async () => {
        let err: Error = null;
        try {
            await findTemplate(null);
        } catch (e) {
            err = e;
        }

        expect(err!.message).toBe("Invalid command name");
    });

    test("Should return from the template folder if the template file exists", async () => {
        (utils as any).setMockFn(utils.getTemplateFileOfFolder, async () => {
            return [{
                fullPath: "templates/test.gimbli",
                name: "test",
                nameWithExtension: "test.gimbli",
            }];
        });

        (utils as any).setMockFn(utils.isTemplateFolderPresent, async () => true);

        const file = await findTemplate({ type: "test", path: "App", args: [], specialArgs: []});
        expect(file.name).toBe("test");
        expect(file.path).toBe("App");
        expect(file.file.fullPath).toBe("templates/test.gimbli");
    });

    test("Should throw an error if not in templates folder", async () => {
        (utils as any).setMockFn(utils.getTemplateFileOfFolder, async () => []);
        (utils as any).setMockFn(utils.isTemplateFolderPresent, async () => true);

        let err: Error = null;
        try {
            await findTemplate({ type: "test", path: "App", args: [], specialArgs: []});
        } catch (e) {
            err = e;
        }
        expect(err!.message).toBe(`Template with name (test) not found`);
    });

    test("Should return the command", async () => {

        (utils as any).setMockFn(utils.getTemplateFileOfFolder, async () => {
            return [{
                fullPath: "templates/test.gimbli",
                name: "test",
                nameWithExtension: "test.gimbli",
            }];
        });

        (utils as any).setMockFn(utils.isTemplateFolderPresent, async () => true);

        const command = { type: "test", path: "App", args: [], specialArgs: []};
        const file = await findTemplate(command);
        expect(file.command).toBe(command);
    });
});
