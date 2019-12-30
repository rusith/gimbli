import {ITemplate, IWriteFileCommand} from ".";

export interface ICommandSet {
    writeFiles: IWriteFileCommand[];
    template: ITemplate;
}
