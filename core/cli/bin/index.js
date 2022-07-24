#! /usr/bin/env node

const importLocal = require('import-local');

if (importLocal(__filename)) {
  require('npmlog').info('cli', 'now using xnate-cli local version')
} else {
  require('../lib')(process.argv[2])
}