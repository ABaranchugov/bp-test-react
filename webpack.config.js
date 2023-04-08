const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FomsLoggingPlugin = require('./plugins/fomsLoggingPlugin');

function srcPath(subdir) {
    return path.join(__dirname, 'src', subdir);
}

const dotenv = require('dotenv');
const env = dotenv.config({ path: './.env' }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

const isDev = process.env.NODE_ENV === 'development';
const standBackendUrls = {
    dev: 'http://ds-ingressgateway-unsec-gt-ffoms-dev-frontends.apps.ocp.dev.foms.tech/',
    dev2: 'http://ds-ingressgateway-unsec-gt-ffoms-dev-frontends-02.apps.ocp.dev.foms.tech/',
    test: 'http://ds-ingressgateway-unsec-gt-ffoms-test-frontends.apps.ocp.test.foms.tech/',
    test2: 'http://ds-ingressgateway-unsec-gt-ffoms-test-frontends-02.apps.ocp.test.foms.tech/',
};

module.exports = (env) => {
    const STAND = (env && env.STAND) || 'dev';
    const BACKEND_URL = standBackendUrls[STAND];

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
        entry: './src/app/index.tsx',
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
                api: srcPath('api'),
                common: srcPath('common'),
                router: srcPath('router'),
                features: srcPath('features'),
                mixins: srcPath('app/main.classes.scss'),
                images: path.join(__dirname, 'src/assets/images'),
            },
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: './src/**/*.{ts,tsx,js,jsx}',
                },
            }),
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                template: './src/static/index.html',
                favicon: './src/static/favicon.ico',
            }),
            new WebpackCopyPlugin({
                patterns: [
                    {
                        from: 'node_modules/ufs-ui/dist/ufs-ui.css',
                        to: 'css',
                    },
                    {
                        from: 'node_modules/antd/dist/antd.css',
                        to: 'css',
                    },
                    {
                        from: 'src/static/css',
                        to: 'css',
                    },
                    {
                        from: 'src/static/js',
                        to: 'js',
                    },
                ],
            }),
            new ESLintPlugin({
                extensions: ['ts', 'tsx'],
                cache: true,
            }),
            new FomsLoggingPlugin(isDev, STAND, BACKEND_URL, env.nolog),
        ],

        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|pdf)$/i,
                    type: 'asset/resource',
                },
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
                    test: /\.(scss|sass|css)$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                modules: {
                                    localIdentName: '[local]__[hash:base64:5]',
                                },
                                sourceMap: false,
                            },
                        },
                        {
                            loader: 'resolve-url-loader',
                        },
                        require.resolve('sass-loader'),
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true, //This is important!
                                },
                            },
                        },
                    ],
                },
            ],
        },

        externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },

        devServer: {
            //host: '0.0.0.0',
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8085,
            historyApiFallback: true,
            // https: true,
            // key: fs.readFileSync('./ssl/client.example.key'),
            // cert: fs.readFileSync('./ssl/client.example.crt'),
            // ca: fs.readFileSync('./ssl/rootCA.crt'),
            proxy: {
                '/foms-api': {
                    pathRewrite: (path) => {
                        const path1 = path.replace(/^\/foms-api/, '');
                        //console.log("Backend address: " + BACKEND_URL + "\nRequest path: " + path1 + "\n")
                        return path1;
                    },
                    target: BACKEND_URL,
                    // target: 'https://37.18.72.202/8080', //дев
                    // target: 'http://37.18.119.116:8080', //тест
                    changeOrigin: true,
                    //   secure: false,
                },
            },
        },
    };
};
