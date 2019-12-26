import {ICliUtils} from "../abstract/ICliUtils";

export class CliUtils implements ICliUtils {
    getRelevantArguments(args: string[]): string[] {
        if (args == null) return [];
        return args.slice(2);
    }
}