import {ITemplate, ITemplateDefinition} from "../../models";

export interface IObjectifier {
    objectify(template: ITemplate): ITemplateDefinition;
}
