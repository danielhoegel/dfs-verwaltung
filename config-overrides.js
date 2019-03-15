const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
    // react hot loader
    config = rewireReactHotLoader(config, env);

    // replace react-dom with @hot-loader/react-dom (https://github.com/gaearon/react-hot-loader#react--dom)
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.resolve.alias,
            'react-dom': '@hot-loader/react-dom'
        }
    };
    return config;
}
