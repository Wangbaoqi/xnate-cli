const request = require('@xnate-cli/request');

module.exports = function() {
  return request({
    url: '/project/template',
  });
};
