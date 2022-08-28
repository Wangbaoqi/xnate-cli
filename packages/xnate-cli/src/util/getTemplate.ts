import { request } from '../shared/request';

const BASE_URL = 'https://api.wangbaoqi.tech/api/';

export const getTemplateList = async () => {
  try {
    const ret = await request.get(BASE_URL + '/cli/getTemplate');
    return ret?.data || [];
  } catch (error) {
    console.log('get template list error', error);
  }
};
