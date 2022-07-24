"use strict";

module.exports = core;

const fsPromises = require('node:fs/promises');
const path = require('path');
const semver = require('semver')
const colors = require('colors/safe')
const pkg = require('../package.json')
const userHome = require('user-home');
const commander = require('commander')

const init = require('@xnate-cli/init')
const exec = require('@xnate-cli/exec')
// import pathExists from 'path-exists'
// import rootCheck from 'root-check';

const log = require('@xnate-cli/log')
const { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME } = require('./const');


let args, config;

const program = new commander.Command()


async function core() {
  
	try {
		// cli prepare stage
		await prepare();

		// cli command registry state
		registryCommand();

	} catch (e) {
		log.error(e.message);

		if (program.opts().debug) {
			console.log(e);
		}
	}
	
}

/******** prepare stage start *********/

// check cli version
const checkPkgVersion = () => {
	log.info('cli', pkg.version)
}

// check node version
const checkNodeVersion = () => {
	// first current node version
	const currentVersion = process.version;
	// set lowest node version
	const lowestVersion = LOWEST_NODE_VERSION;
	// check version
	if (!semver.gte(currentVersion, lowestVersion)) {
		throw new Error(colors.red(`xnate-cli need install lowestVersion v${lowestVersion} Node.js`))
	}
}

// check is root
const checkRoot = () => {
	rootCheck()
}

// check user home
const checkUserHome = () => {
	console.log(userHome);
	// if (!userHome || !pathExists(userHome)) {
	// 	throw new Error(colors.red('current user home path not exists'))
	// }
}

const createDefaulfConfig = () => {
	const cliConfig = {
		home: userHome
	}
	if (process.env.CLI_HOME) {
		cliConfig['cliHome'] = path.resolve(userHome, process.env.CLI_HOME)
	} else {
		cliConfig['cliHome'] = path.resolve(userHome, DEFAULT_CLI_HOME)
	}
	process.env.CLI_HOME_PATH = cliConfig.cliHome
}

// check env var
const checkEnv = () => {
	const dotenv = require('dotenv');
	const dotenvPath = path.resolve(userHome, '.env');
	if (pathExists(dotenvPath)) {
		dotenv.config({
			path: dotenvPath
		});
	}
	createDefaulfConfig()
}

// check global version
const checkGlobalVersion = async () => {
	const curVersion = pkg.version;
	const npmName = pkg.name;
	const { getNpmSemverVersion } = require('@xnate-cli/npm-info');
	const lastVersions = await getNpmSemverVersion(curVersion, npmName);
	if (lastVersions && semver.gt(lastVersions, curVersion)) {
		log.warn('update info', colors.yellow(`please Manual update ${npmName}, current version ${curVersion}, 
			new version ${lastVersions}
			update command: npm install -g ${npmName}
		`))
	}
}

const pathExists = async (path) => {
	try {
		await fsPromises.access(path);
		return true
	} catch (error) {
		return false
	}
}

const prepare = async () => {
	checkPkgVersion();
	checkNodeVersion();
	// checkRoot();
	// checkUserHome();
	checkEnv();
	await checkGlobalVersion();
}

/******** prepare stage end *********/


/******** commander registry *********/

// 
const registryCommand = () => {
	program
		.name(Object.keys(pkg.bin)[0])
		.usage('<command> [options]')
		.version(pkg.version)
		.option('-d, --debug', 'is open debug mode', false)
		.option('-tp, --targetPath <targetPath>', 'whether appoint the file path of local debug', '')

	
	program
		.command('init [projectName]')
		.option('-f, --force', 'whether force init project')
		.action(exec)
	
	
	program.on('option:targetPath', () => {
		// console.log(program.opts());
		// console.log(projectName, options, cmd.parent.opts());
		// child command get global command object need to visit `cmd.parent` in action method
		// in order to solve the problem, we can listen global option，aim to global option pour to env variable.
		process.env.CLI_TARGET_PATH = program.opts().targetPath;
	})
	
	program.on('option:debug', function () {
		const { debug } = this.opts()
		if (debug) {
			process.env.LOG_LEVEL = 'verbose'
		} else {
			process.env.LOG_LEVEL = 'info'
		}
		log.level = process.env.LOG_LEVEL;
	})

	// unknow command listen
	program.on('command:*', (obj) => {
		// const cmd = this.opts()
		console.log(program.commands, obj);
		const availableCommand = program.commands.map(cmd => cmd.name());
		console.log(colors.red(`unknow command: ${obj[0]}`));
		console.log(colors.red(`available command: ${availableCommand.join(',')}`));
	})


	// console.log(program);
	
	program.parse(process.argv)
}