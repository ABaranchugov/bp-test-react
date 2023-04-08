const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./src/config/config.json');

const dotenv = require('dotenv');
const env = dotenv.config({path: './.env'}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

envKeys['process.env.config'] = JSON.stringify(config);

const isDev = process.env.NODE_ENV === 'development';

module.exports = (env) => {
  return {
    cache: {
      type: 'filesystem',
      allowCollectingMemory: true,
      buildDependencies: {
        config: [__filename],
      },
    },
    mode: process.env.NODE_ENV,
    devtool: 'source-map',
    entry: './src/index.tsx',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isDev ? '/' : './',
      pathinfo: false,
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        name: 'vendor',
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      alias: {
        '~': path.join(__dirname, './'),
        '@src': path.join(__dirname, 'src'),
        '@styles': path.join(__dirname, 'src/styles'),
        '@icons': path.join(__dirname, 'src/assets/icons'),
        'core': path.join(__dirname, 'src/app/core'),
        'features': path.join(__dirname, 'src/app/features'),
      },
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
      })
    ],
    module: {
      rules: [
        {
          test: /icons.*\.svg$/i,
          loader: 'svg-inline-loader'
        },
        // {
        //     test: /\.(png|jpe?g|svg|gif|pdf)$/i,
        //     type: 'asset/resource',
        // },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
          loader: 'ts-loader',
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            {loader: 'style-loader'},
            {
              loader: 'css-loader', options: {
                modules: {
                  localIdentName: '[local]',
                  exportLocalsConvention: 'dashes'
                },
              }
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true, //This is important!
                }
              },
            },
            {loader: 'less-loader'}
          ],
        },
      ],
    },

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8085,
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/checkUser': {
          pathRewrite: () => '/checkUser',
          target: 'http://localhost:3001',
          changeOrigin: true,
        }
      },
    },
    watch: true
  };
};
