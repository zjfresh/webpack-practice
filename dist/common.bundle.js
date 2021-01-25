(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* filename: /Users/meitu/Documents/code/test-case/webpack-chain/src/loaders/custom-loader.js!/Users/meitu/Documents/code/test-case/webpack-chain/src/base-config/files-lib/sum.js */

/* comment by loader */
module.exports = function(...args) {
    return args.reduce((prev, next) => {
        return prev + next
    })
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* filename: /Users/meitu/Documents/code/test-case/webpack-chain/src/loaders/custom-loader.js!/Users/meitu/Documents/code/test-case/webpack-chain/src/base-config/files-lib/normal3.js */

/* comment by loader */
// export default 'normal2'
module.exports = 'n3'

/***/ })
]]);