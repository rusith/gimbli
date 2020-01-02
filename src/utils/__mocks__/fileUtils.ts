let getDirectoriesInsideDirectoryMock: any = () => null;
let getFilesOfDirectoryMock: any = () => null;
let getFileContentMock: any = () => null;
let getCurrentDirectoryMock: any = () => null;
let writeFileMock: any = () => null;
let mkDirMock: any = () => null;
let existsMock: any = () => null;

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
    } else if (fn === createDirectory) {
        mkDirMock = mock;
    } else if (fn === exists) {
        existsMock = mock;
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
    return writeFileMock(...args);
}

export async function createDirectory(...args) {
    return mkDirMock(...args);
}

export function exists(...args) {
    return existsMock(...args);
}
