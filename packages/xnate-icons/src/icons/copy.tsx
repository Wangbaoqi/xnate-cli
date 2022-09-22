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
      d="M592 96H353C308.8 96 272 130.8 272 175V192h-15C212.8 192 176 226.8 176 271v576c0 44.2 36.8 81 81 81h416c44.2 0 79-36.8 79-81V832h17c44.2 0 79-36.8 79-81V352L592 96z m0 89.2l166.8 166.8H592V185.2z m96 661.8c0 9.4-6.8 17-15 17h-416c-8.8 0-17-8.2-17-17v-576c0-8.2 7.6-15 17-15h15v511c0 44.2 20.8 65 65 65H688v15z m96-96c0 9.4-6.8 17-15 17h-416c-8.8 0-17-8.2-17-17v-576c0-8.2 7.6-15 17-15H528v256h256v335z"
      fillRule="evenodd"
    ></path>
  </svg>
);

const Copy = React.forwardRef<SVGSVGElement, Omit<IBaseIconProps, 'name'>>((props, ref) => {
  return (
    <IconBase name="light" {...props} ref={ref}>
      <Icon />
    </IconBase>
  );
});

export default Copy;
