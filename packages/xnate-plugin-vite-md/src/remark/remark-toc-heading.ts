// import { visit } from 'unist-util-visit'
// import { slug } from 'github-slugger'
// import { toString } from 'mdast-util-to-string'

export default function remarkTocHeadings(options) {
  return async (tree) => {
    const vl = await import('unist-util-visit');
    console.log(vl, 'vlll');

    const { visit } = await import('unist-util-visit');
    const { toString } = await import('mdast-util-to-string');
    const { slug } = (await import('github-slugger')).default;
    return visit(tree, 'heading', (node, index, parent) => {
      const textContent = toString(node);
      console.log(textContent, 'textContent');

      options.exportRef.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      });
    });
  };
}
