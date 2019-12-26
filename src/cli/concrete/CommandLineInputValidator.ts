import {ICommandLineInputValidator} from "../abstract/ICommandLineInputValidator";

export class CommandLineInputValidator implements ICommandLineInputValidator {
    validate(args: string[]) {
        if (args.length < 3) {
            return {
                errors: ["Not enough arguments provided"],
                isValid: false,
            };
        }

        return  {
            errors: [],
            isValid: true,
        }
    }
}