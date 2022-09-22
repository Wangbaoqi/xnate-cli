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
      d="M319.968 960c-5.92 0-11.904-1.664-17.184-4.992-12.672-8.064-18.016-23.84-12.896-37.952L402.304 608 160 608c-12.928 0-24.608-7.776-29.568-19.744s-2.208-25.728 6.944-34.88l480-480c12.512-12.512 32.736-12.512 45.248 0s12.512 32.736 0 45.248L237.248 544 448 544c10.432 0 20.224 5.088 26.208 13.664 6.016 8.544 7.424 19.456 3.872 29.28l-78.72 216.448L786.752 416 576 416c-17.696 0-32-14.336-32-32s14.304-32 32-32l288 0c12.928 0 24.64 7.808 29.568 19.744 4.96 11.968 2.208 25.728-6.944 34.88l-544 544C336.448 956.8 328.224 960 319.968 960z"
      fillRule="evenodd"
    ></path>
  </svg>
);

const Light = React.forwardRef<SVGSVGElement, Omit<IBaseIconProps, 'name'>>((props, ref) => {
  return (
    <IconBase name="light" {...props} ref={ref}>
      <Icon />
    </IconBase>
  );
});

export default Light;
