// Require
const path = require('path');
const webpack = require('webpack');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Data
const package = require('./package.json');
const distPath = path.resolve(__dirname, 'dist');
const appPath = path.resolve(__dirname, 'src/app');
// Configs
let config = {
    entry: {
        'app': appPath + '/app.js'
    },
    output: {
        path: distPath,
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.jsx?/, use: 'babel-loader', include: appPath },
            { test: /\.(png|woff|woff2|eot|ttf|svg|gif)/, use: 'url-loader?limit=100000' },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: package.title,
            company: package.company,
            description: package.description,
            url: package.url,
            filename: 'index.html',
            template: 'src/assets/templates/index.ejs',
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true
            }
        }),
        new CopyWebpackPlugin([
            {context: 'src', from: 'assets/img/fav/*'},
            {context: 'src', from: 'assets/img/banner/*'}
        ]),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(package.version),
            ENV: JSON.stringify(process.env.ENV)
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}
// Exports
module.exports = config;