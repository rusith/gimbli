import {ICliUtils} from "../cli";
import {ICommandLineInputValidator} from "../cli";
import {ICommandReader} from "../cli";
import ICommand from "../cli/models/ICommand";
import ICommandLilneArgumentValidationResult from "../cli/models/ICommandLilneArgumentValidationResult";
import Gimbli from "../Gimbli";

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
        const gimbli = new Gimbli(new SuccessValidator(), new SuccessReader(), new UtilsStub());
        gimbli.run(process.argv);
    });
});
