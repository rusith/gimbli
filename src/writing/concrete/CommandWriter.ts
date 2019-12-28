import {ICommandWriter} from "..";
import {ICommandSet, IWriteFileCommand} from "../../models";
import {IFileUtils} from "../../utils";

export class CommandWriter implements ICommandWriter {
    constructor(private fileUtils: IFileUtils) {}

    public async write(commands: ICommandSet): Promise<any> {
        await Promise.all(commands.writeFiles.map(this.writeFile.bind(this)));
    }

    public writeFile(command: IWriteFileCommand): Promise<void> {
        return this.fileUtils.writeFile(command.fullPath, command.content);
    }
}
