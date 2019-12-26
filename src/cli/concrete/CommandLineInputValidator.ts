import {ICommandLineInputValidator} from "..";

export class CommandLineInputValidator implements ICommandLineInputValidator {
    public validate(args: string[]) {
        if (args.length < 3) {
            return {
                errors: ["Not enough arguments provided"],
                isValid: false,
            };
        }

        return  {
            errors: [],
            isValid: true,
        };
    }
}
