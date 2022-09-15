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
      d="M427.989333 181.12A395.84 395.84 0 0 0 426.666667 213.333333c0 211.754667 172.245333 384 384 384 10.816 0 21.557333-0.437333 32.213333-1.322666C805.344 743.733333 671.232 853.333333 512 853.333333c-188.213333 0-341.333333-153.12-341.333333-341.333333 0-159.232 109.6-293.344 257.322666-330.88M512 85.333333C276.362667 85.333333 85.333333 276.362667 85.333333 512c0 235.648 191.029333 426.666667 426.666667 426.666667 235.648 0 426.666667-191.018667 426.666667-426.666667 0-9.525333-0.426667-18.933333-1.045334-28.309333A297.418667 297.418667 0 0 1 810.666667 512c-164.949333 0-298.666667-133.717333-298.666667-298.666667 0-45.408 10.186667-88.426667 28.309333-126.954666A424.672 424.672 0 0 0 512 85.333333z"
      fillRule="evenodd"
    ></path>
  </svg>
);

const Moon = React.forwardRef<SVGSVGElement, Omit<IBaseIconProps, 'name'>>((props, ref) => {
  return (
    <IconBase name="moon" {...props} ref={ref}>
      <Icon />
    </IconBase>
  );
});

export default Moon;
