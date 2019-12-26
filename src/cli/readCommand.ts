/**
 * Reads the cli command input as a command object
 * @param args List of arguments
 */
import ICommand from "cli/models/ICommand";

export function readInputAsCommand(args: string[]): ICommand {
    return {
        type: args[0],
    }
}