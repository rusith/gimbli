import {ITemplateDiscoveryUtils, ITemplateFinder} from "..";

export class TemplateFinder implements ITemplateFinder {
    constructor(private utils: ITemplateDiscoveryUtils) {}

    public async findTemplate(name: string): Promise<any> {
        throw new Error("Invalid command name");
    }
}
