const path = require('path');
const fs = require('fs');

const webpackChain = require('webpack-chain');

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = new webpackChain();


// (function deleteall(path) {
//     var files = [];
//     if(fs.existsSync(path)) {
//         files = fs.readdirSync(path);
//         files.forEach(function(file, index) {
//             var curPath = path + "/" + file;
//             if(fs.statSync(curPath).isDirectory()) { // recurse
//                 deleteall(curPath);
//             } else { // delete file
//                 fs.unlinkSync(curPath);
//             }
//         });
//         fs.rmdirSync(path);
//     }
// }('dist'))


// config.mode('development')
config.mode('production')

    .entry('entry1').add('./entry1.js')
    .end()

    .entry('entry2')
    .add('./entry2.js')
    .end()
    
    .optimization
    .minimize(false)
    .splitChunks({
        // chunks: 'initial',
        // // minSize: 30000,
        // minSize: 1,
        // maxSize: 0,
        // minChunks: 1,
        // maxAsyncRequests: 5,
        // maxInitialRequests: 3,
        // automaticNameDelimiter: '~',
        // automaticNameMaxLength: 30,
        // name: true,
        // cacheGroups: {
        //   default: {
        //     minChunks: 2,
        //     priority: -20,
        //     reuseExistingChunk: true
        //   }
        // }
        cacheGroups: {
            default: {
                name: 'common',
                // priority: -20,
                minSize: 1,
                minChunks: 2, // 限定被拆分的 Chunk 至少被多少个模块引用，不设置或设置为1将导致所有模块被抽离进来
                // reuseExistingChunk: true,
                chunks: 'initial'
            }
        }
      })
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
                // semi: 'error',
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
            minify: false,
        },
    ])
    .tap((args) => {
        return args;
    });

let cc = config.toConfig();

module.exports = cc;
console.log(webpackChain.toString(cc));
