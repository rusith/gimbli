import {ICommandReader} from "..";
import ICommand from "../models/ICommand";

export class CommandReader implements ICommandReader {
    public read(args: string[]): ICommand {
        return {
            type: args[0],
        };
    }
}