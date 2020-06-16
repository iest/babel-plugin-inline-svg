const { extname, dirname } = require('path');
const { readFileSync } = require('fs');
const template = require('babel-template');
const resolveFrom = require('resolve-from');
const optimize = require('./optimize');

const buildOutput = template(`
  var SVG_NAME = SVG_CODE;
`);

let ignoreRegex;

module.exports = ({ types }) => ({
  visitor: {
    ImportDeclaration(path, state) {
      const { ignorePattern } = state.opts;

      if (ignorePattern) {
        // Only set the ignoreRegex once:
        ignoreRegex = ignoreRegex || new RegExp(ignorePattern);

        // Test if we should ignore this:
        if (ignoreRegex.test(path.node.source.value)) {
          return;
        }
      }

      // This plugin only applies for SVGs:
      if (extname(path.node.source.value) === '.svg') {
        // We only support the import default specifier, so let's use that identifier:
        const importIdentifier = path.node.specifiers[0].local;
        const iconPath = state.file.opts.filename;
        const svgPath = resolveFrom(dirname(iconPath), path.node.source.value);
        const rawSource = readFileSync(svgPath, 'utf8');

        const optimizedSource = optimize(rawSource, state.opts.svgo);

        const svgReplacement = buildOutput({
          SVG_NAME: importIdentifier,
          SVG_CODE: types.stringLiteral(optimizedSource)
        });

        path.replaceWith(svgReplacement);
      }
    }
  }
});
