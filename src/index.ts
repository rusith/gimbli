import {CliUtils} from "./cli";
import {CommandLineInputValidator} from "./cli";
import {CommandReader} from "./cli";
import Gimbli from "./Gimbli";

((args: string[]) => {
    const gimbli =  new Gimbli(new CommandLineInputValidator(), new CommandReader(), new CliUtils());
    gimbli.run(args);
})(process.argv);
