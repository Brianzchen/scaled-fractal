#!/usr/bin/env node
const rev = require('../index');

const workingDir = process.argv[2];
const patterns = process.argv[3].split(' ');

rev(workingDir, patterns);
