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
        filename: 'app/[name].js'
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
            title: 'Карта виборчих округів м. Кременчук',
            prefix: 'IQ Hub',
            descr: 'Карта виборчих округів дозволяє вам дізнатись хто є депутатом вашого району та як з ним зв\'язатись',
            url: 'https://deputat.kr.io.ua/',
            filename: 'index.html',
            template: 'src/assets/templates/index.ejs',
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new CopyWebpackPlugin([
            {context: 'src', from: 'assets/img/fav/*'},
            {context: 'src', from: 'assets/img/baner/*'}
        ]),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(package.version),
            ENV: JSON.stringify(process.env.ENV)
        })
    ]
}
// Exports
module.exports = config;