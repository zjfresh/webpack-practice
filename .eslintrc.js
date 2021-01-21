module.exports = {
    root: true,

    env: {
        node: true,
        browser: true,
        es6: true,
    },

    parserOptions: {
        parser: 'babel-eslint',
    },

    globals: {
        MTJs: false,
    },

    extends: [ 'eslint:recommended' ],

    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],

        // 属性逗号
        'comma-dangle': [ 'error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never',
        } ],

        // 要求或禁止使用分号而不是 ASI，http://eslint.cn/docs/rules/semi
        'semi': [ 'error', 'never', { 'beforeStatementContinuationChars': 'always' } ],

        // 禁用行尾空白
        'no-trailing-spaces': 'error',

        // 强制使用单引号
        'quotes': [ 'error', 'single' ],
        // 强制使用一致的换行风格
        'linebreak-style': [ 'error', 'unix' ],
        // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        'array-bracket-spacing': [ 'error', 'always' ],

        // 控制逗号前后的空格
        'comma-spacing': [ 'error', {'before': false, 'after': true} ],
    },
}
