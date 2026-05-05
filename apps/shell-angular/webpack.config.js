const path = require('path');
const { share } = require('@angular-architects/module-federation/webpack');
const { container } = require('@angular-devkit/build-angular/node_modules/webpack');
const { ModuleFederationPlugin } = container;

module.exports = {
  target: ['web', 'es2022'],
  output: {
    uniqueName: 'shellAngular',
    publicPath: 'auto',
    scriptType: 'text/javascript',
    environment: {
      asyncFunction: true
    }
  },
  optimization: {
    runtimeChunk: false
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@mfe/mfe-contracts': path.resolve(__dirname, '../../packages/mfe-contracts/src/index.ts')
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shellAngular',
      shared: share({
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        '@angular/router': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        '@angular/platform-browser': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        rxjs: {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        '@mfe/mfe-contracts': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '0.1.0'
        },
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.5'
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.5'
        }
      })
    })
  ]
};
