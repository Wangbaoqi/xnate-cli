'use strict';

const axios = require('axios');
const urljoin = require('url-join');
const semver = require('semver');


const getNpmInfo = (npmName, registry) => {
  if (!npmName) return null;
  registry = registry || getDefaultRegistry();
  const npmInfoUrl = urljoin(registry, npmName);
  return axios.get(npmInfoUrl).then((res) => {
    if (res.status == '200') {
      return res.data
    } else {
      return null
    }
  }).catch((err) => {
    return Promise.resolve(err)
  });
}

const getDefaultRegistry = (isOrginal = false) => {
  return isOrginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org'
}


const getNpmVersion = async (npmName, registry) => {
  const data = await getNpmInfo(npmName, registry);
  return data.versions ? Object.keys(data.versions) : [];
}

const getNpmSemverVersions = (baseVersion, versions) => {
  return versions
    .filter(v => semver.satisfies(v, `^${baseVersion}`))
    .sort((a, b) => semver.gt(b, a))
}

const getNpmSemverVersion = async (baseVersion, npmName, registry) => {
  const versions = await getNpmVersion(npmName, registry);
  const newVersions = getNpmSemverVersions(baseVersion, versions);
  if (newVersions && newVersions.length) {
    return newVersions[0]
  }
}

const getNpmLastestVersion = async (npmName, registry) => {
  const versions = await getNpmVersion(npmName, registry);
  versions && versions.sort((a, b) => semver.gt(b, a));
  return versions[0];

}

module.exports = {
  getNpmInfo,
  getNpmVersion,
  getNpmSemverVersion,
  getDefaultRegistry,
  getNpmLastestVersion
};