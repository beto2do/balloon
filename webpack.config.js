const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
      balloon: './src/balloon.js',
      index: './src/index.js'
    },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  }
};