import {ICliUtils} from "..";

export class CliUtils implements ICliUtils {
    public getRelevantArguments(args: string[]): string[] {
        if (args == null) { return []; }
        return args.slice(2);
    }
}
