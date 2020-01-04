import * as fsPath from "path";
import * as cliUtils from "../../cli/cliUtils";
import {ICommandSet, IWriteFileCommand} from "../../models";
import * as fileUtils from "../../utils/fileUtils";
import {writeCommands, writeFileCommand} from "../commandWriting";

jest.mock("../../utils/fileUtils");
jest.mock("../../cli/cliUtils");

describe("writeFileCommand", () => {
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

describe("write", () => {
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

    test("Should call confirm if the file already exists", async () => {
        const commands: ICommandSet = {
            template: null,
            writeFiles: [{
                content: "content",
                fullPath: "/rusith/app/App.tsx",
            }],
        };

        const mock = jest.fn()
            .mockResolvedValue(false);
        (cliUtils as any).setMockFn(cliUtils.getConfirmation, mock);
        (fileUtils as any).setMockFn(fileUtils.exists,  jest.fn().mockReturnValue(true));

        const message = `This file is going to be replaced.
* /rusith/app/App.tsx

Do you want to continue?`;

        await writeCommands(commands);

        expect(mock).toBeCalledWith(message);
    });

    test("Should call confirm if the files already exist", async () => {
        const commands: ICommandSet = {
            template: null,
            writeFiles: [{
                content: "content",
                fullPath: "/rusith/app/App.tsx",
            }, {
                content: "content two",
                fullPath: "/rusith/app/App.module.tsx",
            }],
        };

        const mock = jest.fn()
            .mockResolvedValue(false);
        (cliUtils as any).setMockFn(cliUtils.getConfirmation, mock);
        (fileUtils as any).setMockFn(fileUtils.exists,  jest.fn().mockReturnValue(true));

        const message = `These files are going to be replaced.
* /rusith/app/App.tsx
* /rusith/app/App.module.tsx

Do you want to continue?`;

        await writeCommands(commands);

        expect(mock).toBeCalledWith(message);
    });

    test("Should not confirm if files don't exist", async () => {
        const commands: ICommandSet = {
            template: null,
            writeFiles: [{
                content: "content",
                fullPath: "/rusith/app/App.tsx",
            }, {
                content: "content two",
                fullPath: "/rusith/app/App.module.tsx",
            }],
        };

        const mock = jest.fn()
            .mockResolvedValue(false);
        (cliUtils as any).setMockFn(cliUtils.getConfirmation, mock);
        (fileUtils as any).setMockFn(fileUtils.exists,  jest.fn().mockReturnValue(false));

        await writeCommands(commands);

        expect(mock).not.toBeCalled();
    });

    test("Should not write files if not confirmed", async () => {
        const commands: ICommandSet = {
            template: null,
            writeFiles: [{
                content: "content",
                fullPath: "/rusith/app/App.tsx",
            }, {
                content: "content two",
                fullPath: "/rusith/app/App.module.tsx",
            }],
        };

        const mock = jest.fn()
            .mockResolvedValue(false);
        const writeFileMock = jest.fn()
            .mockResolvedValue(null);
        (cliUtils as any).setMockFn(cliUtils.getConfirmation, mock);
        (fileUtils as any).setMockFn(fileUtils.writeFile, writeFileMock);
        (fileUtils as any).setMockFn(fileUtils.exists,  jest.fn().mockReturnValue(true));

        await writeCommands(commands);

        expect(writeFileMock).not.toBeCalled();
    });
});
