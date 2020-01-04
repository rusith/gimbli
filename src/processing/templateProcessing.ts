import * as handlebars from "handlebars";
import * as path from "path";
import * as safeEval from "safe-eval";
import {ICommandSet, IFileDefinition, ITemplate, ITemplateDefinition} from "../models";
import {IArgumentDefinition} from "../models/IArgumentDefinition";
import {getCurrentDirectory} from "../utils/fileUtils";
import {replace} from "../utils/regexUtils";
import {IConfig} from "./models/IConfig";

const substitute = "___PATH_SEPARATOR";

export function processTemplate(def: ITemplateDefinition): ICommandSet {
    const writeFiles = def.files
        .filter((f) => {
            if (f.if) {
                if (!processIf(f.if, def.args, def.template.path)) {
                    return false;
                }
            }
            return true;
        })
        .map((file) => {
            return {
                content: processContent(file, def.template, def.args),
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

    const [name, pathOfPath] = splitPath(def.path);
    const currentLocation = getCurrentDirectory();
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

export function processContent(file: IFileDefinition, temp: ITemplate, args: IArgumentDefinition[] = []): string {
    const [name, pathOfPath] = splitPath(temp.path);
    let content = replace(file.content, "$path", pathOfPath);
    content = replace(content, "$name", name);
    const template = handlebars.compile(content);
    return template(argumentsToData(args));
}

export function processIf(ifText: string, args: IArgumentDefinition[], templatePath: string): boolean {
    const data = argumentsToData(args) as any;
    const [name, pathOfPath] = splitPath(templatePath);
    if (!data.hasOwnProperty("name")) {
        data.name = name;
    }
    if (!data.hasOwnProperty("path")) {
        data.path = pathOfPath;
    }
    return safeEval(`!!(${ifText})`, data) as boolean;
}

export function splitPath(fullPath: string) {
    const pathOfPath = path.dirname(fullPath);
    const name = path.basename(fullPath);
    return [name, pathOfPath];
}

function argumentsToData(args: IArgumentDefinition[]) {
    return args.reduce((obj, current) => {
        obj[current.name] = current.value;
        return obj;
    }, {});
}
