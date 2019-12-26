import {CliUtils} from "./cli/concrete/CliUtils";
import {CommandLineInputValidator} from "./cli/concrete/CommandLineInputValidator";
import {CommandReader} from "./cli/concrete/CommandReader";
import Gimbli from "./Gimbli";

(function (args: string[]) {
    const gimbli =  new Gimbli(new CommandLineInputValidator(), new CommandReader(), new CliUtils());
    gimbli.run(args);
})(process.argv);