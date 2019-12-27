import {ITemplate} from "../../models";

export interface ITemplateReader {
    read(template: ITemplate): Promise<ITemplate>;
}
