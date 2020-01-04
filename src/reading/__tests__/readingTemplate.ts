import * as fileUtils from "../../utils/fileUtils";
import {readTemplate} from "../readingTemplate";

jest.mock("../../utils/fileUtils");

describe("readTemplate", () => {
    test("Template reader should fail if the template is empty or null", async () => {
        async function testIt(getF: any) {
            (fileUtils as any).setMockFn(fileUtils.getFileContent, getF);
            // noinspection ES6MissingAwait
            const template = readTemplate({
                command: null,
                file: {
                    fullPath: "",
                    name: "test",
                    nameWithExtension: "test.gimbli",
                },
                name: "test",
                path: "",
            });

            let err: Error = null;
            try {
                await template;
            } catch (e) {
                err = e;
            }
            expect(err!.message).toBe("Template should not be empty");
        }

        await testIt(async () => "");
        await testIt(async () => null);
    });

    test("Template reader should read the content of the file", async () => {

        const content = `
        test
dskaf
dsafd

djakjfd
`;

        (fileUtils as any).setMockFn(fileUtils.getFileContent, async () => content);
        const template = await readTemplate({
            command: null,
            file:  {
                fullPath: "",
                name: "test",
                nameWithExtension: "test.gimbli",
            },
            name: "test",
            path: "",
        });

        expect(template.content).toBe(content);
    });
});
