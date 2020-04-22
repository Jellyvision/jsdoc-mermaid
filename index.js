const doctrine = require('doctrine')

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
    let htmls = tags.map(tag => '<div class="mermaid">' + escapeHtml(tag.description) + '</div>')
    if (htmls) {
      e.doclet.description = e.doclet.description || ''
      if (!isAddedMermaid[e.doclet.memberof]) {
        e.doclet.description += '<script src="https://unpkg.com/mermaid@8.5.0/dist/mermaid.min.js"></script>\n' +
          '<script>\n' +
          'var config = {\n' +
          '  startOnLoad:true,\n' +
          '  flowchart:{\n' +
          '    useMaxWidth:false,\n' +
          '    htmlLabels:true\n' +
          '  }\n' +
          '};\n' +
          'console.log("initializing mermaid...");\n' +
          'mermaid.initialize(config);\n' +
          '</script>'
        isAddedMermaid[e.doclet.memberof] = true
      }
      e.doclet.description += htmls.join('')
    }
  }
}
