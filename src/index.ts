import {getRelevantArguments} from "./cli/cliUtils";
import {validate} from "./cli/commandLineInputValidation";
import {readArguments} from "./cli/readCommands";
import {objectify} from "./objectifying/objectifier";
import {processTemplate} from "./processing/templateProcessing";
import {readTemplate} from "./reading/readingTemplate";
import {findTemplate} from "./templateDiscovery/templateFinding";
import {writeCommands} from "./writing/commandWriting";

(async (args: string[]) => {
    const validated = validate(args);
    if (!validated.isValid) {
        // tslint:disable-next-line:no-console
        validated.errors.forEach((e) => console.error(e));
        return;
    }

    args = getRelevantArguments(args);
    const command = readArguments(args);
    const template = await findTemplate(command);
    const redTemplate = await readTemplate(template);
    const objects = objectify(redTemplate);
    const commands = processTemplate(objects);
    await writeCommands(commands);
})(process.argv);
