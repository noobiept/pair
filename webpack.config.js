import HtmlWebpackPlugin from 'html-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import path from 'path';
import packageInfo from './package.json' with { type: 'json' };

const __dirname = import.meta.dirname;

export default {
    entry: './source/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, `release/pair ${packageInfo.version}`),
        clean: true,
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
        new CopyPlugin({
            patterns: [{ from: 'source/images', to: 'images' }],
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
