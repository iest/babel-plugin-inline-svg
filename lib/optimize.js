const Svgo = require('svgo');

module.exports = function(content, opts) {
  const DEFAULTS = {
    plugins: [{ cleanupIDs: false }]
  };

  let returnValue;

  const svgo = new Svgo(opts || DEFAULTS);

  svgo._optimizeOnce(content, {}, ({ data, error }) => {
    returnValue = error || data;
  });

  return returnValue;
};
