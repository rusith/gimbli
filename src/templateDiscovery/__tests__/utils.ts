import {getCurrentLocation, getFilesOfDirectory} from "../utils";

describe("Find Templates Utils", () => {
    test("Get current location should return the current location", () => {
        expect(getCurrentLocation()).toBe(process.cwd());
    });

    test("Get files of directory should return a list of files", async () => {
        const files = await getFilesOfDirectory(getCurrentLocation());
        expect(files).not.toBe(null);
        expect(files.length).toBeGreaterThan(0);
    });
});
