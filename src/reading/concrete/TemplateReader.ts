import {ITemplateReader} from "..";
import {ITemplate} from "../../models";
import {IFileUtils} from "../../utils";

export class TemplateReader implements ITemplateReader {
    constructor(private fileUtils: IFileUtils) {}

    public async read(template: ITemplate): Promise<ITemplate> {
        const content = await this.fileUtils.getFileContent(template.file.fullPath);
        if (!content) {
            throw new Error("Template should not be empty");
        }
        // Read file content
        return undefined;
    }
}
