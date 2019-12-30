import {ITemplate} from "../models";
import {getFileContent} from "../utils/fileUtils";

export async function readTemplate(template: ITemplate): Promise<ITemplate> {
    const content = await getFileContent(template.file.fullPath);
    if (!content) {
        throw new Error("Template should not be empty");
    }
    return {
        ...template,
        content,
    };
}
