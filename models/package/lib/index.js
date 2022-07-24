"use strict";

const pkgDir = require('pkg-dir').sync;
const npminstall = require('npminstall');
const path = require('path');
const pathExists = require('path-exists').sync;
const formatPath = require('@xnate-cli/format-path');
const { isObject } = require('@xnate-cli/utils');
const { getDefaultRegistry, getNpmLastestVersion } = require('@xnate-cli/npm-info');

class Package {
	constructor(options) {

		if (!options) {
			throw new Error('Package class options param cant is empty')
		}

		if (!isObject(options)) {
			throw new Error('Package class options param is object')
		}

		// package path
		this.targetPath = options.targetPath;
		// package store path
		this.storeDir = options.storeDir;

		this.packageName = options.packageName;
		this.packageVersion = options.packageVersion;

		// cache prefix
		this.cacheFilePathPrefix = this.packageName.replace('/', '_');
	}

	get cacheFilePath() {
		return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`);
	}

	async prepare() {
		if (this.packageVersion === 'latest') {
			this.packageVersion = await getNpmLastestVersion(this.packageName)
		}
	}

	// package is exist
	async exists() {
		if (this.storeDir) {
			await this.prepare();
		} else {
			return pathExists(this.cacheFilePath)
		}
	}

	// install package
	async install() {
		await this.prepare()
		npminstall({
			root: this.targetPath,
			storeDir: this.storeDir,
			registry: getDefaultRegistry(),
			pkgs: [
				{
					name: this.packageName, version: this.packageVersion
				}
			]
		})
	}

	// update package
	update() {

		
	}

	// get entry file path
	getRootFilePath() {
		// 1. get package.json file directory  - pkg-dir
		// 2. read package.json - require
		// 3. main/lib - path
		// 4. be compatible MacOs/Window

		const dir = pkgDir(this.targetPath);

		if (dir) { 
			const pkgFile = require(path.resolve(dir, 'package.json'));
			if (pkgFile?.main) {
				return formatPath(path.resolve(dir, pkgFile.main))
			}
			console.log('package.json file path: ' + pkgFile);
		}
		
		return null;
	}
}

module.exports = Package;


