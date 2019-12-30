import {ICommandArgument} from "./ICommandArgument";

export default interface ICommand {
    path: string;
    type: string;
    args: ICommandArgument[];
}
