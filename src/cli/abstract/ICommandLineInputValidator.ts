import ICommandLilneArgumentValidationResult from "../models/ICommandLilneArgumentValidationResult";

export interface ICommandLineInputValidator {
    validate(args: string[]): ICommandLilneArgumentValidationResult;
}
