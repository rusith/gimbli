let getDirectoriesInsideDirectoryMock: any = () => null;
let getFilesOfDirectoryMock: any = () => null;
let getFileContentMock: any = () => null;
let getCurrentDirectoryMock: any = () => null;
let writeFileMock: any = () => null;

export function setMockFn(fn: any, mock: any) {
    if (fn === getDirectoriesInsideDirectory) {
        getDirectoriesInsideDirectoryMock = mock;
    } else if (fn === getFilesOfDirectory) {
        getFilesOfDirectoryMock = mock;
    } else if (fn === getFileContent) {
        getFileContentMock = mock;
    } else if (fn === getCurrentDirectory ) {
        getCurrentDirectoryMock = mock;
    } else if (fn === writeFile) {
        writeFileMock = mock;
    }
}

export function getDirectoriesInsideDirectory(...args): Promise<string[]> {
    return getDirectoriesInsideDirectoryMock(...args);
}

export function getFilesOfDirectory(...args): Promise<string[]> {
    return getFilesOfDirectoryMock(...args);
}

export function getFileContent(...args) {
    return getFileContentMock(...args);
}

export function getCurrentDirectory() {
    return getCurrentDirectoryMock();
}

export async function writeFile(...args) {
    writeFileMock(...args);
}

//
//
// export function nextDirectory(current: string, next: string): string {
//     if (!current) {
//         return next;
//     }
//     if (!next) {
//         return current;
//     }
//     return path.join(current, next);
// }
//
//
// export async function writeFile(filePath: string, content: string): Promise<void> {
//     if (!filePath) {
//         throw new Error("Cannot write to file without a specified path");
//     }
//     return new Promise<void>((resolve, reject) => {
//         fs.writeFile(filePath, content, (err) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve();
//             }
//         });
//     });
// }
//
// function readFiles(dir: string, filter: (dir: any) => boolean) {
//     return new Promise<string[]>((resolve, reject) => {
//         fs.readdir(dir, {withFileTypes: true}, (err, files) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(files.filter(filter).map((f) => path.join(dir, f.name)));
//             }
//         });
//     });
// }
