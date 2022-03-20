Array.prototype.map2 = function(callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)  // this 就是当前的数组
    // x >>> 0本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF）
    const len = O.length >>> 0
    const res = []
    let k = 0
    while (k < len) {
        if (k in O) {
            if(callback.call(thisArg, O[k], k, O)){
                res.push(O[k]);
            }
        }
        k++;
    }
    return res;
}