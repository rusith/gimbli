export function validate(args: string[]) {
    if (args.length < 4) {
        return {
            errors: ["Not enough arguments provided. name and file path is required"],
            isValid: false,
        };
    }

    return  {
        errors: [],
        isValid: true,
    };
}
