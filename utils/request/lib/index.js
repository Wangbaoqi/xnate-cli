'use strict';

const axios = require('axios');

console.log(process.env.XNATE_CLI_BASE_URL, 'url');

const BASE_URL = process.env.XNATE_CLI_BASE_URL ? process.env.XNATE_CLI_BASE_URL :
  'http://cli-dev.wangbaoqi.tech:7001';

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

module.exports = request;
