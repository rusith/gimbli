import {ICommandReader} from "../abstract/ICommandReader";
import ICommand from "../models/ICommand";

export class CommandReader implements ICommandReader {
    read(args: string[]): ICommand {
        return {
            type: args[0],
        }
    }
    
}