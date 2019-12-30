import * as path from "path";
import {
    getCurrentDirectory,
    getDirectoriesInsideDirectory, getFileContent,
    getFilesOfDirectory,
    nextDirectory,
    writeFile,
} from "../fileUtils";

jest.mock("fs");

describe("FileUtils.currentDirectory", () => {
    test("Should return the current directory", () => {
        expect(getCurrentDirectory()).toBe(process.cwd());
    });
});

describe("FileUtils.nextDirectory", () => {
    test("Should return next folder if current is null", () => {
        expect(nextDirectory(null, "b")).toBe(path.join("b"));
    });

    test("Should return current folder if next is null", () => {
        expect(nextDirectory("a", null)).toBe(path.join("a"));
    });

    test("Should return next folder if current is empty", () => {
        expect(nextDirectory("", "b")).toBe(path.join("b"));
    });

    test("Should return current folder if next is empty", () => {
        expect(nextDirectory("a", "")).toBe(path.join("a"));
    });

    test("Should return current the full path correctly", () => {
        expect(nextDirectory("a", "b")).toBe(path.join(path.join("a", "b")));
        expect(nextDirectory("/user/abs-cks/test/", "next--folder"))
            .toBe(path.join("/user/abs-cks/test/", "next--folder"));
    });
});

describe("FileUtils.writeFile", () => {
    test("Should fail if file name is empty", async () => {
        let err: Error = null;
        try {
            await writeFile("", "");
        } catch (e) {
            err = e;
        }
        expect(err!.message).toBe("Cannot write to file without a specified path");
    });
});

describe("File System Functions", () => {
    test("getDirectoriesInsideDirectory", async () => {
        await getDirectoriesInsideDirectory("");
    });

    test("getFilesOfDirectory", async () => {
        await getFilesOfDirectory("");
    });

    test("getFileContent", async () => {
        expect(await getFileContent("/somefile.txt")).toBe("data");
    });

    test("writeFile", async () => {
        await writeFile("/someFile.txt", "something");
    });
});
