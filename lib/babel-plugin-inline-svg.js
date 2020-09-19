const { extname, dirname } = require("path");
const { readFileSync } = require("fs");
const template = require("babel-template");
const resolveFrom = require("resolve-from");

const optimize = require("./optimize");
const namespaceIds = require("./namespace-ids");
const createDataURI = require("./createDataURI");

const buildOutput = template(`
  var SVG_NAME = SVG_CODE;
`);

const noop = (a) => a;
const compose = (...fns) => (arg) =>
  fns.reduceRight((acc, fn) => (fn ? fn(acc) : acc), arg);
const curry = (fn) => (opts) => (input) => fn(input, opts);

let ignoreRegex;
module.exports = ({ types }) => ({
  visitor: {
    ImportDeclaration(path, state) {
      const {
        ignorePattern,
        disableSVGO = false,
        disableNamespaceIds = false,
        exportDataURI = false,
      } = state.opts;

      if (ignorePattern) {
        // Only set the ignoreRegex once:
        ignoreRegex = ignoreRegex || new RegExp(ignorePattern);

        // Test if we should ignore this:
        if (ignoreRegex.test(path.node.source.value)) {
          return;
        }
      }

      // This plugin only applies for SVGs:
      if (extname(path.node.source.value) === ".svg") {
        // We only support the import default specifier, so let's use that identifier:
        const importIdentifier = path.node.specifiers[0].local;
        const varName = importIdentifier.name;
        const iconPath = state.file.opts.filename;
        const svgPath = resolveFrom(dirname(iconPath), path.node.source.value);
        const input = readFileSync(svgPath, "utf8");

        const output = compose(
          exportDataURI ? createDataURI : noop,
          disableNamespaceIds ? noop : curry(namespaceIds)(varName),
          disableSVGO ? noop : curry(optimize)(state.opts.svgo)
        )(input);

        const svgReplacement = buildOutput({
          SVG_NAME: importIdentifier,
          SVG_CODE: types.stringLiteral(output),
        });

        path.replaceWith(svgReplacement);
      }
    },
  },
});
