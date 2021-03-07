const copy = require('rollup-plugin-copy');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      copy({
        targets: [{ src: 'bin/Release/net5.0/*', dest: 'dist/parser' }],
        copyOnce: true,
      })
    );

    return config;
  },
};
