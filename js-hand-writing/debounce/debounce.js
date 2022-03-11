var count = 1
var container = document.getElementById('container')

function getUserAction(e) {
    container.innerHTML = count++
    return count
}

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
    let timerId
    return function(...args) {
        let result
        const context = this
        if(timerId) clearTimeout(timerId)

        if(immediate) {
            let callNow = !timerId // 第一次进来callNow=true，能立即触发一次
            // wait后，清空timerId。在waiter内进来timerId不为null，callNow为false，所以不会触发
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
}

// 增加cancel功能
function debounce4(fn,wait,immediate){
    let timerId
    const debounced = function(...args) {
        let result
        const context = this
        if(timerId) clearTimeout(timerId)

        if(immediate) {
            let callNow = !timerId // 第一次进来callNow=true，能立即触发一次
            // wait后，清空timerId。在waiter内进来timerId不为null，callNow为false，所以不会触发
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
        console.log(1)
        clearTimeout(timerId)
        timerId = null
    }

    return debounced
}

const setAction = debounce4(getUserAction, 300, true)
// 300ms之内不再触发，我才执行事件
container.onmousemove = setAction

document.getElementById('cancel').addEventListener('click', function() {
    setAction.cancel()
})
