import {CliUtils, CommandLineInputValidator, CommandReader, ICliUtils} from "../cli";
import {ICommandLineInputValidator} from "../cli";
import {ICommandReader} from "../cli";
import ICommand from "../cli/models/ICommand";
import ICommandLilneArgumentValidationResult from "../cli/models/ICommandLilneArgumentValidationResult";
import Gimbli from "../Gimbli";
import {TemplateDiscoveryUtils, TemplateFinder} from "../templateDiscovery";
import {FileUtils} from "../utils";

class SuccessValidator implements ICommandLineInputValidator {
    public validate(args: string[]): ICommandLilneArgumentValidationResult {
        return {
            errors: null,
            isValid: true,
        };
    }
}

class SuccessReader implements ICommandReader {
    public read(args: string[]): ICommand {
        return {
            type: "any",
        };
    }
}

class UtilsStub implements ICliUtils {
    public getRelevantArguments(args: string[]): string[] {
        return [];
    }
}

describe("Gimbli.run", () => {
    test("Should run without error", () => {

        const fileUtils = new FileUtils();
        const commandLineInputValidator = new CommandLineInputValidator();
        const reader = new CommandReader();
        const cliUtils = new CliUtils();
        const templateDiscoveryUtils = new TemplateDiscoveryUtils(fileUtils);
        const templateFinder = new TemplateFinder(templateDiscoveryUtils, fileUtils);
        const gimbli =  new Gimbli(commandLineInputValidator, reader, cliUtils, templateFinder);
        gimbli.run(process.argv);
    });
});
