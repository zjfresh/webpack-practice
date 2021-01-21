const sum = require('./sum')
const { subAsync } = require('./sub_async')
// const lib = require('./lib'); // 如果有这行引用，与入口2共同引用，则会被抽到 common
require('./normal3') // 当入口1这里也引用（入口2先单独引用），则在common split的规则下，被归到common Chunk中

window.objj = {
    getSum: function(...args) {
        return sum(...args)
    },
    getNum: function (cb) {
        Promise.all([
            // 若无上面的初始引用，而入口2是初始引用，这里是异步引用：则lib会形成一个chunk并被：1. 打包到入口2的bundle 2. 打包成一个异步bundle
            import('./lib'),
            // 异步module都会被当成一个chunk并被输出到一个对应的bundle中，并不会与上面的异步module归到同一个Chunk以及打包到同一个bundle中
            import('./lib2'),
        ]).then(([ m1, m2 ]) => {
            let args = [
                m1.num1,
                m1.num2,
                m2.num1,
                m2.num2,
            ]
            cb.apply(null, args)
        })
    },
    subAsync,
}