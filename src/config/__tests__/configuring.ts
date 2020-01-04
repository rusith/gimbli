import {ICommandArgument} from "../../cli/models/ICommandArgument";
import {Config} from "../../models/Config";
import * as fileUtils from "../../utils/fileUtils";
import {getConfigFromParameters, getConfiguration, readConfigFile} from "../configuring";

jest.mock("../../utils/fileUtils");

describe("getConfigFromParameters", () => {
    test("Should return default values if args are null or empty", () => {
        const args: ICommandArgument[] = [];
        const result: Config = getConfigFromParameters(args);
        expect(result.templateDir).toBe(undefined);
    });
    test("Should set templateDir if templateDir is there in the args", () => {
        const args: ICommandArgument[] = [{name: "templateDir", value: "./templets"}];
        const result: Config = getConfigFromParameters(args);
        expect(result.templateDir).toBe("./templets");
    });

    test("TemplateDir should be undefined if arg is not provided", () => {
        const args: ICommandArgument[] = [];
        const result: Config = getConfigFromParameters(args);
        expect(result.templateDir).toBe(undefined);
    });
});

describe("readConfigFile", () => {
    test("Should read the templateDir", async () => {
        (fileUtils as any).setMockFn(fileUtils.exists, () => true);
        (fileUtils as any).setMockFn(fileUtils.getFileContent, async () => `
{
    "templateDir" : "./template-dir"
}
`);
        const config = await readConfigFile();
        expect(config.templateDir).toBe("./template-dir");
    });

    test("Should read the templateDir", async () => {
        (fileUtils as any).setMockFn(fileUtils.exists, () => true);
        (fileUtils as any).setMockFn(fileUtils.getFileContent, async () => `
{
    "templateDir" : "./template-dir"
}
`);
        const config = await readConfigFile();
        expect(config.templateDir).toBe("./template-dir");
    });
});

describe("getConfiguration", () => {
    test("Args should override config file", async () => {
        (fileUtils as any).setMockFn(fileUtils.exists, () => true);
        (fileUtils as any).setMockFn(fileUtils.getFileContent, async () => `
{
    "templateDir" : "./template-dir"
}
`);
        const config = await getConfiguration([{name: "templateDir", value: "./temp"}]);
        expect(config.templateDir).toBe("./temp");
    });

    test("Should be default if params and file are not there", async () => {
        (fileUtils as any).setMockFn(fileUtils.exists, () => true);
        (fileUtils as any).setMockFn(fileUtils.getFileContent, async () => `
{
    "templateDir_" : "./template-dir"
}
`);
        const config = await getConfiguration([{name: "templateDir_", value: "./temp"}]);
        expect(config.templateDir).toBe(new Config().templateDir);
    });
});
