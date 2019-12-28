import * as path from "path";
import {FileUtils, IFileUtils} from "..";

describe("FileUtils.currentDirectory", () => {
    test("Should return the current directory", () => {
        const utils: IFileUtils = new FileUtils();
        expect(utils.getCurrentDirectory()).toBe(process.cwd());
    });
});

describe("FileUtils.nextDirectory", () => {
    test("Should return next folder if current is null", () => {
        const utils: IFileUtils = new FileUtils();
        expect(utils.nextDirectory(null, "b")).toBe(path.join("b"));
    });

    test("Should return current folder if next is null", () => {
        const utils: IFileUtils = new FileUtils();
        expect(utils.nextDirectory("a", null)).toBe(path.join("a"));
    });

    test("Should return next folder if current is empty", () => {
        const utils: IFileUtils = new FileUtils();
        expect(utils.nextDirectory("", "b")).toBe(path.join("b"));
    });

    test("Should return current folder if next is empty", () => {
        const utils: IFileUtils = new FileUtils();
        expect(utils.nextDirectory("a", "")).toBe(path.join("a"));
    });

    test("Should return current the full path correctly", () => {
        const utils: IFileUtils = new FileUtils();
        expect(utils.nextDirectory("a", "b")).toBe(path.join(path.join("a", "b")));
        expect(utils.nextDirectory("/user/abs-cks/test/", "next--folder"))
            .toBe(path.join("/user/abs-cks/test/", "next--folder"));
    });
});

describe("FileUtils.writeFile", () => {
    test("Should fail if file name is empty", async () => {
        const u: IFileUtils = new FileUtils();
        let err: Error = null;
        try {
            await u.writeFile("", "");
        } catch (e) {
            err = e;
        }
        expect(err!.message).toBe("Cannot write to file without a specified path");
    });
});
