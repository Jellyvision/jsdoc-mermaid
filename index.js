const doctrine = require('doctrine')

// get access to configuration options
const env = require('jsdoc/env');
const config = env.conf.mermaid || {};

const escapeHtmlChar = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => escapeHtmlChar[c])
}

let isAddedMermaid = {}

exports.handlers = {
  newDoclet: function (e) {
    if (!e.doclet.comment || !/@mermaid\b/.test(e.doclet.comment)) return
    let tags = doctrine.parse(e.doclet.comment, { unwrap: true, tags: ['mermaid'], recoverable: true }).tags
    let style = config.style ? ' style="' + config.style + '"' : ''
    let htmls = tags.map(tag => '<div class="mermaid"' + style + '>' + escapeHtml(tag.description) + '</div>')

    if (htmls) {
      e.doclet.description = e.doclet.description || ''
      if (!isAddedMermaid[e.doclet.memberof]) {
        let version = config.version ? '@' + config.version : ''
        let altConfig = {...config}
        delete altConfig.version
        delete altConfig.style
        e.doclet.description += 
          '<script src="https://unpkg.com/mermaid' + version + '/dist/mermaid.min.js"></script>\n' +
          '<script>mermaid.initialize(' + JSON.stringify(altConfig) + ');</script>\n'
        isAddedMermaid[e.doclet.memberof] = true
      }
      e.doclet.description += htmls.join('')
    }
  }
}
