'use strict';

const Package = require('@xnate-cli/package')
const log = require('@xnate-cli/log')
const { exec: spawn } = require('@xnate-cli/utils');
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
			await pkg.update();

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

	if (rootPath) {
		try {
			const args = [...arguments];
			const cmd = args[args.length - 1];
			const o = Object.create(null);
      Object.keys(cmd).forEach(key => {
        if (cmd.hasOwnProperty(key) &&
          !key.startsWith('_') &&
          key !== 'parent') {
          o[key] = cmd[key];
        }
      });
      args[args.length - 1] = o;
      const code = `require('${rootPath}').call(null, ${JSON.stringify(args)})`;
      const child = spawn('node', ['-e', code], {
        cwd: process.cwd(),
        stdio: 'inherit',
      });
      child.on('error', e => {
        log.error(e.message);
        process.exit(1);
      });
      child.on('exit', e => {
        log.verbose('command execute successfully:' + e);
        process.exit(e);
      });
    } catch (e) {
      log.error(e.message);
    }
	}

	// 1. get targetPath -> modulePath
	// 2. modulePath -> Package
	// 3. Package.getRootFile(get entry file)
	// 4. Package.update / .install

}


module.exports = exec;
