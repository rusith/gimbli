import * as path from "path";
import {ITemplateDiscoveryUtils, ITemplateFile} from "..";
import {IFileUtils} from "../../utils";

export class TemplateDiscoveryUtils implements ITemplateDiscoveryUtils {
    constructor(private fileUtils: IFileUtils) {/**/}

    public async getTemplateFileOfFolder(folder: string): Promise<ITemplateFile[]> {
        const files = await this.fileUtils.getFilesOfDirectory(folder);
        return files.filter((f) => path.extname(f) === ".gimbli")
            .map((f) => ({
                fullPath: f,
                name: path.basename(f, ".gimbli"),
                nameWithExtension: path.basename(f),
            }));
    }

    public async isTemplateFolderPresent(folder: string): Promise<boolean> {
        const folders = await this.fileUtils.getDirectoriesInsideDirectory(folder);
        return folders.some((f) => path.basename(f) === "templates");
    }
}
