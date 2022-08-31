'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const markdown_it_1 = __importDefault(require('markdown-it'));
const front_matter_1 = __importDefault(require('front-matter'));
const esbuild = __importStar(require('esbuild'));
const highlight_js_1 = __importDefault(require('highlight.js'));
const highlight = (str, lang, style) => {
  let link = '';
  if (lang && highlight_js_1.default.getLanguage(lang)) {
    return (
      '<pre class="hljs"><code>' +
      link +
      highlight_js_1.default.highlight(str, { language: lang, ignoreIllegals: true }).value +
      '</code></pre>'
    );
  }
  return '';
};
const markdownToReact = (code, options) => {
  const { body, attributes } = (0, front_matter_1.default)(code);
  const md = (0, markdown_it_1.default)({
    html: true,
    xhtmlOut: true,
    highlight: (str, lang) => highlight(str, lang, options.style),
  });
  const html = md.render(body);
  const htmlOut = `
  import React from 'react';
  const __html = \`${html.replace(/`/g, '&#96;')}\`;
  const attributes = ${JSON.stringify(attributes)};
  export default function ReactComponent(props) {
    return <div className="markdown" dangerouslySetInnerHTML={{__html}} />
  }
  `;
  const result = esbuild.transformSync(htmlOut, {
    loader: 'jsx',
  });
  return {
    code: result.code,
    map: null,
  };
};
const xnatePluginViteMd = (options) => {
  return {
    name: 'xnate-plugin-vite-md',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.md$/.test(id)) {
        return;
      }
      try {
        return markdownToReact(code, options);
      } catch (error) {
        this.error(error);
        return '';
      }
    },
  };
};
exports.default = xnatePluginViteMd;
