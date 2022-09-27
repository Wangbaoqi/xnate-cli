'use strict';
// import fs from 'fs-extra';
// import path from 'path';
// import npminstall from 'npminstall';
// const { getNpmLatestVersion } = require('@xnate/cli-shared-utils');
// class PackageManager {
//   constructor(options) {
//     if (!options) {
// 			throw new Error('Package class options param cant is empty')
// 		}
//     const { targetPath, storeDir, packageName, packgeVersion, registry } = options;
//     // package path
// 		this.root = targetPath;
// 		// package store path
// 		this.storeDir = storeDir;
// 		this.name = packageName;
// 		this.version = packgeVersion;
// 		// cache prefix
//     this.cacheFilePathPrefix = this.name.replace('/', '_');
//     this.registry = registry;
//   }
//   get npmFilePath() {
// 		return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.version}@${this.name}`);
//   }
//   async prepare() {
//     if (this.storeDir && !fs.pathExistsSync(this.storeDir)) {
//       fs.ensureDirSync(this.storeDir);
//     }
//     if (this.version === 'latest') {
// 			// this.version = await getNpmLastestVersion(this.name)
//     }
//   }
//   async install() {
//     return await this.runCommand();
//   }
//   async update() {
//     this.version = await getNpmLatestVersion(this.name);
//     return await this.runCommand();
//   }
//   async existsCache() {
//     await this.prepare();
//     return fs.pathExistsSync(this.npmFilePath);
//   }
//   async runCommand() {
//     const { root, storeDir, registry, name, version } = this;
//     await this.prepare();
//     return npminstall({
//       root,
//       storeDir,
//       registry,
//       pkgs: [{ name, version }]
//     })
//   }
// }
// module.exports = PackageManager;
//# sourceMappingURL=PackageManager.js.map
