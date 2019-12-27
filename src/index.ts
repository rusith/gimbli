import {CliUtils} from "./cli";
import {CommandLineInputValidator} from "./cli";
import {CommandReader} from "./cli";
import Gimbli from "./Gimbli";
import {TemplateDiscoveryUtils, TemplateFinder} from "./templateDiscovery";
import {FileUtils} from "./utils";

((args: string[]) => {
    const fileUtils = new FileUtils();
    const commandLineInputValidator = new CommandLineInputValidator();
    const reader = new CommandReader();
    const cliUtils = new CliUtils();
    const templateDiscoveryUtils = new TemplateDiscoveryUtils(fileUtils);
    const templateFinder = new TemplateFinder(templateDiscoveryUtils, fileUtils);
    const gimbli =  new Gimbli(commandLineInputValidator, reader, cliUtils, templateFinder);
    // tslint:disable-next-line:no-console
    gimbli.run(args).then().catch(console.error);
})(process.argv);
