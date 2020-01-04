/* tslint:disable:no-trailing-whitespace */
import {getRelevantArguments} from "./cli/cliUtils";
import {validate} from "./cli/commandLineInputValidation";
import {readArguments} from "./cli/readCommands";
import {getConfiguration} from "./config/configuring";
import {logError, logInfo, logSuccess, logWarning} from "./logging/logs";
import {objectify} from "./objectifying/objectifier";
import {processTemplate} from "./processing/templateProcessing";
import {readTemplate} from "./reading/readingTemplate";
import {findTemplate} from "./templateDiscovery/templateFinding";
import {writeCommands} from "./writing/commandWriting";

const banner = `
 _____ _       _   _ _ 
|   __|_|_____| |_| |_|
|  |  | |     | . | | |
|_____|_|_|_|_|___|_|_|
`;

export async function run(args: string[]) {
    logInfo(banner);
    const validated = validate(args);
    if (!validated.isValid) {
        validated.errors.forEach((e) => logError(e));
        return;
    } else if (validated.warnings.length) {
        validated.warnings.forEach((e) => logWarning(e));
    }

    args = getRelevantArguments(args);
    const command = readArguments(args);
    const config = await getConfiguration(command.specialArgs);
    const template = await findTemplate(command, config);
    const redTemplate = await readTemplate(template);
    const objects = objectify(redTemplate);

    if (command.args.length) {
        logInfo("Arguments: ");
        for (const arg of command.args) {
            const accepted = objects.args.find((a) => a.name === arg.name);
            if (accepted) {
                logInfo(`  ${accepted.name}: ${accepted.value}`);
            } else {
                logWarning(`  ${arg.name}: ignored (not declared in template)`);
            }
        }
    }

    const commands = processTemplate(objects);
    await writeCommands(commands);
    logSuccess("Successfully completed");
}

if (require.main === module) {
    run(process.argv).catch(logError);
}
