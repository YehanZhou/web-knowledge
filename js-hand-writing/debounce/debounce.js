/**
 * 要等你触发完事件 n 秒内不再触发事件，我才执行。
 * 就像：你叫我10s后去扫地，好，我开始等这10s过去。
 * 但是这10s内你脑抽又通知我10s后去扫地，我就重新开始等新的10s再去。
 * 如果你一直在小于10s以间隔叫我扫地，我就会一直重置我的倒计时钟，一直不去。
 */

function debounce1(fn,wait){
    let timerId
    return function() {
        clearTimeout(timerId)
        timerId = setTimeout(fn, wait)
    }
}

// 解决this指向，和event undefined的问题
function debounce2(fn,wait){
    let timerId
    return function(...args) {
        const context = this
        clearTimeout(timerId)
        timerId = setTimeout(()=>{
            fn.apply(context,args)
        }, wait)
    }
}

// 增加immediate参数,记录return值
function debounce3(fn,wait,immediate){
    let timerId,result
    return function(...args) {
        const context = this
        if(timerId) clearTimeout(timerId)
        if(immediate) {
            // 第一次进来callNow=true，能立即触发一次
            let callNow = !timerId 
            // 在waiter时间内进来timerId不为null，即callNow为false，所以不会触发
            // wait时间后，清空timerId。
            timerId = setTimeout(()=>{
                timerId = null
            }, wait)
            if(callNow) result = fn.apply(context, args)
        } else {
            timerId = setTimeout(()=>{
                // 这里是异步的，如果复制给result，return出去的永远是undefined
                fn.apply(context, args)
            }, wait)
        }
        return result
    }
}

// 增加cancel功能
function debounce4(fn,wait,immediate){
    let timerId,result
    const debounced = function(...args) {
        const context = this
        if(timerId) clearTimeout(timerId)
        if(immediate) {
            // 第一次进来callNow=true，能立即触发一次
            let callNow = !timerId
            // 在waiter时间内进来timerId不为null，即callNow为false，所以不会触发
            // wait时间后，清空timerId。
            timerId = setTimeout(()=>{
                timerId = null
            }, wait)
            if(callNow) result = fn.apply(context, args)
        } else {
            timerId = setTimeout(()=>{
                fn.apply(context, args) // 这里是异步的，如果复制给result，return出去的永远是undefined
            }, wait)
        }
        return result
    }

    debounced.cancel = function() {
        clearTimeout(timerId)
        timerId = null
    }

    return debounced
}

let count = 1
const container = document.getElementById('container')

function getUserAction(e) {
    container.innerHTML = count++
    return count
}

const setAction = debounce4(getUserAction, 10000, true)
// 300ms之内不再触发，我才执行事件
container.onmousemove = setAction

document.getElementById('cancel').addEventListener('click', function() {
    setAction.cancel()
})
