import {ITemplateReader} from "..";
import {IFileUtils} from "../../utils";
import {TemplateReader} from "../concrete/TemplateReader";

describe("TemplateReader.read", () => {
    test("Template reader should fail if the template is empty or null", async () => {
        async function testIt(fileUtils: IFileUtils) {
            const reader: ITemplateReader = new TemplateReader(fileUtils);
            const template = reader.read({
                file:  {
                    fullPath: "",
                    name: "test",
                    nameWithExtension: "test.gimbli",
                },
                name: "test",
            });

            let err: Error = null;
            try {
                await template;
            } catch (e) {
                err = e;
            }
            expect(err!.message).toBe("Template should not be empty");
        }

        const emptyFileUtils: IFileUtils = {
            getFileContent(pathToFile: string): Promise<string> {
                return Promise.resolve("");
            },
        };

        await testIt(emptyFileUtils);

        const nullFileUtils: IFileUtils = {
            getFileContent(pathToFile: string): Promise<string> {
                return Promise.resolve(null);
            },
        };
        await testIt(nullFileUtils); // Empty
    });
});
