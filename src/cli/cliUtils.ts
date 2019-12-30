export function getRelevantArguments(args: string[]): string[] {
    if (args == null) { return []; }
    return args.slice(2);
}
