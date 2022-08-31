import MarkdownIt from 'markdown-it';
import frontmatter from 'front-matter';
import * as esbuild from 'esbuild';
import hljs from 'highlight.js';

import type { Plugin, TransformResult } from 'vite';

const highlight = (str, lang, style) => {
  let link = '';
  if (lang && hljs.getLanguage(lang)) {
    return (
      '<pre class="hljs"><code>' +
      link +
      hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
      '</code></pre>'
    );
  }
  return '';
};

const markdownToReact = (code: string, options) => {
  const { body, attributes } = frontmatter(code);

  const md = MarkdownIt({
    html: true,
    xhtmlOut: true,
    highlight: (str: string, lang: string) => highlight(str, lang, options.style),
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

const xnatePluginViteMd = (options): Plugin => {
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

export default xnatePluginViteMd;
