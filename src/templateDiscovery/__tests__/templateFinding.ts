import {Config} from "../../models/Config";
import * as fileUtils from "../../utils/fileUtils";
import * as utils from "../templateDiscoveryUtils";
import {findTemplate} from "../templateFinding";

jest.mock("../templateDiscoveryUtils");
jest.mock("../../utils/fileUtils");

describe("TemplateFinder.findTemplate", () => {
    test("Should fail if the name is not valid", async () => {
        let err: Error = null;
        try {
            await findTemplate(null,  null);
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
        (fileUtils as any).setMockFn(fileUtils.exists, () => true);

        const file = await findTemplate({ type: "test", path: "App", args: [], specialArgs: []}, new Config());
        expect(file.name).toBe("test");
        expect(file.path).toBe("App");
        expect(file.file.fullPath).toBe("templates/test.gimbli");
    });

    test("Should throw an error if the given folder doesn't exist", async () => {
        (fileUtils as any).setMockFn(fileUtils.exists, () => false);
        let err: Error;
        try {
            await findTemplate({ type: "test", path: "App", args: [], specialArgs: []}, { templateDir: "./temps"});
        } catch (e) {
            err = e;
        }

        expect(err.message).toBe("The template directory (./temps) doesn't exist.");
    });

    test("Should return from the template folder if the template file exists - changed folder", async () => {
        (utils as any).setMockFn(utils.getTemplateFileOfFolder, async () => {
            return [{
                fullPath: "ttp/test.gimbli",
                name: "test",
                nameWithExtension: "test.gimbli",
            }];
        });

        (utils as any).setMockFn(utils.isTemplateFolderPresent, async () => true);
        (fileUtils as any).setMockFn(fileUtils.exists, () => true);

        const file = await findTemplate({ type: "test", path: "App", args: [], specialArgs: []},
            { templateDir: "./ttp"});
        expect(file.name).toBe("test");
        expect(file.path).toBe("App");
        expect(file.file.fullPath).toBe("ttp/test.gimbli");
    });

    test("Should throw an error if not in templates folder", async () => {
        (utils as any).setMockFn(utils.getTemplateFileOfFolder, async () => []);
        (utils as any).setMockFn(utils.isTemplateFolderPresent, async () => true);
        (fileUtils as any).setMockFn(fileUtils.exists, () => true);

        let err: Error = null;
        try {
            await findTemplate({ type: "test", path: "App", args: [], specialArgs: []}, new Config());
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
        (fileUtils as any).setMockFn(fileUtils.exists, () => true);

        (utils as any).setMockFn(utils.isTemplateFolderPresent, async () => true);

        const command = { type: "test", path: "App", args: [], specialArgs: []};
        const file = await findTemplate(command, new Config());
        expect(file.command).toBe(command);
    });
});
