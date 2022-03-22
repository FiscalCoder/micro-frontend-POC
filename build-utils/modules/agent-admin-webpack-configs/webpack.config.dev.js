const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const { config: common } = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    // target: 'web',
    devtool: 'eval-cheap-source-map',
    output: {
        filename: '[name].js',
    },
    module: {

    rules: [
        {
            test: /\.(sass|scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { sourceMap: true, importLoaders: 1, modules: false },
              },
              { loader: 'postcss-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          },
    ]
},
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
    //   insert: function (linkTag) {
    //       const parent = document.querySelector('#agent-feedback').shadowRoot
    //       parent.appendChild(linkTag)
    //     },
    }),
    ],
    devServer: {
        host: 'localhost',
        // contentBase: Path.resolve(__dirname, 'public'),
        port: 3000,
        historyApiFallback: true,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'},

        // inline: false
        // open: true
    },

})