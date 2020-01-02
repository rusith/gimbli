import {specialArguments} from "../config/constants";

export function validate(args: string[]) {
    if (args.length < 4) {
        return {
            errors: ["Not enough arguments provided.command name and target path is required"],
            isValid: false,
            warnings: [],
        };
    }

    const specialArgs = args.filter((a) => a.startsWith("--"))
        .map((a) => a.substring(2));

    const warnings = specialArgs.filter((a) => !specialArguments.isOne(a))
        .map((sa) => `${sa} (--${sa}) is not a recognized argument`);

    return  {
        errors: [],
        isValid: true,
        warnings,
    };
}
