import {ICommandArgument} from "../../cli/models/ICommandArgument";
import {Config} from "../../models/Config";
import {getConfigFromParameters} from "../configuring";

describe("configuring.getConfigFromParameters", () => {
    test("Should return default values if args are null or empty", () => {
        const args: ICommandArgument[] =  [];
        const result: Config = getConfigFromParameters(args);
        expect(result.templateDir).toBe(new Config().templateDir);
    });
    test("Should set templateDir if templateDir is there in the args", () => {
        const args: ICommandArgument[] =  [{ name: "templateDir", value: "./templets"}];
        const result: Config = getConfigFromParameters(args);
        expect(result.templateDir).toBe("./templets");
    });
});
