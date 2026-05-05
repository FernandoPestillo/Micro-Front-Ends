const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sveltePreprocess = require('svelte-preprocess');
const { container } = require('webpack');
const { ModuleFederationPlugin } = container;
const dependencies = require('./package.json').dependencies;

module.exports = {
  entry: './src/main.ts',
  output: {
    publicPath: 'auto',
    clean: true,
    uniqueName: 'profileSvelte'
  },
  devServer: {
    port: 4202,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  resolve: {
    alias: {
      '@mfe/mfe-contracts': path.resolve(__dirname, '../../packages/mfe-contracts/src/index.ts')
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser', 'import', 'default']
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: true,
              customElement: true
            },
            emitCss: false,
            preprocess: sveltePreprocess()
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'profileSvelte',
      filename: 'remoteEntry.js',
      exposes: {
        './UserProfile': './src/UserProfile.svelte',
        './mountUserProfile': './src/mount-user-profile.ts',
        './defineUserProfileElement': './src/define-user-profile-element.ts'
      },
      shared: {
        '@mfe/mfe-contracts': {
          singleton: true,
          requiredVersion: '0.1.0'
        },
        svelte: {
          singleton: true,
          requiredVersion: dependencies.svelte
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
