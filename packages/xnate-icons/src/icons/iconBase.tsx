import * as React from 'react';

export interface IBaseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  children?: React.ReactNode;
}

const IconBase = React.forwardRef<SVGSVGElement, IBaseIconProps>((props, ref) => {
  const { className, style, name, onClick, children, ...restProps } = props;

  const attr = {
    ref,
    onClick,
    className: ['xnate-icon', className].join(' ').trim(),
    style: { ...style },
    ...restProps,
  };

  return React.cloneElement(children as React.ReactElement, attr);
});

export default IconBase;
