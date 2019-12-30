import {TemplateDiscoveryUtils} from "..";
import {IFileUtils} from "../../utils";

describe("TemplateDiscoveryUtils.isTemplateFolderPresent", () => {
    test("Should return false if the current folder has no directories" , async () => {
        const fileUtils: IFileUtils = {
            async getDirectoriesInsideDirectory(): Promise<string[]> {
                return [];
            },
        };
        const utils = new TemplateDiscoveryUtils(fileUtils);
        expect(await utils.isTemplateFolderPresent("")).toBe(false);
    });

    test("Should return true if the current folder has a directory named templates" , async () => {
        const fileUtils: IFileUtils = {
            async getDirectoriesInsideDirectory(): Promise<string[]> {
                return ["templates"];
            },
        };
        const utils = new TemplateDiscoveryUtils(fileUtils);
        expect(await utils.isTemplateFolderPresent("")).toBe(true);
    });
});

describe("TemplateDiscoveryUtils.getTemplateFilesOfFolder", () => {
    test("Should return an empty list if no files" , async () => {
        const fileUtils: IFileUtils = {
            async getFilesOfDirectory(): Promise<string[]> {
                return [];
            },
        };
        const utils = new TemplateDiscoveryUtils(fileUtils);
        const files = await utils.getTemplateFileOfFolder("");
        expect(files.length).toBe(0);
    });

    test("Should return the template files if files are there" , async () => {

        const fileUtils: IFileUtils = {
            async getFilesOfDirectory(): Promise<string[]> {
                return ["/a/a.gimbli", "/a/b.gimbli"];
            },
        };

        const utils = new TemplateDiscoveryUtils(fileUtils);
        const files = await utils.getTemplateFileOfFolder("");
        expect(files[0].name).toBe("a");
        expect(files[0].fullPath).toBe("/a/a.gimbli");
        expect(files[0].nameWithExtension).toBe("a.gimbli");

        expect(files[1].name).toBe("b");
        expect(files[1].fullPath).toBe("/a/b.gimbli");
        expect(files[1].nameWithExtension).toBe("b.gimbli");
    });

    test("Should only return gimbli files" , async () => {
        const fileUtils: IFileUtils = {
            async getFilesOfDirectory(): Promise<string[]> {
                return ["/a/a.gimbli", "/a/c.txt", "/a/d.png", "/a/b.gimbli"];
            },
        };

        const utils = new TemplateDiscoveryUtils(fileUtils);
        const files = await utils.getTemplateFileOfFolder("");
        expect(files[0].name).toBe("a");
        expect(files[1].name).toBe("b");
    });
});
