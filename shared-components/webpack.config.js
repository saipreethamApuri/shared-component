const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
  },
  devServer: {
    port: 3005,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react']
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'sharedComponents',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.jsx',
        './Card': './src/components/Card.jsx',
        './Input': './src/components/Input.jsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        'styled-components': { singleton: true, requiredVersion: false },
      },
    }),
  ],
} 