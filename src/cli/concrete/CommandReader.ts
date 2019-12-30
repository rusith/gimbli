import {ICommandArgument, ICommandReader} from "..";
import ICommand from "../models/ICommand";

export class CommandReader implements ICommandReader {
    public read(args: string[]): ICommand {
        return {
            args: this.readExtraArguments(args),
            path: args[1],
            type: args[0],
        };
    }

    public readExtraArguments(args: string[]): ICommandArgument[] {
        const extra = args.splice(2);

        const res: ICommandArgument[] = [];

        const isAName = (arg: string) => arg.startsWith("-");
        const hasNext = (index: number) => extra.length - 1 > index;
        const getArgName = (arg: string) => arg.substring(1);
        const addToResult = (name: string, value: any) => res.push({ name: getArgName(name), value });

        const process = (index) => {
            if (extra.length - 1 < index) {
                return;
            }
            const arg = extra[index];
            if (isAName(arg)) {
                if (hasNext(index)) {
                    const next = extra[index + 1];
                    if (isAName(next)) {
                        addToResult(arg, true);
                    } else {
                        addToResult(arg, next);
                    }
                } else {
                    addToResult(arg, true);
                }
            }
            process(index + 1);
        };

        process(0);

        return res;
    }
}
