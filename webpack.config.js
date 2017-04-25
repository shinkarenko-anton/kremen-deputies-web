let path = require('path');
let webpack = require('webpack');
let pack = require('./package.json');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let distPath = path.resolve(__dirname, 'dist');
let appPath = path.resolve(__dirname, 'src/app');
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
            { test: /\.(png|woff|woff2|eot|ttf|svg)/, use: 'url-loader?limit=100000' },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/index.html'}
        ]),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(pack.version),
            ENV: JSON.stringify(process.env.ENV)
        })
    ]
}
module.exports = config;