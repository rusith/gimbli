"use strict";

// tslint:disable-next-line:no-var-requires
const path = require("path");

const fs = jest.genMockFromModule("fs") as any;

function readdir(p, options, callback)  {
    callback(null, [
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
}

function readFile(p, callback) {
    callback(null, "data");
}

function writeFile(p, content, callback) {
    callback(null, content);
}

function mkdir(p, options, callback) {
    callback(null, null);
}

function exists(pa) {
    return false;
}

fs.readdir = readdir;
fs.readFile = readFile;
fs.writeFile = writeFile;
fs.mkdir = mkdir;
module.exports = fs;
