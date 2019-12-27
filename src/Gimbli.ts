import {ICliUtils} from "./cli";
import {ICommandLineInputValidator} from "./cli";
import {ICommandReader} from "./cli";
import {ITemplateFinder} from "./templateDiscovery";

export default class Gimbli {
    constructor(private validator: ICommandLineInputValidator,
                private reader: ICommandReader, private cliUtils: ICliUtils, private templateFinder: ITemplateFinder) {
    }

    public async run(args: string[]) {
        const validated = this.validator.validate(args);
        if (!validated.isValid) {
            // tslint:disable-next-line:no-console
            validated.errors.forEach((e) => console.error(e));
            return;
        }

        args = this.cliUtils.getRelevantArguments(args);
        const command = this.reader.read(args);
        const template = await this.templateFinder.findTemplate(command.type);
        // tslint:disable-next-line:no-console
        console.log(template);
    }
}
