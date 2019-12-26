import * as fs from "fs";
import {IFileUtils} from "..";

export class FileUtils implements IFileUtils {
    public getDirectoriesInsideDirectory(directory: string): Promise<string[]> {
        return this.readFiles(directory, (f) => f.isDirectory());
    }

    public getFilesOfDirectory(directory: string): Promise<string[]> {
        return this.readFiles(directory, (f) => f.isFile());
    }

    private readFiles(dir: string, filter: (dir: fs.Dirent) => boolean) {
        return new Promise<string[]>((resolve, reject) => {
            fs.readdir(dir, { withFileTypes: true}, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files.filter(filter).map((f) => f.name));
                }
            });
        });
    }

}
