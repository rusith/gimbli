import {ICliUtils} from "./cli/abstract/ICliUtils";
import {ICommandLineInputValidator} from "./cli/abstract/ICommandLineInputValidator";
import {ICommandReader} from "./cli/abstract/ICommandReader";

export default class Gimbli {
    constructor(private validator: ICommandLineInputValidator, private reader: ICommandReader, private cliUtils: ICliUtils) {
        this.reader = reader;
        this.validator = validator;
        this.cliUtils = cliUtils;
    }
    
    run(args: string[]) {
        const validated = this.validator.validate(args);
        if (!validated.isValid) {
            validated.errors.forEach(e => console.error(e));
            return;
        }

        args = this.cliUtils.getRelevantArguments(args);
        const command = this.reader.read(args);
        console.log(command);
    }
}