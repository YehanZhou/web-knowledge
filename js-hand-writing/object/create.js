Object.create1 = function(proto, propertyObj) {
    if(typeof proto !== 'object' || typeof proto !== 'function') {
        throw new Error('对象原型 必须是 一个对象')
    }
    if(propertyObj == null) {
        throw new Error('不能将 null 或者 undefined 转换成对象')
    }

    function F()
    F.prototype = proto
    const obj = new F()

    if(propertyObj != undefined) {
        Object.defineProperty(obj, propertyObj)
    }

    if(proto === null) {
        obj.__proto__ = null
    }

    return obj
}