import ICommand from "../cli/models/ICommand";
import {ITemplateFile} from "../templateDiscovery/models/ITemplateFile";

export  interface ITemplate {
  path: string;
  name: string;
  file: ITemplateFile;
  content?: string;
  command: ICommand;
}
