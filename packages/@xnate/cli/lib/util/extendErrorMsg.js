
const { Command } = require('commander');
const { chalk } = require('@xnate/cli-shared-utils');


module.exports = (errType, logCb) => { 

  // overwrite contructor method 
  Command.prototype[errType] = function (errArg) {

    // chila command class method
    this.outputHelp();
    console.log(`  ${chalk.red(logCb(errArg))}`);
    console.log();
    process.exit(1);
  }

}