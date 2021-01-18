module.exports = function(...args) {
    return args.reduce((prev, next) => {
        return prev + next
    })
}