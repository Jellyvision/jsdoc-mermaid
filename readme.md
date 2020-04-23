# jsdoc-mermaid

A plugin that parses your JSDocs for [Mermaid](https://mermaidjs.github.io/) syntax and renders the diagrams and flowcharts described.

## Getting Started

```bash
# install as a local dependency
yarn add -D jsdoc-mermaid # OR npm install -D jsdoc-mermaid
```

And then add `jsdoc-mermaid` to your jsdoc configuration file. That's it!

```json
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

## Customizing Mermaid

You can optionally include a section in your JSDoc configuration file (such as ```conf.json```) to define Mermaid custom configurations.  Simply add a section called ```"mermaid"```:

```json
{
  "mermaid": {
    "theme": "forest"
  }
}
```

This package also supports some new properties to the mermaid configuration:

* ```version```: Let's you specify which Mermaid version to use.  If not provided, defaults to latest Mermaid.
* ```style```: Let's you add optional CSS styles to the surrounding ```<div>``` tag (which also has class ```mermaid``` if you want to use a proper stylesheet).
* ```disableScript```: When true, disables the generation of the script for including Mermaid and initializing it.  This is sometimes needed when using a template that already has Mermaid scripting.  Continues to provide  ```<div class="mermaid">``` around the ```@mermaid``` sections.

```json
{
  "mermaid": {
    "theme": "nuetral",
    "style": "display: flex",
    "version": "8.3.0",
    "flowchart": {
      "curve": "cardinal",
      "htmlLabels": false
    }
  }
}
```

### Mermaid configuration documentation

* [Mermaid API](https://mermaid-js.github.io/mermaid/#/mermaidAPI), however the properties are often incorrect
* [Mermaid configuration defaults](https://mermaid-js.github.io/mermaid/#/mermaidAPI?id=mermaidapi-configuration-defaults) shows the defaults, and appears to be more accurate
* [Source code for the API](https://github.com/mermaid-js/mermaid/blob/master/src/mermaidAPI.js) which is harder to parse but the most accurate


## Built With

* [Mermaid](https://github.com/knsv/mermaid) - Generation of diagram and flowchart from text in a similar manner as markdown
* [Doctrine](https://github.com/eslint/doctrine) - JSDoc parser

## Versioning

We use [SemVer](http://semver.org/) for versioning. 