# jsdoc-mermaid

A plugin that parses your JSDocs for [Mermaid](https://mermaidjs.github.io/) syntax and renders the diagrams and flowcharts described.

## Getting Started

Add jsdoc-mermaid to your jsdoc configuration file. That's it!

```javascript
{
    "plugins": ["jsdoc-mermaid"]
}
```

## Usage

Document a method with an `@mermaid` tag using JSDoc Syntax, like so:

```javascript
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 *
 * @mermaid
 *   graph TD;
 *     A-->B;
 *     A-->C;
 *     B-->D;
 *     C-->D;
 */
function Book(title, author) {
  /* ... */
}
```

Generate your JSDocs using the [configuration](http://usejsdoc.org/about-configuring-jsdoc.html) you've specified - for instance:
```bash
jsdoc book.js -c conf.json 
```

When you open that page in JSDoc, you should have a shiny new graph!

![jsdoc-mermaid example](https://user-images.githubusercontent.com/2096353/31104126-b9159786-a7a0-11e7-95ed-689a7f158803.png)


## Built With

* [Mermaid](https://github.com/knsv/mermaid) - Generation of diagram and flowchart from text in a similar manner as markdown
* [Doctrine](https://github.com/eslint/doctrine) - JSDoc parser

## Versioning

We use [SemVer](http://semver.org/) for versioning. 