const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const package = require('./package.json');
// Load configs from .env file
require('dotenv').config();
// Paths
const appPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const getMapsApiKey = (devEnv) => {
  const { env } = process;
  const key = `MAPS_TOKEN_${devEnv.toUpperCase()}`;
  const token = env[key];
  if (token) { return token; }
  throw new Error(`${key} not defined in the .env file`);
}

module.exports = (env) => ({
  entry: {
    'app': `${appPath}/app.tsx`
  },
  output: {
    path: distPath,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      assets: `${appPath}/assets`,
      components: `${appPath}/components`,
      core: `${appPath}/core`,
      navigation: `${appPath}/navigation`,
      screens: `${appPath}/screens`,
      scenes: `${appPath}/scenes`,
      styles: `${appPath}/styles`,
      utils: `${appPath}/utils`,
    },
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      // Use url-loader for the files under 10k, for other cases - file-loader
      { test: /\.(woff|woff2|eot|ttf|svg|png|jpg)/, use: [
        { loader: 'url-loader', options: { limit: 100000, name: 'assets/[name].[ext]' } }
      ] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: package.title,
      company: package.company,
      description: package.description,
      url: package.url,
      filename: 'index.html',
      template: 'src/templates/index.ejs',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
      }
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/img/*.{png,jpg}', to: 'assets', flatten: true },
    ]),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(package.version),
      ENV: JSON.stringify(env.ENV),
      MAPS_API_KEY: JSON.stringify(getMapsApiKey(env.ENV)),
    })
  ],
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
});
