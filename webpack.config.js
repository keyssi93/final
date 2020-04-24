var path = require('path');
module.exports = {
}
module.exports = {
    entry: './components/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    }
  }
  module.exports = {
    entry: './components/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
  module.exports = {
    entry: './components/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        }
      ]
    }
  }
