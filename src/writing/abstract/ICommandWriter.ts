import {ICommandSet} from "../../models";

export interface ICommandWriter {
    write(commands: ICommandSet): Promise<any>;
}
