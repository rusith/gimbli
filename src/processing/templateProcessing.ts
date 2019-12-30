import * as path from "path";
import {ICommandSet, IFileDefinition, ITemplate, ITemplateDefinition} from "../models";
import {getCurrentDirectory} from "../utils/fileUtils";
import {replace} from "../utils/regexUtils";
import {IConfig} from "./models/IConfig";

export function processTemplate(def: ITemplateDefinition): ICommandSet {
    const writeFiles = def.files
        .map((file) => {
            return {
                content: processContent(file),
                fullPath: processConfig(file.config, def.template).fullPath,
            };
        });

    return {
        writeFiles,
    };
}

export function processConfig(config: string, def: ITemplate): IConfig {
    if (!config) {
        throw new Error("Config should not be empty");
    }
    if (config.indexOf("$path") < 0) {
        throw new Error("$path is required in the template config");
    }

    const name = path.basename(def.path);
    const pathOfPath = path.dirname(def.path);
    const currentLocation = getCurrentDirectory();

    const substitute = "___PATH_SEPARATOR";

    let p = replace(config, "$path", path.join(currentLocation, pathOfPath));
    p = replace(p, "$name", name);
    p = replace(p, "/", substitute);
    p = replace(p, substitute, path.sep);

    return {
        fullPath: p,
    };
}

export function processContent(file: IFileDefinition): string {
    return file.content;
}
