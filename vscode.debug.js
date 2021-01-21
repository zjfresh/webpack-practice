const webpack = require('webpack')

const webpackConfig = require('./index');
console.log(1111)
webpack(webpackConfig, err => {
    if(err)throw err
})