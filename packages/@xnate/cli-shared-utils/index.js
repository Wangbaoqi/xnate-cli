
[
  'env',
  'log',
  'npm',
  'exit',
  'request'
].forEach(m => {
  Object.assign(exports, require(`./lib/${m}`));
})


exports.semver = require('semver');
exports.chalk = require('chalk');

