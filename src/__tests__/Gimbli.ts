import {ICliUtils} from "../cli/abstract/ICliUtils";
import {ICommandLineInputValidator} from "../cli/abstract/ICommandLineInputValidator";
import {ICommandReader} from "../cli/abstract/ICommandReader";
import ICommand from "../cli/models/ICommand";
import ICommandLilneArgumentValidationResult from "../cli/models/ICommandLilneArgumentValidationResult";
import Gimbli from "../Gimbli";

class SuccessValidator implements ICommandLineInputValidator {
    validate(args: string[]): ICommandLilneArgumentValidationResult {
        return {
            isValid: true,
            errors: null,
        }
    }
}

class SuccessReader implements ICommandReader {
    read(args: string[]): ICommand {
        return {
            type: "any"
        };
    }
}

class UtilsStub implements ICliUtils {
    getRelevantArguments(args: string[]): string[] {
        return [];
    }
}

describe("Gimbli.run", () => {
    test("Should run without error", () => {
        const gimbli = new Gimbli(new SuccessValidator(), new SuccessReader(), new UtilsStub());
        gimbli.run(process.argv);
    });
});