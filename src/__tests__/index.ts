/* tslint:disable:no-trailing-whitespace */
import * as fs from "fs";
import * as path from "path";
import * as cliUtils from "../cli/cliUtils";
import {run} from "../index";
import * as logging from "../logging/logs";
jest.mock("fs");
jest.mock("../logging/logs");
jest.mock("../cli/cliUtils");

describe("run", () => {
    test("Should call correct apis for simple template", async () => {
        const args = ["node", "./index.ts", "test", "-className", "Test"];
        (fs as any).setMockFn(fs.readdir, (p, opt, callback) => {
            if (p === path.join(process.cwd())) {
                callback(null, [
                    {
                        isDirectory: () => true,
                        name: "templates",
                    },
                ]);
            } else if (p === path.join(process.cwd(), "templates")) {
                callback(null, [
                    {
                        isFile: () => true,
                        name: "test.gimbli",
                    },
                ]);
            }
        });

        const content = `@#file($path/$name.cs)
content
#@`;
        const configFile = "{ }";

        (fs as any).setMockFn(fs.readFile, (p, callback) => {
            if (p === "./gimbli.json") {
                callback(null, configFile);
            } else {
                callback(null, content);
            }
        });

        let ok = false;

        (fs as any).setMockFn(fs.writeFile, (p, c, callback) => {
            ok = c === "content\n";
            callback(null);
        });
        (fs as any).setMockFn(fs.existsSync, () => true);
        (cliUtils as any).setMockFn(cliUtils.getConfirmation, async () => true);

        await run(args);

        expect(ok).toBeTruthy();
    });

    test("Should call logWarning if non supported args are provided", async () => {
        const args = ["node", "./index.ts", "test", "-className", "Test", "--unsupported"];
        (fs as any).setMockFn(fs.readdir, (p, opt, callback) => {
            if (p === path.join(process.cwd())) {
                callback(null, [
                    {
                        isDirectory: () => true,
                        name: "templates",
                    },
                ]);
            } else if (p === path.join(process.cwd(), "templates")) {
                callback(null, [
                    {
                        isFile: () => true,
                        name: "test.gimbli",
                    },
                ]);
            }
        });

        let ok = false;
        (logging as any).setMockFn(logging.logWarning, (message: string) => {
            ok = message === `unsupported (--unsupported) is not a recognized argument`;
        });

        await run(args);
        expect(ok).toBeTruthy();
    });

    test("Should call logError if the args are not validated", async () => {
        const args = ["node", "./index.ts"];
        const mock = jest.fn();
        (logging as any).setMockFn(logging.logError, mock);
        await run(args);
        expect(mock).toBeCalled();
    });

    test("Should log arguments", async () => {
        const args = ["node", "./index.ts", "test", "comps/App", "-something"];
        const mock = jest.fn();
        (logging as any).setMockFn(logging.logInfo, mock);
        await run(args);
        expect(mock).toBeCalledWith("Arguments: ");
    });
});
