import {ITemplate} from "../../models";

export interface ITemplateFinder {
    findTemplate(name: string): Promise<ITemplate>;
}
