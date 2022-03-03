// 浅拷贝
function shallowCopy(obj){
    if(typeof obj !== 'object') return
    let newObj = obj instanceof Array ? [] : {}
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop]
        }
    }
    return newObj
}

// 简单版深拷贝，不考虑内置函数和对象
function deepCloneSimple(obj){
    if(typeof obj !== 'object') return
    let newObj = obj instanceof Array ? [] : {}
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            newObj[prop] = typeof obj[prop] === 'object' ? deepClone(obj[prop]) : obj[prop]
        }
    }
    return newObj
}

/**
 * 复杂版深拷贝，考虑内置函数和对象（比如 Date、RegExp 等对象）
 * 解决了循环引用的问题
 **/
const isObjet = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null
function deepClone(obj, map = new WeakMap()){
    if(map.get(obj)) return obj

    const constructor = obj.constructor
    if(/^(RegExp|Date)$/i.test(constructor.name)) {
        return new constructor(obj)
    }

    if(isObjet(obj)) {
        map.set(obj,true)
        let newObj = obj instanceof Array ? [] : {}
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                newObj[prop] = deepClone(obj[prop], map)
            }
        }
        return newObj
    } else {
        return obj
    }
}