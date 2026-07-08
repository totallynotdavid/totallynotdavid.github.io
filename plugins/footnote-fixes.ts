import { defineHastPlugin } from 'satteri';

export default defineHastPlugin({
  name: 'footnote-fixes',
  element: {
    filter: ['a', 'h2'],
    visit(node, ctx) {
      const props = node.properties;
      if (!props) return;

      if (node.tagName === 'a' && 'dataFootnoteBackref' in props) {
        delete props.className;
        ctx.setProperty(node, 'className', undefined);
        return;
      }

      if (node.tagName === 'h2' && props.id === 'footnote-label') {
        ctx.replaceNode(node, {
          type: 'element',
          tagName: 'h3',
          properties: { ...props },
          children: node.children,
        });
      }
    },
  },
});
