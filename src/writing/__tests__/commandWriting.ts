import * as fsPath from "path";
import {ICommandSet, IWriteFileCommand} from "../../models";
import * as fileUtils from "../../utils/fileUtils";
import {writeCommands, writeFileCommand} from "../commandWriting";

jest.mock("../../utils/fileUtils");

describe("CommandWriter.writeFileCommand", () => {
    test("Should call the internal write function with correct data", async () => {
        const commands: ICommandSet = {
            template: null,
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
            (fileUtils as any).setMockFn(fileUtils.writeFile, async (path: string, content: string) => {
                ok = path === command.fullPath && content === command.content;
            });

            await writeFileCommand(command);

            expect(ok).toBeTruthy();
        };

        await testFile(commands.writeFiles[0]);
        await testFile(commands.writeFiles[1]);
    });

    test("Should create the directory if not present", async () => {
        const command =  {
            content: "content",
            fullPath: fsPath.join("rusith", "app", "App.tsx"),
        };

        let existsCalled = false;
        (fileUtils as any).setMockFn(fileUtils.exists, (path) => {
            existsCalled = (path === fsPath.join("rusith", "app"));
        });

        let mkdirCalled = false;
        (fileUtils as any).setMockFn(fileUtils.createDirectory, (path) => {
            mkdirCalled = (path === fsPath.join("rusith", "app"));
        });

        await writeFileCommand(command);
        expect(existsCalled).toBeTruthy();
        expect(mkdirCalled).toBeTruthy();
    });
});

describe("CommandWriter.write", () => {
    test("Should call the internal write function with correct data", async () => {
        const commands: ICommandSet = {
            template: null,
            writeFiles: [{
                content: "content",
                fullPath: "/rusith/app/App.tsx",
            }, {
                content: "content one",
                fullPath: "/rusith/app/App.module.css",
            }],
        };

        const calls = [];

        (fileUtils as any).setMockFn(fileUtils.writeFile, async (path: string, content: string) => {
            calls.push([path, content]);
        });
        await writeCommands(commands);

        expect(calls[0][0]).toBe(commands.writeFiles[0].fullPath);
        expect(calls[0][1]).toBe(commands.writeFiles[0].content);

        expect(calls[1][0]).toBe(commands.writeFiles[1].fullPath);
        expect(calls[1][1]).toBe(commands.writeFiles[1].content);
    });
});

// describe("CommandWriter.write", () => {
//     test("Should call the internal write function with correct data", async () => {
//         const commands: ICommandSet = {
//             template: null,
//             writeFiles: [{
//                 content: "content",
//                 fullPath: "/rusith/app/App.tsx",
//             }, {
//                 content: "content one",
//                 fullPath: "/rusith/app/App.module.css",
//             }],
//         };
//
//         const calls = [];
//
//         (fileUtils as any).setMockFn(fileUtils.writeFile, async (path: string, content: string) => {
//             calls.push([path, content]);
//         });
//         await writeCommands(commands);
//
//         expect(calls[0][0]).toBe(commands.writeFiles[0].fullPath);
//         expect(calls[0][1]).toBe(commands.writeFiles[0].content);
//
//         expect(calls[1][0]).toBe(commands.writeFiles[1].fullPath);
//         expect(calls[1][1]).toBe(commands.writeFiles[1].content);
//     });
// });
