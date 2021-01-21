module.exports = {
    subAsync(cb) {
        import('./sub_num.js').then(v => cb('arg1', v.num))
        // 异步module都会被当成一个chunk并被输出到一个对应的bundle中，并不会与上面的异步module归到同一个Chunk以及打包到同一个bundle中
        import('./sub_num2.js').then(v => cb('arg1', v.num))
    },
}