export interface IFileUtils {
    getFilesOfDirectory?(directory: string): Promise<string[]>;
    getDirectoriesInsideDirectory?(directory: string): Promise<string[]>;
    getCurrentDirectory?(): string;
    nextDirectory?(current: string, next: string): string;
}
