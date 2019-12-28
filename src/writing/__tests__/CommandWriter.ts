import {CommandWriter, ICommandWriter} from "..";
import {ICommandSet, IWriteFileCommand} from "../../models";
import {IFileUtils} from "../../utils";

describe("CommandWriter.writeFile", () => {
    test("Should call the internal write function with correct data", async () => {
        const commands: ICommandSet = {
            writeFiles: [{
                content: "content",
                fullPath: "/rusith/app/App.tsx",
            }, {
                content: "content one",
                fullPath: "/rusith/app/App.module.css",
            }],
        };

        const testFile = async (command: IWriteFileCommand) => {
            let ok = false;
            const fileU: IFileUtils = {
                async writeFile(path: string, content: string): Promise<void> {
                    ok = path === command.fullPath && content === command.content;
                },
            };

            const w = new CommandWriter(fileU);
            await w.writeFile(command);

            expect(ok).toBeTruthy();
        };

        await testFile(commands.writeFiles[0]);
        await testFile(commands.writeFiles[1]);
    });
});

describe("CommandWriter.write", () => {
    test("Should call the internal write function with correct data", async () => {
        const commands: ICommandSet = {
            writeFiles: [{
                content: "content",
                fullPath: "/rusith/app/App.tsx",
            }, {
                content: "content one",
                fullPath: "/rusith/app/App.module.css",
            }],
        };

        const calls = [];

        const fileU: IFileUtils = {
            async writeFile(path: string, content: string): Promise<void> {
                calls.push([path, content]);
            },
        };
        const w: ICommandWriter = new CommandWriter(fileU);
        await w.write(commands);

        expect(calls[0][0]).toBe(commands.writeFiles[0].fullPath);
        expect(calls[0][1]).toBe(commands.writeFiles[0].content);

        expect(calls[1][0]).toBe(commands.writeFiles[1].fullPath);
        expect(calls[1][1]).toBe(commands.writeFiles[1].content);
    });
});
