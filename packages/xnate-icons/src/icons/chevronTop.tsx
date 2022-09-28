import * as React from 'react';
import IconBase, { IBaseIconProps } from './iconBase';

const Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path
      d="M887.328 617.152 533.952 267.008c-0.512-0.512-1.216-0.672-1.76-1.152-0.128-0.128-0.16-0.32-0.288-0.448-12.576-12.416-32.832-12.352-45.28 0.192L136.512 618.944c-12.448 12.576-12.352 32.8 0.192 45.248 6.24 6.176 14.4 9.28 22.528 9.28 8.224 0 16.48-3.168 22.72-9.472l327.84-330.816 332.48 329.408c6.24 6.176 14.368 9.28 22.528 9.28 8.256 0 16.48-3.168 22.72-9.472C899.968 649.856 899.872 629.6 887.328 617.152z"
      fillRule="evenodd"
    ></path>
  </svg>
);

const ChevronDown = React.forwardRef<SVGSVGElement, Omit<IBaseIconProps, 'name'>>((props, ref) => {
  return (
    <IconBase name="chevron-right" {...props} ref={ref}>
      <Icon />
    </IconBase>
  );
});

export default ChevronDown;
