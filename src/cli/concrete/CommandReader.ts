import {ICommandArgument, ICommandReader} from "..";
import ICommand from "../models/ICommand";

export class CommandReader implements ICommandReader {
    public read(args: string[]): ICommand {
        return {
            path: args[1],
            type: args[0],
        };
    }

    public readExtraArguments(args: string[]): ICommandArgument[] {
        const extra = args.splice(2);

        const result: ICommandArgument[] = [];
        let previous: string = null;
        for (let i = 0, l = extra.length; i < l ; i++ ) {
            const current = extra[i];
            const next = l > i + 1 ? extra[i + 1] : null;
            if (current.startsWith("-")) {
                result.push({
                    name: current.substring(1),
                    value: next ? next.startsWith("-") ? true : next : true,
                });
            }
            previous = current;
        }

        return result;
    }
}
