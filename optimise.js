const Svgo = require('svgo');
const deasync = require('synchronized-promise');

const makeDefinitionRegex = str => new RegExp(` +id=\"(${str})\"`, 'gi');
const makeXLinkRegex = str => new RegExp(` +xlink:href=\"#(${str})\"`, 'gi');
const makeMaskRegex = str => new RegExp(` +mask=\"url\\(#${str}\\)\"`, 'gi');

const idDefRegex = makeDefinitionRegex('.*?');
const getIds = str => (str.match(idDefRegex) || []).map(s => s.replace(idDefRegex, '$1'));

module.exports = function optimise(name, content, opts) {
  const ids = getIds(content);

  const DEFAULTS = {
    plugins: [
      {
        cleanupIDs: false,
      },
    ],
  };

  const svgo = new Svgo(opts || DEFAULTS);
  const optimize = content =>
    new Promise((res, rej) => {
      svgo.optimize(content).then(res, rej);
    });
  const optimizeSync = deasync(optimize);

  try {
    let { data: output } = optimizeSync(content);

    ids.forEach(id => {
      const defRegex = makeDefinitionRegex(id);
      const xLinkRegex = makeXLinkRegex(id);
      const maskRegex = makeMaskRegex(id);
      const newId = `${name}-${id}`;
      const defReplacement = ` id="${newId}"`;
      const xLinkReplacement = ` xlink:href="#${newId}"`;
      const maskReplacement = ` mask="url(#${newId})"`;
      output = output
        .replace(defRegex, defReplacement)
        .replace(xLinkRegex, xLinkReplacement)
        .replace(maskRegex, maskReplacement);
    });

    const withIds = output.replace();

    return output;
  } catch (e) {
    throw e;
  }
};
