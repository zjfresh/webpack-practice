const sum = require('./sum');

module.exports = {
    getSum: function(...args) {
        return sum(...args)
    },
    getNum: function () {
        return import('./lib').num1
    }
}