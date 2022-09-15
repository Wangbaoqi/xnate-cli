var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
    return t;
  };
import * as React from 'react';
const IconBase = React.forwardRef((props, ref) => {
  const { className, style, name, onClick, children } = props,
    restProps = __rest(props, ['className', 'style', 'name', 'onClick', 'children']);
  const attr = Object.assign(
    { ref, onClick, className: ['xnate-icon', className].join(' ').trim(), style: Object.assign({}, style) },
    restProps,
  );
  return React.cloneElement(children, attr);
});
export default IconBase;
