import ICommand from "../models/ICommand";

export interface ICommandReader {
    read(args: string[]): ICommand;
}