const doctrine = require('doctrine');

exports.handlers = {
  newDoclet: function(e) {
    let mermaidComment = doctrine.parse([e.doclet.comment].join('\n'), { unwrap: true, tags: ['mermaid'], recoverable: true }).tags;
    e.doclet.description = e.doclet.description || '';
    e.doclet.description = '<script type="text/javascript" src="https://unpkg.com/mermaid@7.1.0/dist/mermaid.min.js"></script>' + e.doclet.description;
    for (let i = 0; i < mermaidComment.length; i++) {
      e.doclet.description += '<div class="mermaid">' + mermaidComment[i].description + '</div>'
    }
  }
};