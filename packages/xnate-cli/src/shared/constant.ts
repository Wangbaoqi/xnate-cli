const path = require('path');

export const DEFAULT_CLI_HOME = '.xnate-cli';
export const NPM_NAME = '@xnate-cli/core';
export const DEPENDENCIES_PATH = 'dependencies';

export const CWD = process.cwd();
export const XNATE_CONFIG = path.resolve(CWD, 'xnate.config.js');
export const SRC_DIR = path.resolve(CWD, 'src');
export const SRC_DIR_COMPONENTS = path.resolve(CWD, 'src');
export const ES_DIR = path.resolve(CWD, 'es');
export const LIB_DIR = path.resolve(CWD, 'lib');
export const UMD_DIR = path.resolve(CWD, 'umd');
export const TYPES_DIR = path.resolve(CWD, 'types');
export const ROOT_DOCS_DIR = path.resolve(CWD, 'docs');
export const ROOT_PAGES_DIR = path.resolve(CWD, 'pages');

export const ESLINT_EXTENSIONS = ['.ts', '.js', '.mjs', '.tsx', '.jsx'];
export const VITE_RESOLVE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.less', '.css'];
export const SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
export const PUBLIC_DIR_INDEXES = ['index.tsx', 'index.tsx', 'index.ts', 'index.jsx', 'index.js'];
export const STYLE_DIR_NAME = 'style';
export const EXAMPLE_DIR_NAME = 'example';
export const LOCALE_DIR_NAME = 'locale';
export const DOCS_DIR_NAME = 'docs';
export const DIR_INDEX = 'index.tsx';
export const TESTS_DIR_NAME = '__tests__';
export const GENERATORS_DIR = path.resolve(__dirname, '../generators');
export const UI_PACKAGE_JSON = path.resolve(CWD, 'package.json');
export const CLI_PACKAGE_JSON = path.resolve(__dirname, '../../package.json');

export const SITE = path.resolve(__dirname, '../../site');
export const SITE_OUTPUT_PATH = path.resolve(CWD, 'site');
export const SITE_PUBLIC_PATH = path.resolve(CWD, 'public');
export const SITE_DIR = path.resolve(CWD, '.xnate/site');
export const SITE_PC_DIR = path.resolve(CWD, '.xnate/site/pc');
export const SITE_PC_ROUTES = path.resolve(CWD, '.xnate/pc.routes.ts');
export const SITE_MOBILE_ROUTES = path.resolve(CWD, '.xnate/mobile.routes.ts');
export const SITE_CONFIG = path.resolve(CWD, '.xnate/site.config.json');
