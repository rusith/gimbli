import * as safeEval from "safe-eval";
import ICommand from "./models/ICommand";
import {ICommandArgument} from "./models/ICommandArgument";

export function readArguments(args: string[]): ICommand {
    const allArgs = this.readExtraArguments(args);
    return {
        args: allArgs.filter((a) => !a.name.startsWith("-")),
        path: args[1],
        specialArgs: allArgs.filter((a) => a.name.startsWith("-"))
            .map((a) => {
                a.name = a.name.substring(1);
                return a;
            }),
        type: args[0],
    };
}

export function readExtraArguments(args: string[]): ICommandArgument[] {
    const extra = args.splice(2);

    const res: ICommandArgument[] = [];

    const isAName = (arg: string) => arg.startsWith("-");
    const hasNext = (index: number) => extra.length - 1 > index;
    const getArgName = (arg: string) => arg.substring(1);
    const addToResult = (name: string, value: any) => res.push({ name: getArgName(name), value: readValue(value) });

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

export function readValue(value: any): any {
    if (value === true || value === false) {return !!value; }
    if (!isNaN(value as any)) {
        return +value;
    } else if (value.startsWith("#j")) {
        const exp = `(function () { return (${value.substring(2).trim()}); })()`;
        return safeEval(exp);
    }
    return value;
}
