module.exports = {
  entry: './src/vue-data-scooper.js',
  output: {
    path: __dirname + '/dist',
    filename: 'vue-data-scooper.js',
    library: 'vue-data-scooper',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
