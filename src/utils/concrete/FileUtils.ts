import * as fs from "fs";
import * as path from "path";
import {IFileUtils} from "..";

export class FileUtils implements IFileUtils {
    public getDirectoriesInsideDirectory(directory: string): Promise<string[]> {
        return this.readFiles(directory, (f) => f.isDirectory());
    }

    public getFilesOfDirectory(directory: string): Promise<string[]> {
        return this.readFiles(directory, (f) => f.isFile());
    }

    public getCurrentDirectory(): string {
        return process.cwd();
    }

    public nextDirectory(current: string, next: string): string {
        if (!current) {
            return next;
        }
        if (!next) {
            return current;
        }
        return path.join(current, next);
    }

    public getFileContent(pathToFile: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(pathToFile, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        });
    }

    public async writeFile(filePath: string, content: string): Promise<void> {
        if (!filePath) {
            throw new Error("Cannot write to file without a specified path");
        }
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private readFiles(dir: string, filter: (dir: fs.Dirent) => boolean) {
        return new Promise<string[]>((resolve, reject) => {
            fs.readdir(dir, { withFileTypes: true}, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files.filter(filter).map((f) => path.join(dir, f.name)));
                }
            });
        });
    }
}
