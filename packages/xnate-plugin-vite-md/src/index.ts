import { bundleMDX } from 'mdx-bundler';
import type { PluginOption } from 'vite';

const markdownToReact = async (source: string, options, id) => {
  const remarkGfm = await import('remark-gfm');
  const remarkToc = await import('./remark/remark-toc-heading');
  const rehypeSlug = await import('rehype-slug');
  const rehypeAutolinkHeadings = await import('rehype-autolink-headings');
  const toc = [];

  const mdJSX = await bundleMDX({
    source,
    // cwd: docCwd,
    mdxOptions: (options, frontmatter) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm.default,
        [remarkToc.default, { exportRef: toc }],
      ];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug.default, rehypeAutolinkHeadings.default];
      return options;
    },
    esbuildOptions: (options) => {
      return options;
    },
  });

  const { code, frontmatter } = mdJSX;

  const tsxOut = `
  const mdContainer = ${JSON.stringify(code)};
  const attributes = ${JSON.stringify(frontmatter)};
  const toc = ${JSON.stringify(toc)};
  export default (props) => {
    return props.children({mdContainer, attributes, toc})
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
