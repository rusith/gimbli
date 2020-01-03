"use strict";

import {mapMocks} from "../utils/mocking";

let readdirMock = (p, args, callback) => callback(null, [
    {
        isDirectory: () => false,
        isFile: () => true,
        name: "filename.txt",
    },
    {
        isDirectory: () => false,
        isFile: () => true,
        name: "filename.png",
    },
    {
        isDirectory: () => true,
        isFile: () => false,
        name: "templates",
    },
]);
let readFileMock = (p, callback) => callback(null, "data");
let writeFileMock = (p, content, callback) => callback(null, content);
let mkdirMock = (p, options, callback) => callback(null, null);
let existsMock: any = () => false;

export const setMockFn = mapMocks([
    [readdir, (f) => { readdirMock = f; }],
    [readFile, (f) => { readFileMock = f; }],
    [writeFile, (f) => { writeFileMock = f; }],
    [mkdir, (f) => { mkdirMock = f; }],
    [existsSync, (f) => { existsMock = f; }],
]);
const fs = jest.genMockFromModule("fs") as any;

function readdir(p, opt, callback)  {
    return readdirMock(p, opt, callback);
}

function readFile(p, callback) {
    return readFileMock(p, callback);
}

function writeFile(p, content, callback) {
    return writeFileMock(p, content, callback);
}

function mkdir(p, options, callback) {
    return mkdirMock(p, options, callback);
}

function existsSync(pa) {
    return existsMock(pa);
}

fs.readdir = readdir;
fs.readFile = readFile;
fs.writeFile = writeFile;
fs.mkdir = mkdir;
fs.setMockFn = setMockFn;
fs.existsSync = existsSync;
module.exports = fs;
