import * as path from "path";
import {getDirectoriesInsideDirectory, getFilesOfDirectory} from "../utils/fileUtils";
import {ITemplateFile} from "./models/ITemplateFile";

export async function getTemplateFileOfFolder(folder: string): Promise<ITemplateFile[]> {
    const files = await getFilesOfDirectory(folder);
    return files.filter((f) => path.extname(f) === ".gimbli")
        .map((f) => ({
            fullPath: f,
            name: path.basename(f, ".gimbli"),
            nameWithExtension: path.basename(f),
        }));
}

export async function isTemplateFolderPresent(folder: string): Promise<boolean> {
    const folders = await getDirectoriesInsideDirectory(folder);
    return folders.filter((f) => path.basename(f) === "templates").length > 0;
}
