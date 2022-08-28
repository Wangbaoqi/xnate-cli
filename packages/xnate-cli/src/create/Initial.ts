// import os from 'os';
// import EventEmitter from 'events';
// import path from 'path';
// import fs from 'fs';
// import inquirer from 'inquirer';
// import ora from 'ora';

// import { getTemplateList } from '../util/getTemplate';
// import PackageManager from '../create/PackageManager';

// const execCommand = require('./util/executeCmd');

// const registryEnum = require('./util/registry');
// const userHome = os.homedir();
// const spinner = ora();

// const PACKAGE_MANAGER_CONFIG = {
//   npm: {
//     install: ['install', '--loglevel', 'error'],
//     add: ['install', '--loglevel', 'error'],
//     upgrade: ['update', '--loglevel', 'error'],
//     remove: ['uninstall', '--loglevel', 'error']
//   },
//   pnpm: {},
//   yarn: {
//     install: [],
//     add: ['add'],
//     upgrade: ['upgrade'],
//     remove: ['remove']
//   }
// }

// class Initial extends EventEmitter {

//   constructor(name, options, prompts = []) {
//     super();

//     this.name = name;
//     this.cwd = options.targetPath || process.cwd();
//     this.targetDir = path.resolve(this.cwd, name || '.');
//     this.templateDir = ''
//     this.template = {};
//     this.isCustmp = options.templatePath;
//     this.initPrompt = prompts;
//   }

//   // customize template
//   manualCustomizeTemplate() {

//   }

//   getTemplateByCond(tmpList, type, name) {
//     return tmpList.filter(t => t.type === type).find(n => n.name === name);
//   }

//   async resolvePrompts(tmpList) {
//     const { typePrompt, templatePrompt, registryPrompt, pkmPrompt } = require('./promptModules/initPrompt')

//     const finalPrompts = [
//       typePrompt(),
//       registryPrompt(),
//       templatePrompt(tmpList),
//       pkmPrompt()
//     ]

//     const { type, registry, templateName, pkmbin } = await inquirer.prompt(finalPrompts);

//     this.template = this.getTemplateByCond(tmpList, type, templateName);
//     this.registry = registryEnum[registry];
//     this.pkmbin = pkmbin;
//   }

//   async downloadTemplate() {
//     const { template, registry } = this;
//     const targetPath = path.resolve(userHome, process.env.XNATE_CLI_HOME, 'template');
//     const storeDir = path.resolve(targetPath, 'node_modules');

//     const pkgMg = new PackageManager({
//       targetPath,
//       storeDir,
//       packageName: template.npmName,
//       packgeVersion: template.version,
//       registry
//     });

//     this.templateDir = path.resolve(pkgMg.npmFilePath, 'template');

//     const isCached = await pkgMg.existsCache();

//     try {
//       console.log(`${isCached ? 'Update' : 'Install'} for local template ${chalk.blue(template.npmName)}`);
//       spinner.start();
//       spinner.text = `${isCached ? 'Update' : 'Install'} template modules`;
//       spinner.color = 'green';

//       await (isCached ? pkgMg.update() : pkgMg.install());

//     } catch (error) {
//       console.log(error);
//       exit(1);
//     } finally {
//       spinner.stop();
//     }
//   }

//   async installModule() {
//     const { targetDir, name, pkmbin } = this;
//     await execCommand(
//       pkmbin,
//       [
//         ...PACKAGE_MANAGER_CONFIG[pkmbin]['install']
//       ],
//       {},
//       targetDir
//     )
//   }

//   async installTemplate() {
//     const { templateDir, targetDir, name, pkmbin } = this;

//     console.log();
//     console.log(`✨ Creating project in ${chalk.yellow(targetDir)}`);

//     try {
//       fs.ensureDirSync(templateDir);
//       fs.ensureDirSync(targetDir);
//       fs.copySync(templateDir, targetDir);

//       console.log(`📦 start Installing dependencies for ${chalk.yellow(name)}`);
//       console.log();

//       await this.installModule();
//       console.log();

//     } catch (e) {
//       console.error(`Create project failed: ${e}`);
//       throw e
//     }

//     console.log(`🎉  Successfully created project ${chalk.yellow(name)}`);
//     console.log(
//       `👉  Get started with the following commands:\n\n` +
//       (this.context === process.cwd() ? `` : chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`)) +
//       chalk.cyan(` ${chalk.gray('$')} ${pkmbin === 'yarn' ? 'yarn start' : pkmbin === 'pnpm' ? 'pnpm run serve' : 'npm run serve'}`)
//     )
//     console.log();

//   }

//   async init() {

//     const { name, targetDir, templatePath, isCustmp } = this;

//     let tmpList = [];

//     try {
//       console.log(`Fetching remote templates of ${chalk.cyan('xnate-cli')}...`)
//       tmpList = await getTemplateList();
//     } catch (e) {
//       console.error(`Fetching remote templates of ${chalk.cyan('xnate-cli')} failed: ${e}`);
//       throw e
//     }

//     await this.resolvePrompts(tmpList);

//     await this.downloadTemplate();

//     await this.installTemplate();

//   }
// }

// module.exports = Initial
