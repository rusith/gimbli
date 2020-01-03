import {mapMocks} from "../mocking";

let getDirectoriesInsideDirectoryMock: any = () => null;
let getFilesOfDirectoryMock: any = () => null;
let getFileContentMock: any = () => null;
let getCurrentDirectoryMock: any = () => null;
let writeFileMock: any = () => null;
let mkDirMock: any = () => null;
let existsMock: any = () => null;

export const setMockFn = mapMocks([
    [getDirectoriesInsideDirectory, (f) => { getDirectoriesInsideDirectoryMock = f; }],
    [getFilesOfDirectory, (f) => { getFilesOfDirectoryMock = f; }],
    [getFileContent, (f) => { getFileContentMock = f; }],
    [getCurrentDirectory, (f) => { getCurrentDirectoryMock = f; }],
    [writeFile, (f) => { writeFileMock = f; }],
    [createDirectory, (f) => { mkDirMock = f; }],
    [exists, (f) => { existsMock = f; }],
]);

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
