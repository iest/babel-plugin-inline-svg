const Svgo = require("svgo");

function optimize(content, opts) {
  const DEFAULTS = {
    plugins: [{ cleanupIDs: false }],
  };

  let returnValue;

  const svgo = new Svgo(opts || DEFAULTS);

  // eslint-disable-next-line no-underscore-dangle
  svgo._optimizeOnce(content, {}, ({ data, error }) => {
    if (error) throw error;

    returnValue = data;
  });
  return returnValue;
}

module.exports = optimize;
