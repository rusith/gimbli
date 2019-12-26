import ICommandLineValidationResult from "./models/ICommandLilneArgumentValidationResult";

/**
 * Valid command line arguments
 */
export function validateCommandLineInputs(args: string[]): ICommandLineValidationResult {
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
