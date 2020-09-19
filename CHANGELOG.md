# 1.2.0

- Change `namespaceIds` arg order to conformn with other transform functions
- Compose the transform functions to make it easier to add new ones
- New feature: `exportDataURI`, to make it easy to use the imported SVG as a data URI

# 1.1.1

- Don't deepmerge SVGO opts

# 1.1.0

- Add `disableSVGO` option
- Add `disableNamespaceIds` option
- Improved `optimize.js` in order not to depend on asynchronous `SVGO` code
- Improve tests
- Fix package `main` and `files` entries
- Add `eslint` with airbnb rules
- Add prettier & npm script
- Move source code to `lib` folder and tests and its fixtures to `test` folder
- Add `package-lock.json`, remove `yarn.lock`

## 1.0.1

- Initial code base.
