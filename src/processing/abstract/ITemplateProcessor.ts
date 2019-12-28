import {IConfig} from "..";
import {ICommandSet, ITemplateDefinition} from "../../models";

export interface ITemplateProcessor {
    process(def: ITemplateDefinition): ICommandSet;
}
