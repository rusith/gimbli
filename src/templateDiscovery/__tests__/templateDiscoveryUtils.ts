import * as fileUtils from "../../utils/fileUtils" ;
import {getTemplateFileOfFolder, isTemplateFolderPresent} from "../templateDiscoveryUtils";

jest.mock("../../utils/fileUtils");

describe("isTemplateFolderPresent", () => {
    test("Should return false if the current folder has no directories" , async () => {
        (fileUtils as any).setMockFn(fileUtils.getDirectoriesInsideDirectory, async () => {
            return [];
        } );
        expect(await isTemplateFolderPresent("")).toBe(false);
    });

    test("Should return true if the current folder has a directory named templates" , async () => {
        (fileUtils as any).setMockFn(fileUtils.getDirectoriesInsideDirectory, async () => {
            return ["templates"];
        } );
        expect(await isTemplateFolderPresent("")).toBe(true);
    });
});

describe("getTemplateFilesOfFolder", () => {
    test("Should return an empty list if no files" , async () => {
        (fileUtils as any).setMockFn(fileUtils.getFilesOfDirectory, async () => {
            return [];
        } );
        const files = await getTemplateFileOfFolder("");
        expect(files.length).toBe(0);
    });

    test("Should return the template files if files are there" , async () => {

        (fileUtils as any).setMockFn(fileUtils.getFilesOfDirectory, async () => {
            return ["/a/a.gimbli", "/a/b.gimbli"];
        } );

        const files = await getTemplateFileOfFolder("");
        expect(files[0].name).toBe("a");
        expect(files[0].fullPath).toBe("/a/a.gimbli");
        expect(files[0].nameWithExtension).toBe("a.gimbli");

        expect(files[1].name).toBe("b");
        expect(files[1].fullPath).toBe("/a/b.gimbli");
        expect(files[1].nameWithExtension).toBe("b.gimbli");
    });

    test("Should only return gimbli files" , async () => {
        (fileUtils as any).setMockFn(fileUtils.getFilesOfDirectory, async () => {
            return ["/a/a.gimbli", "/a/c.txt", "/a/d.png", "/a/b.gimbli"];
        } );
        const files = await getTemplateFileOfFolder("");
        expect(files[0].name).toBe("a");
        expect(files[1].name).toBe("b");
    });
});
