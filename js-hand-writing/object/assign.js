Object.assign1 = function(target, ...sources) {
    if(target == null) {
        throw new Error('不能将 null 或 undefined 转换成对象')
    }

    const ret = Object(target)
    sources.forEach(o => {
        for(let key in o) {
            if(o != null) {
                if(o.hasOwnProperty(key)) {
                    ret[key] = o[key]
                }
            }
        }
    })
    return ret
}