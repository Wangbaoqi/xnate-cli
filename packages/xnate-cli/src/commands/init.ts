import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import validNpmName from 'validate-npm-package-name';
import minimist from 'minimist';

import chalk from 'chalk';
// import Initial from '../create/Initial';
import { logger } from '../shared/log';

export const init = async (name: string, options: any) => {
  const cwd = options.packagePath || process.cwd();
  const projectName = name;
  const targetDir = path.resolve(cwd, projectName || '.');
  const { validForNewPackages, errors, warnings } = validNpmName(projectName);

  // validate project name
  if (!validForNewPackages) {
    console.error(chalk.red(`Invalid projectName: ${projectName}`));
    errors && errors.forEach((error) => console.error(chalk.red.bold(`Error: ${error}`)));
    warnings && warnings.forEach((warn) => console.error(chalk.yellow.bold(`Warning: ${warn}`)));
    process.exit(1);
  }

  // project name exists
  if (fs.existsSync(targetDir)) {
    // whether force remove directory
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      const { confirmDelete } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirmDelete',
        message: `projectName ${chalk.cyan.bold(projectName)} already exists, Are you sure you delete it?`,
        default: false,
      });

      if (!confirmDelete) {
        process.exit(1);
      }
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
      await fs.remove(targetDir);
    }
  }

  // init new project

  // const initial = new Initial(name, options);
  // await initial.init();
};

export const initCommand = async (name: string, options: any) => {
  if (minimist(process.argv.slice(3))._.length > 1) {
    logger.warning('WARNING: You provide more than a argument, first argument should is <init>, rest is ignored');
  }
  try {
    await init(name, options);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error('Error Msg' + error.message);
    }
    logger.error('Error Msg' + error);
  }
};
