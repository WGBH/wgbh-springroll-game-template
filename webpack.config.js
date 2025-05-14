const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlConfig = require(path.join(__dirname, 'html.config'));
const CleanPlugin = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const deploy = path.join(__dirname, 'deploy');
const images = path.join(__dirname, 'deploy/images');

module.exports = env => {
    const plugins = [
        new CleanPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin(HtmlConfig),
        new CopyPlugin({
            "patterns": [
                { from: path.join(__dirname + '/src/assets/images'), to: images },
                { from: path.join(__dirname + '/static'), to: deploy },
            ]
        }),
        new ESLintPlugin()
    ];
    return {
        stats: 'minimal',
        mode: env.dev ? 'development' : 'production',
        devServer: {
            static: path.join(__dirname, '/static'),
            host: '0.0.0.0'
        },
        entry: [
            '@babel/polyfill',
            path.join(__dirname, '/src/index.ts')
        ],
        output: {
            path: deploy
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
    };
};
