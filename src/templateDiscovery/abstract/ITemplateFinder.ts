export interface ITemplateFinder {
    findTemplate(name: string): Promise<any>;
}
