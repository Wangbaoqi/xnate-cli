'use strict';


const isObject = obj => {
	return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}




module.exports = {
  isObject
};
