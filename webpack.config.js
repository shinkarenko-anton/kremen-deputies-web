// Require
const path = require('path');
const webpack = require('webpack');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Data
const package = require('./package.json');
const appPath = path.resolve(__dirname, 'src/app');
const distPath = path.resolve(__dirname, 'dist');
const assetsPath = path.resolve(__dirname, 'src/assets');

// Exports
module.exports = function webpackStuff(env) {
    return {
        entry: {
            'app': appPath + '/app.jsx'
        },
        output: {
            path: distPath,
            filename: '[name].js'
        },
        resolve: {
            alias: {
                components: appPath + '/components',
                pages: appPath + '/pages',
                views: appPath + '/views',
                store: appPath + '/store',
                navigation: appPath + '/navigation',
                services: appPath + '/services',
                styles: appPath + '/styles',
                utils: appPath + '/utils',
                assets: assetsPath
            },
            extensions: ['.js', '.jsx']
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
                ENV: JSON.stringify(env)
            })
        ],
        devServer: {
            historyApiFallback: true
        }
    }
}