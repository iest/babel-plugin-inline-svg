# babel-plugin-inline-svg

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependency status][david-dm-image]][david-dm-url]

> Import raw SVG files into your code, optimising with [SVGO](https://github.com/svg/svgo/), and removing ID namespace conflicts.

<!-- TOC depthFrom:2 depthTo:3 -->

- [What it do](#what-it-do)
  - [1. Turns `import` statements into inline SVG strings](#1-turns-import-statements-into-inline-svg-strings)
  - [2. Optimises the SVG through SVGO](#2-optimises-the-svg-through-svgo)
  - [3. Namespaces `id`’s to prevent conflicts](#3-namespaces-ids-to-prevent-conflicts)
  - [4. Exporting as dataURI format](#4-exporting-as-datauri-format)
- [Installation](#installation)
- [Usage](#usage)
  - [Via `.babelrc` (Recommended)](#via-babelrc-recommended)
  - [Options](#options)
  - [Via CLI](#via-cli)
  - [Via Node API](#via-node-api)

<!-- /TOC -->

## What it do

### 1. Turns `import` statements into inline SVG strings

So this:

```js
import someSvg from "some-svg.svg";
```

Becomes this:

```js
var someSvg =
  '<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title>home</title><path d="M37.6 24.104l-4.145-4.186v-6.389h-3.93v2.416L26.05 12.43a1.456 1.456 0 0 0-2.07 0L12.43 24.104a1.488 1.488 0 0 0 0 2.092c.284.288.658.431 1.031.431h1.733V38h6.517v-8.475h6.608V38h6.517V26.627h1.77v-.006c.36-.01.72-.145.995-.425a1.488 1.488 0 0 0 0-2.092" fill="#191919" fill-rule="evenodd" id="someSvg-someID"/></svg>';
```

So you can do something like this maybe:

```js
import React from "react";
import someSvg from "some-svg.svg";

const NaughtyUsage = () => (
  <span
    dangerouslySetInnerHTML={{
      __html: someSvg,
    }}
  />
);
```

### 2. Optimises the SVG through SVGO

Does what it says on the tin. You can pass options to the SVGO processor with an `svgo` object in options.

You can also disable this option if you really want, with `disableSVGO: true`.

### 3. Namespaces `id`’s to prevent conflicts

If you inline a lot of SVGs you might get namespace conflicts, which could be really annoying if you're styling your SVG in CSS and whatnot. This plugin solves that with some some [regex trickery](.lib/optimize.js#L29). The namespace of the ID comes from the name of import/require variable.

So given this simple `cheese.svg` file:

```svg
<svg><circle cx="10" cy="10" r="50" id="CIRCLE"></circle></svg>
```

Which you then import like so:

```js
import wheelOfCheese from "cheese.svg";
```

You get the following output:

```js
var wheelOfCheese =
  '<svg><circle cx="10" cy="10" r="50" id="wheelOfCheese-CIRCLE"></circle></svg>';
```

To disable this feature, pass `disableNamespaceIds: true` in the options.

### 4. Exporting as dataURI format

If you need to use the output directly in an image source (<img src=> or in a css background-image, for example), you can pass `exportDataURI: true` in the options.
The output will be encoded as base64 and prefixed with `data:image/svg+xml;base64,`, so you can do something like:

```javascript
import logo from "./logo.svg";

const Logo = () => <img src={logo} />;
```

## Installation

```
npm install --save-dev babel-plugin-inline-svg
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["inline-svg"]
}
```

### Options

- _`ignorePattern`_ - A string regex that imports will be tested against so you can ignore them
- _`disableSVGO`_ - set to `false` to disable running the svg through SVGO
- _`disableNamespaceIds`_ - set to `false` to leave all id's as they are
- _`svgo`_ - an object of SVGO options
- _`exportDataURI`_ - set to `true` to export a base64-encoded SVG, prefixed with `data:image/svg+xml;base64,`

Example .babelrc:

```js

{
  "plugins": [
    [
      "inline-svg",
      {
        "ignorePattern": "icons",
        "disableNamespaceIds": true,
        "svgo": {
          "plugins": [
            {
              "removeDimensions": true,
            }
          ]

        }
      }
    ]
  ]
}

```

**Note:** To function correctly, this babel plugin disables the `cleanupIDs` SVGO plugin by default (to facilitate the ID namespacing). When passing your own SVGO options you might want to remove the `cleanupIDs` plugin so namespacing still works.

**Also note:** the ID namespaceing _can_ be done with a similar SVGO plugin, `prefixIds` — however this prefix is a static string so you might still end up with namespace conflicts.

### Via CLI

```sh
$ babel --plugins inline-svg script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["inline-svg"],
}); // => { code, map, ast };
```

[npm-url]: https://npmjs.org/package/babel-plugin-inline-svg
[downloads-image]: http://img.shields.io/npm/dm/babel-plugin-inline-svg.svg
[npm-image]: http://img.shields.io/npm/v/babel-plugin-inline-svg.svg
[david-dm-url]: https://david-dm.org/iest/babel-plugin-inline-svg
[david-dm-image]: https://david-dm.org/iest/babel-plugin-inline-svg.svg
