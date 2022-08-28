import * as os from 'os';
import minimist from 'minimist';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';
import { Command } from 'commander';

import { logger } from './shared/log';
import chalk from 'chalk';
import { semver } from '@xnate/cli-shared-utils';

import { devUi, genUi, initCommand } from './commands';

const pkgConfig = require('../package.json');

const log = console.log;
const userHome = os.homedir();
const program = new Command();

function checkNodeVersion() {
  const requireNodeVersion = pkgConfig.engines.node;

  if (!semver.satisfies(process.version, requireNodeVersion, { includePrerelease: true })) {
    log(
      chalk.red(`you are using Node ${process.version}, xnate-cli need is a node version above ${requireNodeVersion}`),
    );
    process.exit(1);
  }
}

async function init() {
  // check node version
  checkNodeVersion();

  const args = minimist(process.argv.slice(2));

  // debug mode
  if (args.debug) {
    process.env.XNATE_CLI_DEBUG = 'on';
    log(chalk.yellow('xnate-cli is running in debug mode'));
  }

  // // check environment
  const envPath = path.resolve(userHome, '.env');
  if (await fs.pathExists(envPath)) {
    dotenv.config({
      path: envPath,
    });
  }
  process.env.XNATE_CLI_HOME = '.xnate-cli';
  process.env.XNATE_CLI_CACHE_DIR = 'dependencies';
  process.env.XNATE_CLI_CACHE_MODULES = 'node_modules';
}

function registryCommands() {
  program.version(`@xnate-cli/cli ${pkgConfig.version}`).usage('<command> [options]');

  program
    .command('init <app-name>')
    .description('generate a project from remote template')
    .option('-p, --packagePath <packagePath>', 'Customize the create project path')
    .option('-f, --force', 'Force overwrite existing directory files')
    .option('-T, --templatePath <templatePath>', 'Customize the template from remote repositories')
    .option('-c, --clone', 'Use git clone when fetching remote repositories')
    .action(initCommand);

  program.command('gen:ui <app-name>').description('Generates the UI for the specified component').action(genUi);

  program.command('dev:ui').description('run xnate ui component development').action(devUi);

  program.on('command:*', ([cmd]) => {
    log();
    log(chalk.red(`Unknow Command ${chalk.cyan(cmd)}`));
    log();
    program.outputHelp();
    process.exit(1);
  });

  program.on('--help', () => {
    log();
    log(`  Run ${chalk.cyan('xnate-cli <command> --help')} for usage details of command`);
    log();
  });

  program.commands.forEach((c) => c.on('--help', () => console.log()));

  // const extendsErrorMsg = require('./util/extendErrorMsg');

  // extendsErrorMsg('missingArgument', (argName: string) => {
  //   return `Missing required argument <${chalk.yellow(argName)}>`;
  // });

  program.option('-d, --debug', 'Enable debug output').parse(process.argv);
}

/**
 * 1. init stage
 * 2. registry commands stage
 */
export async function cli() {
  try {
    await init();
    registryCommands();
  } catch (error) {
    log(error);
  }
}
