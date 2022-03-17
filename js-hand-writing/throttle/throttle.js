/**
 * 节流的原理很简单：
 * 如果你持续触发事件，每隔一段时间，只执行一次事件。
 */
// 使用时间戳
function throttle(cb, wait){
    let prev = 0
    return function(...args){
        // 由于时间戳是基于1970年01月01日00时00分00秒(UTC)起计算的，所以第一肯定会触发
        const now = +new Date()
        // 两次回调间隔大于wait ms时才触发
        if(now - prev > wait) {
            cb.call(this, args)
            prev = now
        }
    }
}

// 使用定时器
function throttle2(cb, wait){
    let timeId
    return function(...args){
        if(!timeId) {
            timeId = setTimeout(()=>{
                timeId = null
                cb.call(this, args)
            }, wait)
        }
    }
}
// underscore版
function _throttle(cb, wait, options){
    let timeId, result, context, args
    let prev = 0;
    if (!options) options = {};
    const later = function () {
        // 不需要头，prev重置为0，因为prev为0,wait<now-prev，会立即执行
        // 需要头的话，prev重置为当前时间
        prev = options.leading === false ? 0 : Date.now();
        timeId = null
        cb.apply(context,args)
        // 回调完后垃圾回收，避免闭包引起内存泄露
        if (!timeId) context = args = null;
    }
    const throttled = function(){
        let _now = Date.now();
        context = this;
        args = arguments
        // previous为0(头次触发)且不需要有头，提前把prev赋值为_now
        if (!prev && options.leading === false) prev = _now;
        // 剩余的等待时间
        let remaining = wait - (_now - prev);
        // 没有剩余等待时间了(等到了) 或者 已经等过头
        if (remaining <= 0 || remaining > wait) {
            // 清除当前计时器
            if (timeId) {
                clearTimeout(timeId);
                timeId = null;
            }
            // 重置时间戳
            prev = _now;
            // 并调用回调
            result = cb.apply(context, args);
            // 回调完后垃圾回收，避免闭包引起内存泄露
            if (!timeId) context = args = null;
        } // 如果计时器被清除，且需要尾
        else if (!timeId && options.trailing !== false) {
            timeId = setTimeout(later, remaining);
        }
        return result;
    }
    throttled.cancel = function() {
        clearTimeout(timeId);
        prev = 0;
        timeId = context = args = null;
    };
    return throttled;
}

let count = 1
const container = document.getElementById('container')

function getUserAction(e) {
    container.innerHTML = count++
    return count
}

const setAction = _throttle(getUserAction, 1000)
// 300ms之内不再触发，我才执行事件
container.onmousemove = setAction

document.getElementById('cancel').addEventListener('click', function() {
    setAction.cancel()
})