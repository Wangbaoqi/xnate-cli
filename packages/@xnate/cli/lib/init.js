const os = require('os');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const ora = require('ora');
const validNpmName = require('validate-npm-package-name');


const { semver, chalk, exit, request, execCommand } = require('@xnate/cli-shared-utils');
const { getTemplateList } = require('./util/getTemplate');

const PackageManager = require('./util/PackageManager');
const registryEnum = require('./util/registry');
const spinner = ora();
const userHome = os.homedir();


const pm = 'yarn'


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

  const template = tmpList.find(p => p.name === templateName);

  return {
    packageName: template.npmName,
    packgeVersion: template.version,
    registry: registryEnum[registry],
    template,
    targetDir
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

  const isCached = await pkgMg.existsCache();


  try {
    spinner.start();
    spinner.text = `${isCached ? 'Update' : 'Install'} template modules`;
    spinner.color = 'green';
    if (isCached) {
      await pkgMg.update();
    } else {
      await pkgMg.install();
    }
  } catch (error) {
    console.log(error);
    exit(1);
  } finally {
    spinner.stop();
  }

  return {
    templatePath: path.resolve(pkgMg.npmFilePath, 'template')
  }
}


const installModule = async (targetDir) => { 
  return new Promise((resolve, reject) => { 
    execCommand('npm', ['install', '--registry=https://registry.npm.taobao.org'], {
      stdio: 'inherit',
      cwd: targetDir,
    })
      .on('error', e => reject(e))
      .on('exit', e => resolve(e))
  })
}

const installTemplate = async (tmpPath, targetDir) => { 

  spinner.start();
  spinner.text = 'start install template...';
  spinner.color = 'green';

  fs.ensureDirSync(tmpPath);
  fs.ensureDirSync(targetDir);
  fs.copySync(tmpPath, targetDir);
  spinner.stop();


  console.log(`📦 start Installing dependencies for ${chalk.yellow(targetDir)}...`);
  await installModule(targetDir)



}

const init = async (name, options) => {

  const { targetDir, ...rest } = await prepare(name, options);
  
  console.log(`✨ Creating project in ${chalk.yellow(targetDir)}`);

  const { templatePath } = await downloadTemplate(rest);

  await installTemplate(templatePath, targetDir);

  console.log(`🎉  Successfully created project ${chalk.yellow(demo)}`);
  console.log(
    `👉  Get started with the following commands:\n\n` +
    (this.context === process.cwd() ? `` : chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`)) +
    chalk.cyan(` ${chalk.gray('$')} ${pm === 'yarn' ? 'yarn start' : pm === 'pnpm' ? 'pnpm run serve' : 'npm run serve'}`)
  )
  console.log();
}





module.exports = init;