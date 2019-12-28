import {ICliUtils} from "./cli";
import {ICommandLineInputValidator} from "./cli";
import {ICommandReader} from "./cli";
import {IObjectifier} from "./objectifying";
import {ITemplateProcessor} from "./processing";
import {ITemplateReader} from "./reading";
import {ITemplateFinder} from "./templateDiscovery";
import {ICommandWriter} from "./writing";

export default class Gimbli {
    constructor(private validator: ICommandLineInputValidator,
                private reader: ICommandReader, private cliUtils: ICliUtils, private templateFinder: ITemplateFinder,
                private templateReader: ITemplateReader, private objectifier: IObjectifier,
                private templateProcessor: ITemplateProcessor, private commandWriter: ICommandWriter) {
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
        const template = await this.templateFinder.findTemplate(command);
        const readTemplate = await this.templateReader.read(template);
        const objects = this.objectifier.objectify(readTemplate);
        const commands = this.templateProcessor.process(objects);
        await this.commandWriter.write(commands);
    }
}
