import * as fs from "fs";
import * as path from "path";

export function getDirectoriesInsideDirectory(directory: string): Promise<string[]> {
    return readFiles(directory, (f) => f.isDirectory());
}

export function getFilesOfDirectory(directory: string): Promise<string[]> {
    return readFiles(directory, (f) => f.isFile());
}

export function getCurrentDirectory(): string {
    return process.cwd();
}

export function nextDirectory(current: string, next: string): string {
    if (!current) {
        return next;
    }
    if (!next) {
        return current;
    }
    return path.join(current, next);
}

export function getFileContent(pathToFile: string): Promise<string> {
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

export async function writeFile(filePath: string, content: string): Promise<void> {
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

function readFiles(dir: string, filter: (dir: any) => boolean) {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(dir, {withFileTypes: true}, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.filter(filter).map((f) => path.join(dir, f.name)));
            }
        });
    });
}
