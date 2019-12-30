import {ITemplateReader} from "..";
import {TemplateReader} from "..";
import {IFileUtils} from "../../utils";

describe("TemplateReader.read", () => {
    test("Template reader should fail if the template is empty or null", async () => {
        async function testIt(fileUtils: IFileUtils) {
            const reader: ITemplateReader = new TemplateReader(fileUtils);
            const template = reader.read({
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

        const emptyFileUtils: IFileUtils = {
            getFileContent(): Promise<string> {
                return Promise.resolve("");
            },
        };

        await testIt(emptyFileUtils);

        const nullFileUtils: IFileUtils = {
            getFileContent(): Promise<string> {
                return Promise.resolve(null);
            },
        };
        await testIt(nullFileUtils); // Empty
    });

    test("Template reader should read the content of the file", async () => {

        const content = `
        test
dskaf
dsafd

djakjfd
`;
        const fileUtils: IFileUtils = {
            getFileContent(): Promise<string> {
                return Promise.resolve(content);
            },
        };

        const reader: ITemplateReader = new TemplateReader(fileUtils);
        const template = await reader.read({
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
