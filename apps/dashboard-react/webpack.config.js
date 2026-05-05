const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');
const { ModuleFederationPlugin } = container;
const dependencies = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: 'auto',
    clean: true,
    uniqueName: 'dashboardReact'
  },
  devServer: {
    port: 4201,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboardReact',
      filename: 'remoteEntry.js',
      exposes: {
        './Dashboard': './src/Dashboard'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
