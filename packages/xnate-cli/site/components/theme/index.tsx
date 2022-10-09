import React from 'react';
import { Moon, Sun } from '@xnate-design/icons';
import { useLocalStorageState } from 'ahooks';
import './index.scss';

const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useLocalStorageState('XNATE_THEMES', {
    defaultValue: 'light',
  });

  const updateTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updateHTMLTag(newTheme);
  };

  const updateHTMLTag = (val: string) => {
    const html = document.querySelector('html');
    const iframe = document.querySelector('iframe');
    if (iframe) {
      const childHtml = iframe.contentDocument?.querySelector('html');
      childHtml?.setAttribute('data-theme', val);
    }
    html?.setAttribute('data-theme', val);
  };

  React.useEffect(() => {
    updateHTMLTag(theme);
  }, []);

  return [theme, updateTheme];
};

const ThemeAction = () => {
  const [theme, updateTheme] = useTheme();
  return (
    <div className="xnate-site-header__theme" onClick={updateTheme}>
      {theme === 'light' ? <Moon fontSize="20px" /> : <Sun fontSize="20px" />}
    </div>
  );
};

export default ThemeAction;
