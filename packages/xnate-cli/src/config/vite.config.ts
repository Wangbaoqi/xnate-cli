import { get } from 'lodash';
import react from '@vitejs/plugin-react';
import { plugin, Mode } from 'vite-plugin-markdown';
import { createHtmlPlugin } from 'vite-plugin-html';

import {
  SITE_DIR,
  VITE_RESOLVE_EXTENSIONS,
  SITE_CONFIG,
  SITE_PC_ROUTES,
  SITE_MOBILE_ROUTES,
  SITE_PUBLIC_PATH,
} from '../shared/constant';

export const getDevConfig = (xnateConfig: any) => {
  const defaultLanguage = get(xnateConfig, 'defaultLanguage');
  const host = get(xnateConfig, 'host');

  return {
    root: SITE_DIR,
    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,
      alias: {
        '@config': SITE_CONFIG,
        '@pc-routes': SITE_PC_ROUTES,
        '@mobile-routes': SITE_MOBILE_ROUTES,
      },
    },
    server: {
      port: get(xnateConfig, 'port'),
      host: host === 'localhost' ? '0.0.0.0' : host,
    },
    publicDir: SITE_PUBLIC_PATH,
    plugins: [
      react(),
      plugin({
        mode: [Mode.HTML, Mode.TOC, Mode.REACT],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            pcTitle: get(xnateConfig, `pc.title['${defaultLanguage}]`),
            mobileTitle: get(xnateConfig, `mobile.title['${defaultLanguage}']`),
            logo: get(xnateConfig, `logo`),
          },
        },
      }),
    ],
  };
};
