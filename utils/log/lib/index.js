'use strict';


const log = require('npmlog')

log.level = process.env.LOG_LEVEL || 'info';
log.addLevel('success', 2000, { fg: 'green', bold: true });
log.heading = 'xnate-cli';
// log.headingStyle = { fg: ''}


module.exports = log;
