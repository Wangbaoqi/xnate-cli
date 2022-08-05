
const { semver, chalk, exit, request } = require('@xnate/cli-shared-utils');

const BASE_URL = 'https://api.wangbaoqi.tech/api/'


exports.getTemplateList = async () => {
  try {
    const ret = await request.get(BASE_URL + '/cli/getTemplate');
    return ret?.data || [];
  } catch (error) {
    console.log('get template list error', error)
  }

}