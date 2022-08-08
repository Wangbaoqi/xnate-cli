const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const validNpmName = require('validate-npm-package-name');

const { chalk, exit } = require('@xnate/cli-shared-utils');
const Initial = require('./Initial');



const init = async (name, options) => {

  const cwd = options.packagePath || process.cwd();
  const projectName = name;
  const targetDir = path.resolve(cwd, projectName || '.');
  const { validForNewPackages, errors, warnings } = validNpmName(projectName);

  // validate project name
  if (!validForNewPackages) {
    console.error(chalk.red(`Invalid projectName: ${projectName}`));
    errors && errors.forEach(error => console.error(chalk.red.bold(`Error: ${error}`)));
    warnings && warnings.forEach(warn => console.error(chalk.yellow.bold(`Warning: ${warn}`)));
    exit(1);
  }

  // project name exists
  if (fs.existsSync(targetDir)) {
    // whether force remove directory
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      const { confirmDelete } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirmDelete',
        message: `projectName ${chalk.cyan.bold(projectName)} already exists, Are you sure you delete it?`,
        default: false
      })

      if (!confirmDelete) {
        exit(1);
      }
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
      await fs.remove(targetDir);
    }
  }

  // init new project

  const initial = new Initial(name, options);
  await initial.init();
}

module.exports = init;