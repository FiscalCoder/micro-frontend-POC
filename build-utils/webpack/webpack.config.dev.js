const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const { config: common } = require('./webpack.common.js');
const styleLoaderConfig = require('../build-helpers/style-loader-config');
const CopyPlugin = require("copy-webpack-plugin");
const { rootPath } = process.env
const path = require('path');
module.exports = merge(common, {
    mode: 'development',
    // target: 'web',
    devtool: 'eval-cheap-source-map',
    output: {
        filename: '[name].js',
    },
    // module: {

    //     rules: [
    //         {
    //             test: /\.(sass|scss|css)$/,
    //             use: [
    //                 // MiniCssExtractPlugin.loader,
    //                 styleLoaderConfig,                    
    //                 {
    //                     loader: 'css-loader',
    //                     options: { sourceMap: true, importLoaders: 1, modules: false },
    //                 },
    //                 { loader: 'postcss-loader', options: { sourceMap: true } },
    //                 { loader: 'sass-loader', options: { sourceMap: true } },
    //             ],
    //         },
    //     ]
    // },
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(rootPath, "src/config.json"), },
            ],
            // options: {
            //     concurrency: 100,
            // },
        }),
    ],
    devServer: {
        host: 'localhost',
        // contentBase: Path.resolve(__dirname, 'public'),
        port: 3001,
        historyApiFallback: true,
        // hot: true,
        // watchFiles: true,
        // liveReload: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        client: {
            progress: true,
        },
        devMiddleware: {
            writeToDisk: true
        }
        // writeToDisk: true

        // inline: false
        // open: true
    },

})