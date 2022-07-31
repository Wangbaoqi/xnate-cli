'use strict';

const semver = require('semver');
const colors = require('colors/safe');
const log = require('@xnate-cli/log');

const LOWEST_NODE_VERSION = '12.0.0';



class Command {

	constructor(argv) {
		
		if (!argv) {
      throw new Error('parameter must be provided');
    }
    if (!Array.isArray(argv)) {
      throw new Error('parameter must be an array');
    }
    if (argv.length < 1) {
      throw new Error('parameter must be at least one argument');
		}
		
		this._argv = argv;

		let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve();
      chain = chain.then(() => this.checkNodeVersion());
      chain = chain.then(() => this.initArgs());
      chain = chain.then(() => this.init());
      chain = chain.then(() => this.exec());
      chain.catch(err => {
        log.error(err.message);
      });
    });
	}

	initArgs() {
    this._cmd = this._argv[this._argv.length - 1];
    this._argv = this._argv.slice(0, this._argv.length - 1);
  }

  checkNodeVersion() {
    const currentVersion = process.version;
    const lowestVersion = LOWEST_NODE_VERSION;
    if (!semver.gte(currentVersion, lowestVersion)) {
      throw new Error(colors.red(`xnate-cli need installed v${lowestVersion} top level version Node.js`));
    }
  }

  init() {
    throw new Error('init must be implemented');
  }

  exec() {
    throw new Error('exec must be implemented');
  }
}


module.exports = Command;