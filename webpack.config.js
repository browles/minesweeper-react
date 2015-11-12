module.exports = {
  entry: './src/app.js',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}