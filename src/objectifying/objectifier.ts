import {ITemplate, ITemplateDefinition} from "../models";
import {matchMultiple} from "../utils/regexUtils";
import {IArgumentSection} from "./models/IArgumentSection";
import {IFileSection} from "./models/IFileSection";

export function findFileSections(fileContent: string): IFileSection[] {
    const startRegex = /@#\s*file\s*\((.*)\)#@/;
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
    const args = findArgSection(template.content);

    const validArguments = args.arguments.map((a) => {
        const found = template.command.args.find((ar) => ar.name === a);
        if (found)  {
            return {
                name: a,
                value: found.value,
            };
        }
    }).filter((i) =>  !!i);

    return {
        args: validArguments,
        files: files.map((fs) => ({
            config: fs.config,
            content: fs.content,
        })),
        template,
    };
}

export function findArgSection(fileContent: string): IArgumentSection {
    const startRegex = /@#\s*args\s*#@/;
    const endRegex = /@#@/;
    const startMatches = matchMultiple(startRegex, fileContent)[0];
    const endMatches = matchMultiple(endRegex, fileContent)[0];

    let ars = [];
    if (startMatches && endMatches) {
        const definitionContent = fileContent.substring(startMatches.end, endMatches.start).trim();
        if (definitionContent) {
            const lines = definitionContent.split(/\r\n|\r|\n/).map((l) => l.trim());
            ars = lines.map((line) => {
                const match = /^\s*([\w\d]+)\s*/.exec(line);
                if (match) {
                    return match[1];
                }
                return null;
            }).filter((m) => !!m);
        }
    }

    return {
        arguments: ars,
    };
}
