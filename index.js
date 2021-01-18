const webpackChain = require('webpack-chain');
const path = require('path');

let config = new webpackChain();

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.mode('development');
config.entry('entry1').add('./entry1.js');
config
    .entry('entry2')
    .add('./entry2.js')
    .end()
    .output /* .path(path.resolve('dist')) */
    .filename('[name].bundle.js');

// Create named rules which can be modified later
// config.module
//   .rule('lint')
//     .test(/\.js$/)
//     .pre()
//     .include
//       .add(path.resolve('.'))
//       .end()
//     // Even create named uses (loaders)
//     .use('eslint')
//       .loader('eslint-loader')
//     .options({
//         "ecmaVersion": 2020,
//         rules: {
//           semi: 'off'
//         }
//       });

config.plugin('lint').use(ESLintPlugin, [
    {
        overrideConfig: {
            parserOptions: { ecmaVersion: 2020 },
            rules: {
                semi: 'error',
            },
        },
        // fix: true
    },
]);

config
    .plugin('htmlTemplate')
    .use(HtmlWebpackPlugin, [
        {
            template: './index.html',
        },
    ])
    .tap((args) => {
        return args;
    });

let cc = config.toConfig();

module.exports = cc;
console.log(webpackChain.toString(cc));
