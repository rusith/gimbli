'use strict';

const path = require('path');

const fs = jest.genMockFromModule('fs') as any;

function readdir(p, options, callback)  {
    callback(null, [
        {
            isDirectory: () => false,
            name: "filename.txt"
        },
        {
            isDirectory: () => false,
            name: "filename.png"
        },
        {
            isDirectory: () => true,
            name: "templates"
        }
    ])
}

fs.readdir = readdir;
module.exports = fs;