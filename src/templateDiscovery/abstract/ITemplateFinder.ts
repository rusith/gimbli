import ICommand from "../../cli/models/ICommand";
import {ITemplate} from "../../models";

export interface ITemplateFinder {
    findTemplate(command: ICommand): Promise<ITemplate>;
}
