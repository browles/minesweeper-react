var webpack = require('webpack');

var plugins = [];
if (process.env['NODE_ENV'] === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
else if (process.env['NODE_ENV'] === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }));
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['react', 'es2015']
        }
      },
      {
        test: /.scss$/,
        loader: 'style!css!sass',
        exclude: /node_modules/
      },
      {
        test: /.png$/,
        loader: 'url',
        exclude: /node_modules/,
        query: {
          limit: 1000
        }
      }
    ]
  },
  devServer: {
    historyApiCallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './public'
  },
  plugins: plugins
}
