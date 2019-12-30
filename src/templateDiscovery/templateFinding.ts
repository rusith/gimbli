import ICommand from "../cli/models/ICommand";
import {ITemplate} from "../models";
import {getCurrentDirectory, nextDirectory} from "../utils/fileUtils";
import {getTemplateFileOfFolder, isTemplateFolderPresent} from "./templateDiscoveryUtils";

export async function findTemplate(command: ICommand): Promise<ITemplate> {
    if (!command) {
        throw new Error("Invalid command name");
    }
    const currentDirectory = getCurrentDirectory();
    if (await isTemplateFolderPresent(currentDirectory)) {
        const files =
            await getTemplateFileOfFolder(nextDirectory(currentDirectory, "templates"));
        const templateFiles = files.filter((f) => f.name === command.type);

        if (templateFiles.length) {
            return {
                command,
                file: templateFiles[0],
                name: templateFiles[0].name,
                path: command.path,
            };
        }
    }
    throw new Error(`Template with name (${command.type}) not found`);
}
