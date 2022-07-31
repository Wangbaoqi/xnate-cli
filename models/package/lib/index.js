"use strict";

const pkgDir = require('pkg-dir').sync;
const npminstall = require('npminstall');
const fse = require('fs-extra');
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

	getSpecificPackageVersion(packageVersion) {
		return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${packageVersion}@${this.packageName}`);
	}

	async prepare() {
		if (this.storeDir && !pathExists(this.storeDir)) {
			fse.mkdirpSync(this.storeDir);
		}
		if (this.packageVersion === 'latest') {
			this.packageVersion = await getNpmLastestVersion(this.packageName)
		}
	}

	// package is exist
	async exists() {
		if (this.storeDir) {
			await this.prepare();
			return pathExists(this.cacheFilePath)
		} else {
			return pathExists(this.targetPath)
		}
	}

	// install package
	async install() {
		await this.prepare()
		return npminstall({
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
	async update() {
		await this.prepare();
		// 1. get lastest installed packageVersion
		const latestPackageVersion = await getNpmLastestVersion(this.packageName);
		// 2. search lastest version whether exists or not
		const latestFilePath = this.getSpecificPackageVersion(latestPackageVersion);
		// 3. if not exists, install latest package versions
		if (!pathExists(latestFilePath)) { 
			await npminstall({
				root: this.targetPath,
				storeDir: this.storeDir,
				registry: getDefaultRegistry(),
				pkgs: [
					{
						name: this.packageName, version: latestPackageVersion
					}
				]
			})
		}
		// update current packageVersion
		this.packageVersion = latestPackageVersion
		// return latestFilePath;
	}

	// get entry file path
	getRootFilePath() {
		// 1. get package.json file directory  - pkg-dir
		// 2. read package.json - require
		// 3. main/lib - path
		// 4. be compatible MacOs/Window

		const _getRootPath = (targetPath) => {
			const dir = pkgDir(targetPath);
			if (dir) { 
				const pkgFile = require(path.resolve(dir, 'package.json'));
				if (pkgFile?.main) {
					return formatPath(path.resolve(dir, pkgFile.main))
				}
			}
			return null;
		}

		// use storeDir
		if (this.storeDir) {
			return _getRootPath(this.cacheFilePath);
		} else {
			return _getRootPath(this.targetPath);
		}
	}
}

module.exports = Package;


