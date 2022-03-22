const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const { rootPath } = process.env
const Dotenv = require('dotenv-webpack');
const isDev = process.env.NODE_ENV === 'development';
const ProgressPlugin = require('progress-webpack-plugin')

const PATHS = require('../../configs/paths.js');


const config = {
  entry: {
    main: [
      PATHS.FILES.APP_ENTRY_POINT,
      PATHS.DIR.PUBLIC + '/css/agent-admin-index.scss',
      PATHS.FILES.BOOTSTRAP_JS
    ],
    // bootstrap: PATHS.FILES.BOOTSTRAP_CSS
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', 'scss'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          filename: '[name].js'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // include: PATHS.DIR.SRC,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      // {
      //   test: /\.(sass|scss|css)$/,
      //   include: PATHS.DIR.PUBLIC,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     'postcss-loader',
      //     'sass-loader'
      //   ],
      // },
  
      // {
      //   test: /\.(js|jsx|ts|tsx)?$/,
      //   loader: 'esbuild-loader',
      //   options: {
      //     loader: 'tsx',
      //     target: 'es2015'
      //   },
      //   exclude: /node_modules/
      // },
    //   {
    //     test: /\.(js|jsx)$/,
    //     include: PATHS.DIR.SRC,
    //     exclude: /(node_modules|bower_components)/,
    //     loader: 'esbuild-loader',
    //     options: {
    //       loader: 'jsx',  // Remove this if you're not using JSX
    //       target: 'es2015'  // Syntax to compile to (see options below for possible values)
    //     }
    // },

      {
        test: /\.(jpg|jpeg|gif)$/i,
        include: PATHS.DIR.PUBLIC,
        exclude: /(node_modules|bower_components)/,
        type: 'asset/resource',
      },

      {
        test: /\.(svg|png)$/i,
        include: PATHS.DIR.PUBLIC,
        exclude: /(node_modules|bower_components)/,
        type: 'asset/inline',
      },


      // { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' }

    //   {
    //     test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
    //     use: ['file-loader']
    //  }, {
    //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    //     use: ['url-loader?limit=100000']
    //  }
      {

        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: PATHS.DIR.PUBLIC + "/fonts",
        exclude: /(node_modules|bower_components)/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: rootPath + (isDev ? '/.env.local' : '/.env.staging'), // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: false, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: !isDev, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new RemoveEmptyScriptsPlugin(),
    new HTMLWebpackPlugin({
      template: PATHS.FILES.BASE_HTML,
      favicon: PATHS.FILES.FAVICON
    }),
    new ProgressPlugin(true)
    
    // new webpack.DefinePlugin({
    //   "process.env": JSON.stringify(process.env),
    // }),

  ],
}

module.exports = { config }







// module: {
//   rules: [
//     {
//       test: /\.(js|jsx)$/,
//       include: Path.resolve(rootPath, './src'),
//       exclude: /(node_modules|bower_components)/,
//       use: {
//         loader: "babel-loader"
//       }
//     },
//     {
//       test: /\.(css|scss)$/,
//       use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],

//     },
//     {
//       test: /\.css$/,
//       use: [
//         {
//           loader: 'style-loader',
//         },
//         {
//           loader: MiniCssExtractPlugin.loader,
//           options: {
//             publicPath: '',
//           },
//         },

//         {
//           loader: require.resolve('css-loader'),
//           options: {
//             importLoaders: 1,
//             modules: true,
//             modules: {
//               localIdentName: '[name]__[local]__[hash:base64:5]',
//             },
//           },
//         },

//         {
//           loader: 'css-loader',
//           options: {
//             modules: true,
//             localsConvention: 'camelCase',
//             sourceMap: true
//           }
//         }
//       ]
//     },
//     {
//       test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
//       exclude: /node_modules/,
//       use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
//     },
//     {
//       test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//       use: [
//         {
//           loader: "url-loader",
//           options: {
//             limit: 10000
//           },
//         },
//       ],
//     },
//     {
//       test: /\.(png|svg|jpg|jpeg|gif|ico|ttf|otf)$/,
//       exclude: /node_modules/,
//       type: "asset/resource", // ?name=[name].[ext] is only necessary to preserve the original file name
//     },


//   ],
// }

  // optimization: {
  //     splitChunks: {
  //       cacheGroups: {
  //         styles: {
  //           name: "main",
  //           type: "css/mini-extract",
  //           chunks: "all",
  //           enforce: true,
  //         },
  //       },
  //     },
  //   },
