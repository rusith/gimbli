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
            const file = files.filter((f) => f.name === command.type)[0];
            return {
                file,
                name: file.name,
                path: command.path,
            };
        }
    }
}
