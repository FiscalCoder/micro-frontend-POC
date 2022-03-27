const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const styleLoaderConfig = require('../build-helpers/style-loader-config.js');

const { merge } = require("webpack-merge");
const glob = require('glob')

const { config: common } = require('./webpack.common.js');
const { DIR: DIRECTORY } = require('../configs/paths')
// const os = require('os');

const CONSTANTS = {
  DIST_PATH: DIRECTORY.DIST,
  SRC_PATH: DIRECTORY.SRC,
  PUBLIC_PATH: DIRECTORY.PUBLIC,
  JS_FILE_NAME: '[name].[contenthash:8].js',
  CSS_FILE_NAME: '[name].[contenthash:8].css'
}

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: CONSTANTS.DIST_PATH,
    filename: CONSTANTS.JS_FILE_NAME,
    // chunkFilename: CONSTANTS.JS_FILE_NAME,
    clean: true,
    // publicPath: '/',
  },

  // optimization: {
  //   chunkIds: 'named',
  //   // runtimeChunk: {
  //   //   name: "runtime",
  //   // },
  //   splitChunks: {
  //     cacheGroups: {
  //       defaultVendors: {
  //         filename: CONSTANTS.JS_FILE_NAME
  //       },
  //       // styles: {
  //       //   name: "main",
  //       //   type: "css/mini-extract",
  //       //   chunks: "all",
  //       //   enforce: true,
  //       // },

  //     },

  //   },
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       extractComments: false,
  //       // parallel: os.cpus().length,
  //       terserOptions: {
  //         format: {
  //           comments: false,
  //         },
  //         // compress: { dead_code: true },
  //         // mangle: true,
  //       },
  //     }),
  //   ],

  // },
  //   module: {

  //   rules: [
  //     {
  //       test: /\.(sass|scss|css)$/,
  //       // include: CONSTANTS.PUBLIC_PATH,
  //       exclude: /(node_modules|bower_components)/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         "css-loader",
  //         'postcss-loader',
  //         'sass-loader'
  //       ],
  //     },
  //   ]
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: CONSTANTS.CSS_FILE_NAME
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${CONSTANTS.SRC_PATH}/**/*`, { nodir: true }),
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /.js$|.css$/,
      // compressionOptions: { level: 2 },
      threshold: 20480, //20KB
      minRatio: 0.8,
    }),
  ],
  stats: {
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
    builtAt: true,
    hash: true
  },
  devServer: {
    host: "localhost",
    // static: Path.resolve(rootPath, 'dist'),
    port: 3000,
    historyApiFallback: true,
    // watchFiles: true,
    // inline: false
    // open: true,
  },
  // performance: {
  //   hints: false,
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000,
  // },
});
