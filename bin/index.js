#!/usr/bin/env node

var run = require("../lib/index").run;

run(process.argv)
    .catch(console.error);

