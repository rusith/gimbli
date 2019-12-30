import {ICommandSet, IWriteFileCommand} from "../models";
import { writeFile } from "../utils/fileUtils";

export async function writeCommands(commands: ICommandSet): Promise<any> {
    await Promise.all(commands.writeFiles.map(writeFileCommand));
}

export function writeFileCommand(command: IWriteFileCommand): Promise<void> {
    return writeFile(command.fullPath, command.content);
}
