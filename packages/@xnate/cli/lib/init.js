const os = require('os');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const ora = require('ora');
const validNpmName = require('validate-npm-package-name');


const { semver, chalk, exit, request } = require('@xnate/cli-shared-utils');
const { getTemplateList } = require('./util/getTemplate');

const PackageManager = require('./util/PackageManager');
const registryEnum = require('./util/registry');
const spinner = ora();
const userHome = os.homedir();




const prepare = async (name, options) => { 

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
      await fs.remove(targetDir);
    }
  }

  // init new project

  fs.ensureDirSync(targetDir);

  const isCusTmpPath = options.templatePath
  if (isCusTmpPath) {
    return manualCustomizeTemplate(isCusTmpPath)
  }


  const { versionPrompt, templatePrompt, registryPrompt } = require('./promptModules/initPrompt')

  const tmpList = await getTemplateList();

  const { templateName, registry } = await inquirer.prompt([
    templatePrompt(tmpList),
    registryPrompt()
  ])

  const { npmName, version } = tmpList.find(p => p.name === templateName);

  return {
    packageName: npmName,
    packgeVersion: version,
    registry: registryEnum[registry],
  }

}

/**
 * 
 */
const manualCustomizeTemplate = () => { 
  console.log('customizeTemplate');
}


const downloadTemplate = async (initInfo) => { 

  const { packageName, packgeVersion, registry } = initInfo;

  const targetPath = path.resolve(userHome, process.env.XNATE_CLI_HOME, 'template');
  const storeDir = path.resolve(targetPath, 'node_modules');

  const pkgMg = new PackageManager({
    targetPath,
    storeDir,
    packageName,
    packgeVersion,
    registry
  });

  console.log(pkgMg);


  if (! await pkgMg.existsCache()) {
    try {
      spinner.start();
      spinner.text = 'install template modules';
      spinner.color = 'green';
      await pkgMg.install();
    } catch (error) {
      console.log(error);
      exit(1);
    } finally {
      spinner.stop();
    }

    console.log('not exists cache');
  }





}

const init = async (name, options) => {

  const initInfo = await prepare(name, options)
  
  await downloadTemplate(initInfo)



}





module.exports = init;