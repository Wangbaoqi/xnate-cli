'use strict';

const Package = require('@xnate-cli/package')
const log = require('@xnate-cli/log')

const path = require('path');


const SETTINGS = {
	init: "@xnate-cli/init"
}

const CACHE_DIR = 'dependencies';

async function exec() {

	const [name, options, cmd] = [...arguments];

	let storeDir = '';
	let pkg = null;
	let targetPath = process.env.CLI_TARGET_PATH;
	const homePath = process.env.CLI_HOME_PATH;

	const packageName = SETTINGS[cmd.name()];
	const packageVersion = 'latest'

	log.verbose('targetPath', targetPath)
	log.verbose('homePath', homePath)

	if (!targetPath) {
		// 
		targetPath = path.resolve(homePath, CACHE_DIR);
		storeDir = path.resolve(targetPath, 'node_modules');
		log.verbose('targetPath', targetPath);
		log.verbose('storeDir', storeDir);

		pkg = new Package({
			targetPath,
			storeDir,
			packageName,
			packageVersion
		})
	
		if (await pkg.exists()) {
			// update package

		} else {
			// install package
			await pkg.install();
		}
	} else {
		// TODO：get cache directory
		pkg = new Package({
			targetPath,
			storeDir,
			packageName,
			packageVersion
		})
	}

	const rootPath = pkg.getRootFilePath();
	rootPath && require(rootPath).call(null, ...arguments)

	console.log(rootPath, 'rootPath');

	// 1. get targetPath -> modulePath
	// 2. modulePath -> Package
	// 3. Package.getRootFile(get entry file)
	// 4. Package.update / .install


	// 
}


module.exports = exec;
