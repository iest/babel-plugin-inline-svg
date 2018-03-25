const Svgo = require('svgo');
const deasync = require('synchronized-promise');

const makeRegex = str => new RegExp(` +id=\"(${str})\"`, 'gi');

const idRegex = makeRegex('.+');
const getIds = str => (str.match(idRegex) || []).map(s => s.replace(idRegex, '$1'));

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
      const r = makeRegex(id);
      const replacement = ` id="${name}-${id}"`;
      output = output.replace(r, replacement);
    });

    const withIds = output.replace();

    return output;
  } catch (e) {
    throw e;
  }
};
