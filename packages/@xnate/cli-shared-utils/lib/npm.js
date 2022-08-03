

const semver = require('semver');
const { request } = require('./request');


/**
 * get npm mirror address
 * @param {*} type npm | cnpm
 */
exports.getRegistry = (type = 'npm') => {
  const MIRRORENUM = {
    npm: 'https://registry.npmjs.org',
    cnpm: 'https://registry.npm.taobao.org'
  }
  return MIRRORENUM[type] || MIRRORENUM.npm;
}


exports.getNpmInfo = async (npm, registry) => {
  registry = registry || exports.getRegistry(registry);
  const url = `${registry}/${npm}`;
  console.log(url, 'url get');
  try {
    return await request.get(url)
  } catch (error) {
    return Promise.reject(error);
  }
}


exports.getNpmLatestVersion = async (npm, registry) => { 
  try {
    const npmData = await exports.getNpmInfo(npm, registry);
    if (!npmData?.['dist-tags'] || !npmData?.['dist-tags'].latest) {
      return Promise.reject(`${npm} now has't latest version`);
    }
    return npmData?.['dist-tags'].latest;
  } catch (error) {
    return Promise.reject(`get ${npm} info occurred error: ${error.message}`);
  }
}

exports.isUpdateCli = async (curVersion, {npmName, registry}) => { 
  const lastestVersion = await exports.getNpmLatestVersion(npmName, registry);
  return {
    isNeedUpdate: lastestVersion && semver.lt(lastestVersion, curVersion),
    lastestVersion
  }
}