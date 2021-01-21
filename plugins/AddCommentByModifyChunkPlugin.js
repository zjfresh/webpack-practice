const ConcatSource = require('webpack-sources').ConcatSource

module.exports = class {
    constructor(options) { this.options = options }
    apply(compiler) {
        compiler.hooks.compilation.tap('TestModuleFilename', compilation => {
            compilation.hooks.optimizeChunkAssets.tap('TestModuleFilename', chunks => {
                chunks.forEach((chunk) => {
                    chunk.files.forEach((fileName) => {
                        // 判断具体要修改的文件，假设简单通过 chunk 的文件名称判断入口
                        if (fileName.indexOf('entry1') > -1) {
                        // 在输出文件头尾各增加内容
                            compilation.assets[fileName] = new ConcatSource(
                                '/**\n * code before\n */\n',
                                compilation.assets[fileName],
                                '\n/**\n * code after\n */'
                            )
                        }
                    })
                })
            })
        })
    }
}