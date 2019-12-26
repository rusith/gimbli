import {readInputAsCommand} from "./cli/readCommand";
import {getRelevantArguments} from "./cli/utils";
import {validateCommandLineInputs} from "./cli/validateInputs";

(function (args: string[]) {
    const validated = validateCommandLineInputs(args);
    if (!validated.isValid) {
        validated.errors.forEach(e => console.error(e));
        return;
    }
    
    args = getRelevantArguments(args);
    const command = readInputAsCommand(args);
    console.log(command);
})(process.argv);