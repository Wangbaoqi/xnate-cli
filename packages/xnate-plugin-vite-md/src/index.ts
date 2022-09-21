import MarkdownIt from 'markdown-it';
import frontmatter from 'front-matter';
import * as esbuild from 'esbuild';
import hljs from 'highlight.js';

import { bundleMDX } from 'mdx-bundler';

import type { PluginOption } from 'vite';

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

const injectCodeExample = (source) => {
  const codeRE = /(<pre class="hljs">(.|\r|\n)*?<\/pre>)/g;

  return source.replace(codeRE, (str) => {
    const flags = [
      '// playground-ignore\n',
      '<span class="hljs-meta">#</span><span class="bash"> playground-ignore</span>\n',
      '<span class="hljs-comment">// playground-ignore</span>\n',
      '<span class="hljs-comment">/* playground-ignore */</span>\n',
      '<span class="hljs-comment">&lt;!-- playground-ignore --&gt;</span>\n',
    ];

    const attr = flags.some((f) => str.includes(f)) ? 'playground-ignore' : '';

    str = flags.reduce((str, f) => str.replace(f, ''), str);

    return `<CodeExample attr=${attr} code=${str} />`;
  });
};

const extractComponents = (source) => {
  const componentRE = /import (.+) from ['"].+['"]/;
  const importRE = /import .+ from ['"].+['"]/g;
  const reactRE = /```react((.|\r|\n)*?)```/g;
  const imports = [];
  const components = [];

  source = source.replace(reactRE, (_, p) => {
    const partImps = p.match(importRE);
    const partComponents = partImps?.map((importer) => {
      importer = importer.replace(/(\n|\r)/g, '');
      const component = importer.replace(componentRE, '$1');
      !imports.includes(importer) && imports.push(importer);
      !components.includes(component) && components.push(component);

      return `<${component} />`;
    });
    return partComponents ? `<div class="varlet-component-preview">${partComponents.join('\n')}</div>` : '';
  });

  return {
    source,
    imports,
    components,
  };
};

const markdownToReact = async (source: string, options, id) => {
  // const { body, attributes } = frontmatter(code);

  // const { source, imports, components } = extractComponents(body);

  // const md = MarkdownIt({
  //   html: true,
  //   xhtmlOut: true,
  //   highlight: (str: string, lang: string) => highlight(str, lang, options.style),
  // });

  // const html = md.render(body);

  // const htmlString = injectCodeExample(html)

  // const codeBlock = `\`${htmlString.replace(/`/g, '&#96;')}\``

  // const codeTsx = esbuild.transformSync(codeBlock, {
  //   loader: 'jsx',
  // });

  // const tsxOut = `
  // const mdContainer = ${codeTsx.code};
  // const attributes = ${JSON.stringify(attributes)};
  // export default (props) => {
  //   return props.children({mdContainer, attributes})
  // }
  // `
  // const result = esbuild.transformSync(tsxOut, {
  //   loader: 'jsx',
  // });

  const mdJSX = await bundleMDX({
    source,
    // cwd: docCwd,
    mdxOptions: (options, frontmatter) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];

      return options;
    },
    esbuildOptions: (options) => {
      return options;
    },
  });

  const { code, frontmatter } = mdJSX;

  // const exported = getMDXExport(code);

  // console.log(code, 'code');
  // console.log(typeof code, 'frontmatter');

  const tsxOut = `
  const mdContainer = ${JSON.stringify(code)};
  const attributes = ${JSON.stringify(frontmatter)};
  export default (props) => {
    return props.children({mdContainer, attributes})
  }
  `;

  return {
    code: tsxOut,
  };
};

const plugin = (options): PluginOption => {
  return {
    name: 'xnate-plugin-vite-md',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.md$/.test(id)) {
        return;
      }
      try {
        return markdownToReact(code, options, id);
      } catch (error) {
        this.error(error);
        return '';
      }
    },
  };
};

export default plugin;
