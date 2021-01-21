module.exports = function(context){
    // console.log(context);
    // 注释的第一个/会被未知原因干掉，加多一个/ 或者前面加\n —— 假如前面是注释 /* */ 的最后一个/冲突
    return `\n/* comment by loader */\n` + context/* .replace(/\/\/\s.*?\n/g,"") */;//一定要return出去
}