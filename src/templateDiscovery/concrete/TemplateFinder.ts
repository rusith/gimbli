import {ITemplateDiscoveryUtils, ITemplateFinder} from "..";
import ICommand from "../../cli/models/ICommand";
import {ITemplate} from "../../models";
import {IFileUtils} from "../../utils";

export class TemplateFinder implements ITemplateFinder {
    constructor(private utils: ITemplateDiscoveryUtils, private fileUtils: IFileUtils) {
    }

    public async findTemplate(command: ICommand): Promise<ITemplate> {
        if (!command) {
            throw new Error("Invalid command name");
        }
        const currentDirectory = this.fileUtils.getCurrentDirectory();
        if (await this.utils.isTemplateFolderPresent(currentDirectory)) {
            const files =
                await this.utils.getTemplateFileOfFolder(this.fileUtils.nextDirectory(currentDirectory, "templates"));
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
}
