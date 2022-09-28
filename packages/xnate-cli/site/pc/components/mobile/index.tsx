import React, { useEffect } from 'react';

import './index.scss';

import { getPCLocationInfo } from '../../utils';

interface IMobileProps {
  componentsName?: string;
  language?: string;
  replace?: string;
}

const AppMobile = () => {
  const { language = '', navName = '', secondName } = getPCLocationInfo();

  const componentsName = navName === 'components' ? secondName : 'home';

  console.log(language, componentsName, 'componentsName');

  const replace = '';

  // ${componentsName}&language=${language}&platform=pc&reaplce=${replace}
  return (
    <div className="xnate-site-mobile">
      <div className="xnate-site-mobile__content">
        <iframe id="mobile" src={`http://localhost:8080/mobile.html#/${componentsName}?language=${language}`}></iframe>
      </div>
    </div>
  );
};

export default AppMobile;
