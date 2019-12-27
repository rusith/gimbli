import {ITemplateFile} from "..";

export interface ITemplateDiscoveryUtils {
    isTemplateFolderPresent?(folder: string);
    getTemplateFileOfFolder?(folder: string): Promise<ITemplateFile[]>;
}
