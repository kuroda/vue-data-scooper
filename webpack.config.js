module.exports = {
  entry: './src/vue-data-scooper.js',
  output: { filename: 'dist/vue-data-scooper.js' },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
