const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
    const plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:
                    env.NODE_ENV === 'production'
                        ? '"production"'
                        : '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ];
    return {
        devtool: 'source-map',
        context: path.join(__dirname, './'),
        entry: './index.js',
        output: {
            filename: './easyrecorder.min.js',
            path: path.join(__dirname, './dist'),
            publicPath: '/',
            libraryTarget: 'umd',
            library: 'easyRecorder'
        },
        mode: env.NODE_ENV === 'production' ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: path.join(__dirname, './node_modules/'),
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }
            ]
        },
        plugins:
            env.NODE_ENV === 'production'
                ? plugins
                : [...plugins, new webpack.HotModuleReplacementPlugin()],
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        },
        devServer: {
            publicPath: '/',
            contentBase: false,
            hot: true,
            port: env.PORT || 2345,
            proxy: {
                '*': 'http://localhost:1234'
            }
        }
    };
};
