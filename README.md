# babel-plugin-inline-svg

Import raw SVG files into your code, optimising with [SVGO](https://github.com/svg/svgo/), and removing ID namespace conflicts.

## What it do

So this:

```js
import someSvg from 'some-svg.svg';
```

Becomes this:

```js
var someSvg = '<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title>home</title><path d="M37.6 24.104l-4.145-4.186v-6.389h-3.93v2.416L26.05 12.43a1.456 1.456 0 0 0-2.07 0L12.43 24.104a1.488 1.488 0 0 0 0 2.092c.284.288.658.431 1.031.431h1.733V38h6.517v-8.475h6.608V38h6.517V26.627h1.77v-.006c.36-.01.72-.145.995-.425a1.488 1.488 0 0 0 0-2.092" fill="#191919" fill-rule="evenodd"/></svg>';
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

Works anywhere you use babel, not just for react.

**The `cleanupIDs` SVGO plugin is enabled by default**, using the import declaration's name as the [`prefix` option](https://github.com/svg/svgo/blob/master/plugins%2FcleanupIDs.js#L12). This means you won't get `id` namespace conflicts across your various svg imports (which can be an issue).

If you'd rather not do this, simply pass in your own `cleanupIDs` option when passing in SVGO options to the plugin in your babel options (example below).

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
    "inline-react-svg"
  ]
}
```

#### Options

- *`ignorePattern`* - A pattern that imports will be tested against to selectively ignore imports.
- *`svgo`* - svgo options (`false` to disable). Example:
```js
{
  "plugins": [
    [
      "inline-svg",
      {
        "ignorePattern": /ignoreAThing/,
        "svgo": {
          "plugins": [
            {
              "removeDoctype": true,
            },
            // Pass your own "cleanupIDs" option to override the default behaviour if you like:
            "cleanupIDs": false
          ]

        }
      }
    ]
  ]
}

```

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

---

Big thanks to [inline-react-svg](https://github.com/kesne/babel-plugin-inline-react-svg), which this project is based on.
