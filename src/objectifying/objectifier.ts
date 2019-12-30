import {ITemplate, ITemplateDefinition} from "../models";
import {matchMultiple} from "../utils/regexUtils";
import {IFileSection} from "./models/IFileSection";

export function findFileSections(fileContent: string): IFileSection[] {
    const startRegex = /@#\s*file\s*\((.*)\)@#/;
    const endRegex = /@#@/;
    const startMatches = matchMultiple(startRegex, fileContent);
    const endMatches = matchMultiple(endRegex, fileContent);

    return startMatches.map((match, index) => {
        const end = endMatches[index];
        return {
            config: match.groups[0],
            content: fileContent.substring(match.end, end.start),
        };
    });
}

export function objectify(template: ITemplate): ITemplateDefinition {
    const files = findFileSections(template.content);
    return {
        files: files.map((fs) => ({
            config: fs.config,
            content: fs.content,
        })),
        template,
    };
}
