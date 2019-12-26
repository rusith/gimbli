import * as fs from "fs"
/**
 * Get current location which the script is running
 */
export function getCurrentLocation(): string {
    return process.cwd();
}

/*
    Get files of a directory
 */
export function getFilesOfDirectory(dir: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
            } else {
                return resolve(files);
            }
        })
    });
}

