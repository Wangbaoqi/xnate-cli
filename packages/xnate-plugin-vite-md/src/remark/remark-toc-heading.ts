export default function remarkTocHeadings(options) {
  return async (tree) => {
    const { visit } = await import('unist-util-visit');
    const { toString } = await import('mdast-util-to-string');
    const { slug } = (await import('github-slugger')).default;
    return visit(tree, 'heading', (node, index, parent) => {
      const textContent = toString(node);
      options.exportRef.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      });
    });
  };
}
