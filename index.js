const doctrine = require('doctrine')

/**
 * @constant {string} JSDOC_MERMAID_TAG
 * @description Matches starting strings of a jsdoc comment
 */
const JSDOC_MERMAID_TAG = /@mermaid\b/

/**
 * @constant {string} MERMAID_VERSION
 * @description Semver Mermaid version
 */
const MERMAID_VERSION = '8.4.8'

/**
 * @constant {string} MERMAID_HTML_SCRIPT
 * @description Html tag that include mermaid library
 */
const MERMAID_HTML_SCRIPT = `<script src="https://unpkg.com/mermaid@${MERMAID_VERSION}/dist/mermaid.min.js"></script>`

/**
 * @constant {Object} ESCAPE_HTML_MAPPING
 * @description Map of all characters that need HTML escaping
 */
const ESCAPE_HTML_MAPPING = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ESCAPE_HTML_MAPPING[c])
}

let isAddedMermaid = {}

exports.handlers = {
  newDoclet: function (e) {
    if (e.doclet.comment && JSDOC_MERMAID_TAG.test(e.doclet.comment)) {
      const tags = doctrine.parse(e.doclet.comment, {
        unwrap: true,
        tags: ['mermaid'],
        recoverable: true
      }).tags

      const htmls = tags.map(tag => [
        '<div class="mermaid">',
        escapeHtml(tag.description),
        '</div>'
      ].join(''))

      if (htmls) {
        e.doclet.description = e.doclet.description || ''

        if (!isAddedMermaid[e.doclet.memberof]) {
          e.doclet.description += MERMAID_HTML_SCRIPT
          isAddedMermaid[e.doclet.memberof] = true
        }

        e.doclet.description += htmls.join('')
      }
    }
  }
}
