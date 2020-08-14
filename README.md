# babel-plugin-inline-svg

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependency status][david-dm-image]][david-dm-url]

> Import raw SVG files into your code, optimising with [SVGO](https://github.com/svg/svgo/), and removing ID namespace conflicts.

## What it do

### 1. Turns `import` statements into inline SVG strings

So this:

```js
import someSvg from 'some-svg.svg';
```

Becomes this:

```js
var someSvg = '<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title>home</title><path d="M37.6 24.104l-4.145-4.186v-6.389h-3.93v2.416L26.05 12.43a1.456 1.456 0 0 0-2.07 0L12.43 24.104a1.488 1.488 0 0 0 0 2.092c.284.288.658.431 1.031.431h1.733V38h6.517v-8.475h6.608V38h6.517V26.627h1.77v-.006c.36-.01.72-.145.995-.425a1.488 1.488 0 0 0 0-2.092" fill="#191919" fill-rule="evenodd" id="someSvg-someID"/></svg>';
```

So you can do something like this maybe:

```js
import React from 'react';
import someSvg from 'some-svg.svg';

const NaughtyUsage = () => (
  <span
    dangerouslySetInnerHTML={{
      __html: someSvg,
    }}
  />
);
```

### 2. Namespaces `id`’s to prevent conflicts

If you inline a lot of SVGs you might get namespace conflicts, which could be really annoying if you're styling your SVG in CSS and whatnot. This plugin solves that by combining some [regex trickery](./optimize.js#L30) with SVGO's `prefixIds` plugin.

Configure it via `.babelrc` file:

```json
{
  "plugins": [
    [
      "inline-svg",
      {
        "svgo": {
          "plugins": [
            {
              "prefixIds": {
                "delim": "-",
                "prefix": "customPrefix",
                "prefixIds": true,
                "prefixClassNames": false
              }
            }
          ]
        }
      }
    ]
  ]
}
```

So given this simple `cheese.svg` file:

```svg
<svg><circle cx="10" cy="10" r="50" id="someCircle"></circle></svg>
```

Which you then import like so:

```js
import wheelOfCheese from 'cheese.svg';
```

You get the following output:

```js
var wheelOfCheese = '<svg><circle cx="10" cy="10" r="50" id="customPrefix-someCircle"></circle></svg>';
```

If you want to disable this feature, just pass an empty plugins list as a [plugin option](./test/specs/empty-options.spec.js#L11) to SVGO in your babel settings.

## Installation

```
npm install --save-dev babel-plugin-inline-svg
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    "inline-svg"
  ]
}
```

#### Options

- *`ignorePattern`* - A pattern that imports will be tested against to selectively ignore imports.
- *`svgo`* - svgo options. Example .babelrc:

```js

{
  "plugins": [
    [
      "inline-svg",
      {
        "ignorePattern": /ignoreAThing/,
        "svgo": {
          "plugins": [
            {"cleanupIDs": false},
            {
              "removeDoctype": true,
            }
          ]

        }
      }
    ]
  ]
}

```

**Note:** This babel plugin disables the `cleanupIDs` SVGO plugin by default (to facilitate the ID namespacing). [Pass your own SVGO options](./__tests__/withOpts.test.js#L11) to override this default.

### Via CLI

```sh
$ babel --plugins inline-react-svg script.js
```

### Via Node API


```javascript
require('babel-core').transform('code', {
  plugins: ['inline-react-svg']
}) // => { code, map, ast };
```

# How it works

The [babel part](./babel-plugin-inline-svg.js) is mostly copy-pasta'd from [inline-react-svg](https://github.com/kesne/babel-plugin-inline-react-svg) (thanks [@kesne](https://github.com/kesne)!), with

# Thanks

Big thanks to [inline-react-svg](https://github.com/kesne/babel-plugin-inline-react-svg), which this project is based on.

[npm-url]: https://npmjs.org/package/babel-plugin-inline-svg
[downloads-image]: http://img.shields.io/npm/dm/babel-plugin-inline-svg.svg
[npm-image]: http://img.shields.io/npm/v/babel-plugin-inline-svg.svg
[david-dm-url]:https://david-dm.org/iest/babel-plugin-inline-svg
[david-dm-image]:https://david-dm.org/iest/babel-plugin-inline-svg.svg
