Array.prototype.map2 = function(callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const res = []
    const O = Object(this)  // this 就是当前的数组
    // x >>> 0本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF）
    const len = O.length >>> 0
    let k = 0
    /**
     * forEach删除自身元素，index不会被重置
     * forEach我们无法控制index的值
     * 循环起点只能为0
     * 它只会无脑的自增直至大于数组length才跳出循环
     */
    while (k < len) {
        if (k in O) {
            res[k] = callback.call(thisArg, O[k], k, O);
        }
        k++;
    }
    return res;
}
/**
 * 新能
 * for > forEach > map
 */