import * as path from "path";
import {logInfo} from "../logging/logs";
import {ICommandSet, IWriteFileCommand} from "../models";
import {getConfirmation} from "../utils/cliUtils";
import {createDirectory, exists, writeFile} from "../utils/fileUtils";

export async function writeCommands(commands: ICommandSet): Promise<any> {
    const alreadyExistingFiles = commands.writeFiles.map((f) => ({
        exist: exists(f.fullPath),
        file: f,
    })).filter((f) => f.exist);

    if (alreadyExistingFiles.length) {
        let message = `\n${(alreadyExistingFiles.length > 1) ? "These files are" : "This file is"} going to be replaced.`;
        message = alreadyExistingFiles.reduce((current, next) => {
            return current + `
* ${next.file.fullPath}`;
        }, message);

        message += `

Do you want to continue?`;

        if (!await getConfirmation(message)) {
            return;
        }
    }

    await Promise.all(commands.writeFiles.map(writeFileCommand));
}

export async function writeFileCommand(command: IWriteFileCommand): Promise<void> {
    const directory = path.dirname(command.fullPath);
    if (!exists(directory)) {
        await createDirectory(directory);
    }
    logInfo(`Writing file ${command.fullPath}`);
    return await writeFile(command.fullPath, command.content);
}
