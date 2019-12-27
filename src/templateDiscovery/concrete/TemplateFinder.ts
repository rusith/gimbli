import {ITemplateDiscoveryUtils, ITemplateFinder} from "..";
import {ITemplate} from "../../models";
import {IFileUtils} from "../../utils";

export class TemplateFinder implements ITemplateFinder {
    constructor(private utils: ITemplateDiscoveryUtils, private fileUtils: IFileUtils) {
    }

    public async findTemplate(name: string): Promise<ITemplate> {
        if (!name) {
            throw new Error("Invalid command name");
        }
        const currentDirectory = this.fileUtils.getCurrentDirectory();
        if (await this.utils.isTemplateFolderPresent(currentDirectory)) {
            const files =
                await this.utils.getTemplateFileOfFolder(this.fileUtils.nextDirectory(currentDirectory, "templates"));
            const file = files.filter((f) => f.name === name)[0];
            return {
                file,
                name: file.name,
            };
        }
    }
}
