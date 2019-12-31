import {ITemplate, ITemplateDefinition} from "../models";
import {matchMultiple} from "../utils/regexUtils";
import {IArgumentSection} from "./models/IArgumentSection";
import {IFileSection} from "./models/IFileSection";

const EOL = /\r\n|\r|\n/;

export function findFileSections(fileContent: string): IFileSection[] {
    const startRegex = /@#\s*file\s*\((.*)\)\s*#@/;
    const endRegex = /@#@/;
    const startMatches = matchMultiple(startRegex, fileContent);
    const endMatches = matchMultiple(endRegex, fileContent);

    return startMatches.map((match, index) => {
        const end = endMatches[index];
        const sub = fileContent.substring(match.end, end.start);
        const eolEx = EOL.exec(sub);
        return {
            config: match.groups[0],
            content: (eolEx && eolEx.index === 0) ? sub.replace(EOL, "") : sub,
        };
    });
}

export function objectify(template: ITemplate): ITemplateDefinition {
    let content = template.content;
    const args = findArgSection(content);

    const validArguments = args.arguments.map((a) => {
        const found = template.command.args.find((ar) => ar.name === a);

        return {
            name: a,
            value: found ? found.value : false,
        };
    });

    if (args.end > 0) {
        content = content.substring(args.end);
    }

    const files = findFileSections(content);
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
    const startMatch = matchMultiple(startRegex, fileContent)[0];
    const endMatch = matchMultiple(endRegex, fileContent)[0];

    let ars = [];
    let start = 0;
    let end = 0;
    if (startMatch && endMatch) {
        const definitionContent = fileContent.substring(startMatch.end, endMatch.start).trim();
        if (definitionContent) {
            const lines = definitionContent.split(EOL).map((l) => l.trim());
            ars = lines.map((line) => {
                const match = /^\s*([\w\d]+)\s*/.exec(line);
                if (match) {
                    return match[1];
                }
                return null;
            }).filter((m) => !!m);
            start = startMatch.start;
            end = endMatch.end;
        }
    }

    return {
        arguments: ars,
        end,
        start,
    };
}
