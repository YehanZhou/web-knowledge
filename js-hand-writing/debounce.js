// 触发高频事件n秒后只会执行一次，如果n秒内再次触发，则重新计时

const debounce = function(func,wait) {
    let timeId
    return function(){
        clearTimeout(timeId)
        timeId = setTimeout(()=>{
            func.apply(this, arguments)
        }, wait)
    }
}