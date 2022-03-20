Function.prototype.call2 = function (context){
    const context = context || window
    context.fn = this
    var args = []
    for(var i=0, len = arguments.length;i<len;i++){
        args.push('arguments['+i+']')
    }
    var result = eval('context.fn('+args+')')
    delete context.fn
    return result
}