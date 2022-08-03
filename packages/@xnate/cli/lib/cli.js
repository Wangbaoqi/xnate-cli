'use strict';

const os = require('os');

const minimist = require('minimist');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs-extra');

const { semver, chalk, isUpdateCli } = require('@xnate/cli-shared-utils');


const pkgConfig = require('../package.json');
const { DEFAULT_CLI_HOME, NPM_NAME } = require('./const');
const log = console.log;
const userHome = os.homedir();

function checkNodeVersion() {
  const requireNodeVersion = pkgConfig.engines.node;
  
  if (!semver.satisfies(process.version, requireNodeVersion, { includePrerelease: true })) { 
    log(chalk.red(
      `you are using Node ${process.version}, xnate-cli need is a node version above ${requireNodeVersion}`
    ));
    process.exit(1);
  }
}


async function init() {

  // check cli version
  log(chalk.green('xnate-cli version', pkgConfig.version));

  // check node version
  checkNodeVersion(); 

  const args = minimist(process.argv.slice(2));

  // debug mode 
  if (args.debug) {
    process.env.XNATE_CLI_DEBUG = true;
    log(chalk.yellow('xnate-cli is running in debug mode'));
  }

  console.log('start env');

  // check environment
  const envPath = path.resolve(userHome, '.env');
  if (await fs.pathExists(envPath)) {
    dotenv.config({
      path: envPath
    })
  }
  // TODO: whether need to add CLI_HOME environment to .env file

  // check cli update
  const { isNeedUpdate, lastestVersion } = await isUpdateCli(pkgConfig.version, { npmName: NPM_NAME });
  if (!isNeedUpdate) {
    log(chalk.yellow(`please update ${NPM_NAME}, 
    current version: ${pkgConfig.version}, latest version: ${lastestVersion}
    update command: npm install ${NPM_NAME} -g
  `))
  }

}



/**
 * 1. init stage 
 * 2. registry commands stage
 */
async function cli() {
  
  try {
    await init();
    registryCommands();
  } catch (error) {
    log(error.message)
  }
}





module.exports = cli;
