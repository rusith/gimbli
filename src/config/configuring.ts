import {ICommandArgument} from "../cli/models/ICommandArgument";
import {Config} from "../models/Config";

export function getConfigFromParameters(params: ICommandArgument[]): Config {
    const config = new Config();
    if (params && params.length)  {
        config.templateDir = params.find((t) => t.name === "templateDir")!.value;
    }

    return config;
}
