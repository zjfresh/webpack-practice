const path = require('path');
const fs = require('fs');

const webpackChain = require('webpack-chain');
const webpack = require('webpack');

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
    // .set('chunkIds', 'named')
    .minimize(false)
    // .minimizer('js') // 上行取消压缩，这个注释插件反而可以直接加在plugins中，不会被minimize掉
    //     .use(webpack.BannerPlugin, [{
    //         banner: 'fullhash:[fullhash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
    //     }]).end()
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
            },
            // vendor: {
            //     name: 'vendor',
            //     // priority: -20,
            //     minSize: 1,
            //     minChunks: 1, // 限定被拆分的 Chunk 至少被多少个模块引用，不设置或设置为1将导致所有模块被抽离进来
            //     // reuseExistingChunk: true,
            //     chunks: 'async'
            // }
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

config.module
  .rule('jsLoader')
    .test(/\.js$/)
    .pre()
    .include
      .add(path.resolve('.'))
      .end()
    // Even create named uses (loaders)
    .use('custom-loader')
      .loader('./build/custom-loader')
    // .options({
    // });

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

// config
//     .plugin('logBanner')
//     .use(webpack.BannerPlugin, [
//         {
//             banner: 'fullhash:[fullhash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]',
//             // banner: (yourVariable) => {
//             //     let map = new Map()
//             //     return `${JSON.stringify(yourVariable, (key, value) => {
//             //         if(map.has(value)) return `${key}-repeat-value-${typeof value}`
//             //         if(key && typeof value === 'object')map.set(value, key)
//             //         return value
//             //     }, 4)}`;
//             // }
//         },
//     ])


const AddCommentByModifyChunkPlugin = require('./plugins/AddCommentByModifyChunkPlugin');
config
    .plugin('TestModuleFilename')
    .use(AddCommentByModifyChunkPlugin)


const AddCommentByNextWayPlugin = require('./plugins/AddCommentByNextWayPlugin')
config
    .plugin('AddModuleFilename')
    .use(AddCommentByNextWayPlugin)


const AddCommentByAddDepPlugin = require('./plugins/AddCommentByAddDepPlugin');
config
    .plugin('AddModuleFilename2')
    .use(AddCommentByAddDepPlugin)

let cc = config.toConfig();

module.exports = cc;
// console.log(webpackChain.toString(cc));
