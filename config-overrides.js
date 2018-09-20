const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireSass = require('react-app-rewire-scss');

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env);
  config = rewireSass(config, env);
  return config;
}
