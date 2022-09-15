'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var React = _interopRequireWildcard(require('react'));

var _iconBase = _interopRequireDefault(require('./iconBase'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

const Icon = (props) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        viewBox: '0 0 1024 1024',
        xmlns: 'http://www.w3.org/2000/svg',
        width: '1em',
        height: '1em',
        fill: 'currentColor',
      },
      props,
    ),
    React.createElement('path', {
      d: 'M554.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333334 0V42.666667a42.666667 42.666667 0 0 1 85.333334 0z m-42.666667 810.666666a42.666667 42.666667 0 0 0-42.666667 42.666667v85.333333a42.666667 42.666667 0 0 0 85.333334 0v-85.333333a42.666667 42.666667 0 0 0-42.666667-42.666667zM149.962667 149.962667a42.666667 42.666667 0 0 0 0 60.341333l60.341333 60.341333a42.666667 42.666667 0 0 0 60.341333-60.341333l-60.341333-60.341333a42.666667 42.666667 0 0 0-60.341333 0z m603.392 603.392a42.666667 42.666667 0 0 0 0 60.330666v0.010667l60.341333 60.341333a42.666667 42.666667 0 0 0 60.341333-60.341333l-60.341333-60.341333a42.656 42.656 0 0 0-60.341333 0zM0 512a42.666667 42.666667 0 0 0 42.666667 42.666667h85.333333a42.666667 42.666667 0 0 0 0-85.333334H42.666667a42.666667 42.666667 0 0 0-42.666667 42.666667z m853.333333 0a42.666667 42.666667 0 0 0 42.666667 42.666667h85.333333a42.666667 42.666667 0 0 0 0-85.333334h-85.333333a42.666667 42.666667 0 0 0-42.666667 42.666667zM149.962667 874.037333a42.666667 42.666667 0 0 0 60.341333 0l60.330667-60.341333a42.666667 42.666667 0 0 0-60.330667-60.341333l-60.341333 60.341333a42.666667 42.666667 0 0 0 0 60.341333z m603.392-603.392a42.666667 42.666667 0 0 0 60.330666 0h0.010667l60.341333-60.341333a42.666667 42.666667 0 0 0-60.341333-60.341333l-60.341333 60.341333a42.656 42.656 0 0 0 0 60.341333zM768 512c0 141.386667-114.613333 256-256 256S256 653.386667 256 512s114.613333-256 256-256 256 114.613333 256 256z m-85.333333 0c0-94.261333-76.405333-170.666667-170.666667-170.666667s-170.666667 76.405333-170.666667 170.666667 76.405333 170.666667 170.666667 170.666667 170.666667-76.405333 170.666667-170.666667z',
      fillRule: 'evenodd',
    }),
  );

const Sun = React.forwardRef((props, ref) => {
  return React.createElement(
    _iconBase.default,
    Object.assign(
      {
        name: 'moon',
      },
      props,
      {
        ref: ref,
      },
    ),
    React.createElement(Icon, null),
  );
});
var _default = Sun;
exports.default = _default;
