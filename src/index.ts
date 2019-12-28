import {CliUtils} from "./cli";
import {CommandLineInputValidator} from "./cli";
import {CommandReader} from "./cli";
import Gimbli from "./Gimbli";
import {Objectifier} from "./objectifying";
import {TemplateProcessor} from "./processing";
import {TemplateReader} from "./reading";
import {TemplateDiscoveryUtils, TemplateFinder} from "./templateDiscovery";
import {FileUtils} from "./utils";
import {RegexUtils} from "./utils/concrete/RegexUtils";
import {CommandWriter} from "./writing";

((args: string[]) => {
    const fileUtils = new FileUtils();
    const regexUtils = new RegexUtils();
    const commandLineInputValidator = new CommandLineInputValidator();
    const reader = new CommandReader();
    const cliUtils = new CliUtils();
    const templateDiscoveryUtils = new TemplateDiscoveryUtils(fileUtils);
    const templateFinder = new TemplateFinder(templateDiscoveryUtils, fileUtils);
    const templateReader = new TemplateReader(fileUtils);
    const objectifier = new Objectifier(regexUtils);
    const processor = new TemplateProcessor(fileUtils);
    const writer = new CommandWriter(fileUtils);
    const gimbli = new Gimbli(commandLineInputValidator, reader,
        cliUtils, templateFinder, templateReader, objectifier, processor, writer);
    // tslint:disable-next-line:no-console
    gimbli.run(args).then().catch(console.error);
})(process.argv);
