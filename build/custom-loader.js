module.exports = function(context){
    // console.log(context);
    return context.replace(/\/\/\s.*?\n/g,"");//一定要renturn出去
}