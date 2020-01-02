import * as path from "path";
import ICommand from "../cli/models/ICommand";
import {ITemplate} from "../models";
import {Config} from "../models/Config";
import {exists} from "../utils/fileUtils";
import {getTemplateFileOfFolder} from "./templateDiscoveryUtils";

export async function findTemplate(command: ICommand, config: Config): Promise<ITemplate> {
    if (!command) {
        throw new Error("Invalid command name");
    }
    if (!exists(config.templateDir)) {
        throw new Error(`The template directory (${config.templateDir}) doesn't exist.`);
    }
    const files =
        await getTemplateFileOfFolder(path.resolve(config.templateDir));
    const templateFiles = files.filter((f) => f.name === command.type);

    if (templateFiles.length) {
        return {
            command,
            file: templateFiles[0],
            name: templateFiles[0].name,
            path: command.path,
        };
    }
    throw new Error(`Template with name (${command.type}) not found`);
}
