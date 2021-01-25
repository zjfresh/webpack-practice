const webpack = require('webpack')

const webpackConfig = require('./index')
webpack(webpackConfig, err => {
    if (err) {
        console.log('🚀 ~ file: vscode.debug.js ~ line 6 ~ err', err)
        throw err
    }
})