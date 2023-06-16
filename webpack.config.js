/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');
const package = require('./package.json');

module.exports = {
    entry: './source/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, `release/pair ${package.version}`),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'source'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.html',
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // include specific files based on a RegExp
            include: /source/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asynchronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        }),
    ],
};
