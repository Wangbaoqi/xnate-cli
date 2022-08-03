'use strict';


const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const fse = require('fs-extra');
const semver = require('semver');
const userHome = require('user-home');
const ora = require('ora');

const Command = require('@xnate-cli/command');
const log = require('@xnate-cli/log')
const {exec: spawn} = require('@xnate-cli/utils');
const Package = require('@xnate-cli/package');

const getProjectTemplate = require('./getProjectTmp');

const TYPE_PROJECT = 'project';
const TYPE_COMPONENT = 'component';
const TEMPLATE_TYPE_NORMAL = 'normal';
const TEMPLATE_TYPE_CUSTOM = 'custom';

const spinner = ora();
class initCommand extends Command { 

	init() {
		this.projectName = this._argv[0] || '';
		this.force = !!this._cmd.force;
		this.template = [];
		this.projectInfo = {};
    log.verbose('projectName', this.projectName);
    log.verbose('force', this.force);
	}

	async exec() { 
		try {
			// 1. prepare stage
      const projectInfo = await this.prepare();
      if (projectInfo) {
        // 2. downloadTemplate
        log.verbose('projectInfo', projectInfo);
        this.projectInfo = projectInfo;
        await this.downloadTemplate();
        // 3. installTemplate
        await this.installTemplate();
      }
		} catch (e) {
			log.error(e.message);
      if (process.env.LOG_LEVEL === 'verbose') {
        console.log(e);
      }
		}
	}

	async downloadTemplate() {
    const { projectTemplate } = this.projectInfo;
    const templateInfo = this.template.find(item => item.npmName === projectTemplate);
    const targetPath = path.resolve(userHome, '.xnate-cli', 'template');
    const storeDir = path.resolve(userHome, '.xnate-cli', 'template', 'node_modules');
    const { npmName, version } = templateInfo;
    const templateNpm = new Package({
      targetPath,
      storeDir,
      packageName: npmName,
      packageVersion: version,
    });
    this.templateNpm = templateNpm;
    this.templateInfo = templateInfo;

    if (!await templateNpm.exists()) {
			try {
				spinner.start();
				spinner.text = 'install template modules';
				spinner.color = 'green';
				await templateNpm.install();
      } catch (e) {
        throw e;
      } finally {
        if (await templateNpm.exists()) {
          log.success('templateNpm download successfully');
          this.templateNpm = templateNpm;
				}
				spinner.stop();
      }
    } else {
      spinner.start();
			spinner.text = 'install template modules';
			spinner.color = 'green';
      try {
        await templateNpm.update();
      } catch (e) {
        throw e;
      } finally {
        spinner.stop();
        if (await templateNpm.exists()) {
          log.success('update templateNpm successfully');
          this.templateNpm = templateNpm;
        }
      }
    }
  }

	async prepare() {
		spinner.start();
		spinner.color = 'yellow';
		spinner.text = 'Loading template...';
		// 0. judge project template exists
		const template = await getProjectTemplate();
		spinner.stop(true);
    if (!template || !template.length) {
      throw new Error('project template not found');
    }
    this.template = template;
    // 1. judge project template whether empty
    const localPath = process.cwd();
    if (!this.isDirEmpty(localPath)) {
      let ifContinue = false;
      if (!this.force) {
        // ask for continue create project template
        ifContinue = (await inquirer.prompt({
          type: 'confirm',
          name: 'ifContinue',
          default: false,
          message: 'current file fold is not empty, whether you want to continue create project ?',
        })).ifContinue;
        if (!ifContinue) {
          return;
        }
      }
      // 2. whether call clear directory
      if (ifContinue || this.force) {
        // ask secondery 
        const { confirmDelete } = await inquirer.prompt({
          type: 'confirm',
          name: 'confirmDelete',
          default: false,
          message: 'whether confirm clear current directory files ?',
        });
        if (confirmDelete) {
          // clear current directory
          fse.emptyDirSync(localPath);
        }
      }
		}
		return this.getProjectInfo();
	}

	async getProjectInfo() {
    function isValidName(v) {
      return /^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(v);
    }

    let projectInfo = {};
    let isProjectNameValid = false;
    if (isValidName(this.projectName)) {
      isProjectNameValid = true;
      projectInfo.projectName = this.projectName;
    }
    // 1. choose create project or component
    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'please select a init type',
      default: TYPE_PROJECT,
      choices: [{
        name: 'project',
        value: TYPE_PROJECT,
      }, {
        name: 'component',
        value: TYPE_COMPONENT,
      }],
    });
    log.verbose('type', type);
    // this.template = this.template.filter(tmp => tmp.);
    const title = type === TYPE_PROJECT ? 'project' : 'component';
    const projectNamePrompt = {
      type: 'input',
      name: 'projectName',
      message: `please input ${title} name`,
      default: '',
      validate: function(v) {
        const done = this.async();
        setTimeout(function() {
          // 1.首字符必须为英文字符
          // 2.尾字符必须为英文或数字，不能为字符
          // 3.字符仅允许"-_"
          if (!isValidName(v)) {
            done(`please input valid ${title} name`);
            return;
          }
          done(null, true);
        }, 0);
      },
      filter: function(v) {
        return v;
      },
    };
    const projectPrompt = [];
    if (!isProjectNameValid) {
      projectPrompt.push(projectNamePrompt);
    }
    projectPrompt.push({
        type: 'input',
        name: 'projectVersion',
        message: `please input ${title} version`,
        default: '1.0.0',
        validate: function(v) {
          const done = this.async();
          setTimeout(function() {
            if (!(!!semver.valid(v))) {
              done('please input valid version');
              return;
            }
            done(null, true);
          }, 0);
        },
        filter: function(v) {
          if (!!semver.valid(v)) {
            return semver.valid(v);
          } else {
            return v;
          }
        },
      },
      {
        type: 'list',
        name: 'projectTemplate',
        message: `please choice ${title} template`,
        choices: this.createTemplateChoice(),
      });
    if (type === TYPE_PROJECT) {
      // 2. getProjectTemplate information
      const project = await inquirer.prompt(projectPrompt);
      projectInfo = {
        ...projectInfo,
        type,
        ...project,
      };
    } else if (type === TYPE_COMPONENT) {
      const descriptionPrompt = {
        type: 'input',
        name: 'componentDescription',
        message: 'please input component description',
        default: '',
        validate: function(v) {
          const done = this.async();
          setTimeout(function() {
            if (!v) {
              done('please input component description');
              return;
            }
            done(null, true);
          }, 0);
        },
      };
      projectPrompt.push(descriptionPrompt);
      // 2. get component description 
      const component = await inquirer.prompt(projectPrompt);
      projectInfo = {
        ...projectInfo,
        type,
        ...component,
      };
    }
    // 生成classname
    // if (projectInfo.projectName) {
    //   projectInfo.name = projectInfo.projectName;
    //   projectInfo.className = require('kebab-case')(projectInfo.projectName).replace(/^-/, '');
    // }
    // if (projectInfo.projectVersion) {
    //   projectInfo.version = projectInfo.projectVersion;
    // }
    // if (projectInfo.componentDescription) {
    //   projectInfo.description = projectInfo.componentDescription;
    // }
    return projectInfo;
  }

  isDirEmpty(localPath) {
    let fileList = fs.readdirSync(localPath);
    // file filter 
    fileList = fileList.filter(file => (
      !file.startsWith('.') && ['node_modules'].indexOf(file) < 0
    ));
    return !fileList || fileList.length <= 0;
  }

  createTemplateChoice() {
    return this.template.map(item => ({
      value: item.npmName,
      name: item.name,
    }));
  }

  // install template
	async installTemplate() {
    log.verbose('templateInfo', this.templateInfo);
    if (this.templateInfo) {
      if (!this.templateInfo?.type) {
        this.templateInfo.type = TEMPLATE_TYPE_NORMAL;
      }
      if (this.templateInfo.type === TEMPLATE_TYPE_NORMAL) {
        // normal template install
        await this.installNormalTemplate();
      } else if (this.templateInfo.type === TEMPLATE_TYPE_CUSTOM) {
        // custom template install
        await this.installCustomTemplate();
      } else {
        throw new Error('无法识别项目模板类型！');
      }
    } else {
      throw new Error('项目模板信息不存在！');
    }
  }

  async installCustomTemplate() { 

  }

  async installNormalTemplate() { 

    spinner.start();
		spinner.color = 'yellow';
		spinner.text = 'install normal template...';

    const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template');
    const targetPath = process.cwd();

    fse.ensureDirSync(templatePath);
    fse.ensureDirSync(targetPath);
    fse.copySync(templatePath, targetPath);

    spinner.stop();


    log.notice('template install...');

    await this.npmInstall(targetPath);

    log.notice('template installed successfully 🎉🎉🎉');



  }

  async npmInstall(targetPath) {
    return new Promise((resolve, reject) => { 
      const ret = spawn('npm', ['install'], { cwd: targetPath, stdio: 'inherit' });
      ret.on('error', reject)
      ret.on('exit', resolve)
    })
  }
}

function init(argv) {
	return new initCommand(argv)
}

module.exports = init;
