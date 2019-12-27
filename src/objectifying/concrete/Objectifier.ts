import {IObjectifier} from "..";
import {ITemplate, ITemplateDefinition} from "../../models";
import {IRegexUtils} from "../../utils";
import {IFileSection} from "../models/IFileSection";

export class Objectifier implements IObjectifier {
    constructor(private regex: IRegexUtils) {}

    public findFileSections(fileContent: string): IFileSection[] {
        const fileRegex = /@#\s*file\s*\((.*)\)@#([\s\S]*)@#@/;
        const matches = this.regex.matchMultiple(fileRegex, fileContent);
        return matches.map((match) => {
            return {
                config: match.groups[0],
                content: match.groups[1],
            };
        });
    }

    public objectify(template: ITemplate): ITemplateDefinition {
        return undefined;
    }
}
