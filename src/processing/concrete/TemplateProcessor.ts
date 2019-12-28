import * as path from "path";
import {IConfig, ITemplateProcessor} from "..";
import {ICommandSet, IFileDefinition, ITemplate, ITemplateDefinition} from "../../models";
import {IFileUtils} from "../../utils";

export class TemplateProcessor implements ITemplateProcessor {
    constructor(private fileUtils: IFileUtils) {}

    public process(def: ITemplateDefinition): ICommandSet {
        const writeFiles = def.files
            .map((file) => {
                return {
                    content: this.processContent(file),
                    fullPath: this.processConfig(file.config, def.template).fullPath,
                };
            });

        return {
            writeFiles,
        };
    }

    public processConfig(config: string, def: ITemplate): IConfig {
        if (!config) {
            throw new Error("Config should not be empty");
        }
        if (config.indexOf("$path") < 0) {
            throw new Error("$path is required in the template config");
        }

        const name = path.basename(def.path);
        const pathOfPath = path.dirname(def.path);
        const currentLocation = this.fileUtils.getCurrentDirectory();

        const p = config.replace("$path", path.join(currentLocation, pathOfPath))
            .replace("$name", name);

        return {
            fullPath: p,
        };
    }

    public processContent(file: IFileDefinition): string {
        return file.content;
    }
}
