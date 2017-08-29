const Svgo = require('svgo');

module.exports = function optimise(name, content, opts = {}) {
  const DEFAULTS = {
    plugins: [
      {
        cleanupIDs: {
          prefix: `${name}-`,
        },
      },
    ],
  };

  const svgo = new Svgo(Object.assign(DEFAULTS, opts));

  // Svgo isn't _really_ async, so let's do it this way:
  let returnValue;
  svgo.optimize(content, response => {
    if (response.error) {
      throw response.error;
    } else {
      returnValue = response.data;
    }
  });

  return returnValue;
};
