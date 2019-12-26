import {ICliUtils} from "./cli";
import {ICommandLineInputValidator} from "./cli";
import {ICommandReader} from "./cli";

export default class Gimbli {
    constructor(private validator: ICommandLineInputValidator,
                private reader: ICommandReader, private cliUtils: ICliUtils) {
        this.reader = reader;
        this.validator = validator;
        this.cliUtils = cliUtils;
    }

    public run(args: string[]) {
        const validated = this.validator.validate(args);
        if (!validated.isValid) {
            // tslint:disable-next-line:no-console
            validated.errors.forEach((e) => console.error(e));
            return;
        }

        args = this.cliUtils.getRelevantArguments(args);
        const command = this.reader.read(args);

        // tslint:disable-next-line:no-console
        console.log(command);
    }
}
