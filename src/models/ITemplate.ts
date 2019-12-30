import ICommand from "../cli/models/ICommand";
import {ITemplateFile} from "../templateDiscovery";

export  interface ITemplate {
  path: string;
  name: string;
  file: ITemplateFile;
  content?: string;
  command: ICommand;
}
