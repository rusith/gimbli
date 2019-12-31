import * as path from "path";
import {ICommandSet, IWriteFileCommand} from "../models";
import {createDirectory, exists, writeFile} from "../utils/fileUtils";

export async function writeCommands(commands: ICommandSet): Promise<any> {
    await Promise.all(commands.writeFiles.map(writeFileCommand));
}

export async function writeFileCommand(command: IWriteFileCommand): Promise<void> {
    const directory = path.dirname(command.fullPath);
    if (!exists(directory)) {
        await createDirectory(directory);
    }
    return await writeFile(command.fullPath, command.content);
}
