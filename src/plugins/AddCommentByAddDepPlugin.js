const Dependency = require('webpack/lib/Dependency')

class MyDependency extends Dependency {
    // Use the constructor to save any information you need for later
    constructor() {
        super()
    }
}

MyDependency.Template = class MyDependencyTemplate {
    apply(dep, source) {
        console.log('🚀 ~ file: AddCommentByAddDepPlugin.js ~ line 43 ~ MyDependencyTemplate ~ apply ~ source', source._source._name)
        // dep is the MyDependency instance, so the module is dep.module
        // console.log(dep.module.userRequest);
        source.insert(0, `/* filename: ${source._source._name} */\n`, 'async_md2')
    }
}

module.exports = class {
    apply(compiler) {
        compiler.hooks.compilation.tap('MyPluginName', compilation => {
            compilation.dependencyTemplates.set(
                MyDependency,
                new MyDependency.Template()
            )
            compilation.hooks.buildModule.tap('MyPluginName', module => {

                if(/\.js$/.test(module.userRequest))module.addDependency(new MyDependency(module))
            })
        })
    }
}