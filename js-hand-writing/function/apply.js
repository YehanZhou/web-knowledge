Function.prototype.call2 = function (context, arr){
    const context = context || window
    context.fn = this
    var result
    if(!arr) {
        result = context.fn()
    } else {
        var args = []
        for(var i=0, len = arr.length;i<len;i++){
            args.push('arguments['+i+']')
        }
        result = eval('context.fn('+args+')')
    }
    delete context.fn
    return result
}