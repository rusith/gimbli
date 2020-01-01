"use strict";

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
let existsMock = (p) => false;

export function setMockFn(fn: any, mock: any) {
    if (fn === readdir) {
        readdirMock = mock;
    } else if (fn === readFile) {
        readFileMock = mock;
    } else if (fn === writeFile) {
        writeFileMock = mock;
    } else if (fn === mkdir) {
        mkdirMock = mock;
    } else if (fn === exists) {
        existsMock = mock;
    }
}

// tslint:disable-next-line:no-var-requires
const path = require("path");

const fs = jest.genMockFromModule("fs") as any;

function readdir(p, opt, callback)  {
    readdirMock(p, opt, callback);
}

function readFile(p, callback) {
    readFileMock(p, callback);
}

function writeFile(p, content, callback) {
    writeFileMock(p, content, callback);
}

function mkdir(p, options, callback) {
    mkdirMock(p, options, callback);
}

function exists(pa) {
    existsMock(pa);
}

fs.readdir = readdir;
fs.readFile = readFile;
fs.writeFile = writeFile;
fs.mkdir = mkdir;
fs.setMockFn = setMockFn;
module.exports = fs;
