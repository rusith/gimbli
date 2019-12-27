import {IObjectifier} from "..";
import {ITemplate, ITemplateDefinition} from "../../models";
import {IRegexUtils} from "../../utils";
import {IFileSection} from "../models/IFileSection";

export class Objectifier implements IObjectifier {
    constructor(private regex: IRegexUtils) {}

    public findFileSections(fileContent: string): IFileSection[] {
        const startRegex = /@#\s*file\s*\((.*)\)@#/;
        const endRegex = /@#@/;
        const startMatches = this.regex.matchMultiple(startRegex, fileContent);
        const endMatches = this.regex.matchMultiple(endRegex, fileContent);

        return startMatches.map((match, index) => {
            const end = endMatches[index];
            return {
                config: match.groups[0],
                content: fileContent.substring(match.end, end.start),
            };
        });
    }

    public objectify(template: ITemplate): ITemplateDefinition {
        const files = this.findFileSections(template.content);
        return {
            files: files.map((fs) => ({
                config: fs.config,
                content: fs.content,
            })),
        };
    }
}
