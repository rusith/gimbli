import {IFileDefinition, ITemplate} from ".";
import {IArgumentDefinition} from "./IArgumentDefinition";

export interface ITemplateDefinition {
    template: ITemplate;
    files: IFileDefinition[];
    args: IArgumentDefinition[];
}
