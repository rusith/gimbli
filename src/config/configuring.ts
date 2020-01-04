import {ICommandArgument} from "../cli/models/ICommandArgument";
import {Config} from "../models/Config";
import {exists, getFileContent} from "../utils/fileUtils";

export function getConfigFromParameters(params: ICommandArgument[]): Config {
    const config = {} as Config;
    if (params && params.length)  {
        const templateDir = params.find((t) => t.name === "templateDir");
        if (templateDir) {
            config.templateDir = templateDir.value;
        } else  {
            delete config.templateDir;
        }
    }

    return config;
}

export async function readConfigFile(): Promise<Config > {
    const configFile = "./gimbli.json";
    if (exists(configFile)) {
        const data = await getFileContent(configFile);
        return JSON.parse(data) as Config;
    }
    return new Config();
}

export async function getConfiguration(params: ICommandArgument[]): Promise<Config> {
    return  {
        ...(new Config()),
        ...(await readConfigFile()),
        ...(getConfigFromParameters(params)),
    };
}
