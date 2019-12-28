export interface IFileUtils {
    getFilesOfDirectory?(directory: string): Promise<string[]>;
    getDirectoriesInsideDirectory?(directory: string): Promise<string[]>;
    getCurrentDirectory?(): string;
    nextDirectory?(current: string, next: string): string;
    getFileContent?(pathToFile: string): Promise<string>;
    writeFile?(path: string, content: string): Promise<void> ;
}
