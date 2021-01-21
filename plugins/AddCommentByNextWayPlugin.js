module.exports = class {
    constructor(options) { this.options = options }
    apply(compiler) {
        compiler.hooks.compilation.tap("AddModuleFilename", compilation => {
            compilation.hooks.buildModule.tap("AddModuleFilename", module => {
                if (module.userRequest?.includes('entry1')) {
                    console.log('🚀 ~ file: index.js ~ line 198 ~ apply ~ module', module.userRequest)
                    module.parser.hooks.program.tap('AddModuleFilename', ast => {
                    })
                }
            })
            compilation.hooks.optimizeModules.tap("AddModuleFilename", modules => {
                // if (module.resource?.includes('entry1')) {
                    // console.log(Object.assign({}, modules[1], {
                    //     dependencies: ''
                    // }))
                modules.forEach(v => {
                    if (v.userRequest?.includes('entry1')) {
                        // v._source._value = `/* fffff */\n` + v._source._value
                        // console.log(v._source.source);
                    }
                    });
                // }
            })
        })
    }
}