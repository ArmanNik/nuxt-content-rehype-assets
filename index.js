const visit = require('unist-util-visit')

module.exports = attacher

function attacher() {
  return transformer

  function transformer(tree) {
    visit(tree, 'element', visitor)

    function visitor(node) {
      const { tagName = '', properties = {} } = node
      const { src = '', alt = '' } = properties

      if (
        tagName === 'AppImage' ||
        tagName === 'app-image' ||
        tagName === 'img'
      ) {
          if (src.startsWith('~/assets/')) {
            node.tagName = 'app-image'
            node.properties['v-bind:alt'] = `"${alt}"`
            node.properties['v-bind:src'] = `"${src.replace('~/assets/', '')}"`
            delete node.properties.alt
            delete node.properties.src
          }
      }
    }
  }
}
