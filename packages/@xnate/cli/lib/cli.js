
const os = require('os');
const minimist = require('minimist');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs-extra');
const { program, Command } = require('commander');

const { semver, chalk } = require('@xnate/cli-shared-utils');


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

  // check node version
  checkNodeVersion(); 

  const args = minimist(process.argv.slice(2));

  // debug mode 
  if (args.debug) {
    process.env.XNATE_CLI_DEBUG = true;
    log(chalk.yellow('xnate-cli is running in debug mode'));
  }

  // check environment
  const envPath = path.resolve(userHome, '.env');
  if (await fs.pathExists(envPath)) {
    dotenv.config({
      path: envPath
    })
  }
  process.env.XNATE_CLI_HOME = '.xnate-cli';
  process.env.XNATE_CLI_CACHE_DIR = 'dependencies';
  process.env.XNATE_CLI_CACHE_MODULES = 'node_modules';



  // check cli update
  // const { isNeedUpdate, lastestVersion } = await isUpdateCli(pkgConfig.version, { npmName: NPM_NAME });
  // if (!isNeedUpdate) {
  //   log(chalk.yellow(`please update ${NPM_NAME}, 
  //   current version: ${pkgConfig.version}, latest version: ${lastestVersion}
  //   update command: npm install ${NPM_NAME} -g
  // `))
  // }

}

function registryCommands() {

  program
    .version(`@xnate-cli/cli ${pkgConfig.version}`)
    .usage('<command> [options]')
  
  program
    .command('init <app-name>')
    .description('generate a project from remote template')
    .option('-p, --packagePath <packagePath>', 'Customize the create project path')
    .option('-f, --force', 'Force overwrite existing directory files')
    .option('-T, --templatePath <templatePath>', 'Customize the template from remote repositories')

    .option('-c, --clone', 'Use git clone when fetching remote repositories')
    .action((name, options) => {
      if (minimist(process.argv.slice(3))._.length > 1) {
        log(chalk.yellow('WARNING: You provide more than a argument, first argument should is <init>, rest is ignored'))
      }
      try {
        require('./init')(name, options);
      } catch (error) {
        log(chalk.red('Error Msg', error))
      }
    })
  
  program.on('command:*', ([cmd]) => {
    log();
    log(chalk.red(`Unknow Command ${chalk.cyan(cmd)}`))
    log();
    program.outputHelp();
    process.exit(1);
  })

  program.on('--help', () => {
    log();
    log(`  Run ${chalk.cyan('xnate-cli <command> --help')} for usage details of command`)
    log();
  })
  
  program.commands.forEach(c => c.on('--help', () => console.log()))
  
  const extendsErrorMsg = require('./util/extendErrorMsg');

  extendsErrorMsg('missingArgument', argName => {
    return `Missing required argument <${chalk.yellow(argName)}>`
  })
  
  program
    .option('-d, --debug', 'Enable debug output')
    .parse(process.argv)

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
    log(error)
  }
}

module.exports = cli;
