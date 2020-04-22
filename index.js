const doctrine = require('doctrine')
const env = require('jsdoc/env');

/**
 * @constant {string} JSDOC_MERMAID_TAG
 * @description Matches starting strings of a jsdoc comment
 */
const JSDOC_MERMAID_TAG = /@mermaid\b/

/**
 * @constant {string} MERMAID_HTML_SCRIPT
 * @description Html tag that includes mermaid library
 */
const MERMAID_HTML_SCRIPT = '<script src="https://unpkg.com/mermaid${MERMAID_VERSION}/dist/mermaid.min.js"></script>'

/**
 * @constant {string} MERMAID_INIT_SCRIPT
 * @description Html script that include initializes Mermaid with config options
 */
const MERMAID_INIT_SCRIPT = '<script>mermaid.initialize(${MERMAID_CONFIG});</script>\n'

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

/**
 * @constant {object} MERMAID_CONFIG
 * @description Mermaid configuration options from the JSDoc configuration settings
 */
const MERMAID_CONFIG = env.conf.mermaid || {};


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

      let style = MERMAID_CONFIG.style ? ' style="' + MERMAID_CONFIG.style + '"' : ''
        
      const htmls = tags.map(tag => [
        '<div class="mermaid"',
        style,
        '>',
        escapeHtml(tag.description),
        '</div>'
      ].join(''))

      if (htmls) {
        e.doclet.description = e.doclet.description || ''

        if (!isAddedMermaid[e.doclet.memberof]) {
          let version = MERMAID_CONFIG.version ? '@' + MERMAID_CONFIG.version : ''

          // clone the Mermaid config so we can remove our unique options before rendering via JSON.stringify
          let cloneMermaidConfig = {...MERMAID_CONFIG}
          delete cloneMermaidConfig.version
          delete cloneMermaidConfig.style

          let MERMAID_VERSION = version;

          const mermaidScript = tags.map(tag => [
            MERMAID_HTML_SCRIPT.replace('${MERMAID_VERSION}', version),
            MERMAID_INIT_SCRIPT.replace('${MERMAID_CONFIG}', JSON.stringify(cloneMermaidConfig)),
          ].join(''))
          e.doclet.description += mermaidScript
  
          isAddedMermaid[e.doclet.memberof] = true
        }

        e.doclet.description += htmls.join('')
      }
    }
  }
}
