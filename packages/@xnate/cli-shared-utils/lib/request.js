
exports.request = {

  get(url, opt = {}) {
    const fetch = require('node-fetch');
    const fetchOpts = {
      method: 'GET',
      timeout: 5000,
      ...opt
    }

    return fetch(url, fetchOpts).then(response => response.json());
  }
}