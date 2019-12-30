import * as handlebars from "handlebars";
import * as path from "path";
import {ICommandSet, IFileDefinition, ITemplate, ITemplateDefinition} from "../models";
import {IArgumentDefinition} from "../models/IArgumentDefinition";
import {getCurrentDirectory} from "../utils/fileUtils";
import {replace} from "../utils/regexUtils";
import {IConfig} from "./models/IConfig";

export function processTemplate(def: ITemplateDefinition): ICommandSet {
    const writeFiles = def.files
        .map((file) => {
            return {
                content: processContent(file, def.args),
                fullPath: processConfig(file.config, def.template, def.args).fullPath,
            };
        });

    return {
        template: def.template,
        writeFiles,
    };
}

export function processConfig(config: string, def: ITemplate, ags: IArgumentDefinition[] = []): IConfig {
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

    const template = handlebars.compile(p);
    const data = ags.reduce((obj, current) => {
        obj[current.name] = current.value;
        return obj;
    }, {});

    p = replace(template(data), substitute, path.sep);

    return {
        fullPath: p,
    };
}

export function processContent(file: IFileDefinition, args: IArgumentDefinition[] = []): string {
    const template = handlebars.compile(file.content);
    return template(argumentsToData(args));
}

function argumentsToData(args: IArgumentDefinition[]) {
    return args.reduce((obj, current) => {
        obj[current.name] = current.value;
        return obj;
    }, {});
}
