import {ITemplateFile} from "../templateDiscovery";

export  interface ITemplate {
  path: string;
  name: string;
  file: ITemplateFile;
  content?: string;
}
