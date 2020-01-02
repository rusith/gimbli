import {getRelevantArguments} from "./cli/cliUtils";
import {validate} from "./cli/commandLineInputValidation";
import {readArguments} from "./cli/readCommands";
import {getConfigFromParameters} from "./config/configuring";
import {logError, logInfo, logSuccess, logWarning} from "./logging/logs";
import {objectify} from "./objectifying/objectifier";
import {processTemplate} from "./processing/templateProcessing";
import {readTemplate} from "./reading/readingTemplate";
import {findTemplate} from "./templateDiscovery/templateFinding";
import {writeCommands} from "./writing/commandWriting";

export async function run(args: string[]) {
    const validated = validate(args);
    if (!validated.isValid) {
        validated.errors.forEach((e) => logError(e));
        return;
    } else if (validated.warnings.length) {
        validated.warnings.forEach((e) => logWarning(e));
    }

    args = getRelevantArguments(args);
    const command = readArguments(args);
    const config = getConfigFromParameters(command.specialArgs);
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
    for (const wf of commands.writeFiles) {
        logInfo(`Writing file ${wf.fullPath}`);
    }
    await writeCommands(commands);
    logSuccess("Successfully completed");
}

if (require.main === module) {
    run(process.argv).catch(logError);
}
