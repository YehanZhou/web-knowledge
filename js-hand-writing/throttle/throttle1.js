function throttle(fn, wait, options){
    let timeId
    return function(...args){
        const ctx = this
        if(!timeId){
            timeId = setTimeout(()=>{
               timeId = null
               fn.apply(ctx, args) 
            }, wait)
        }
    }
}

let count = 1
const container = document.getElementById('container')

function getUserAction(e) {
    container.innerHTML = count++
    return count
}

const setAction = throttle(getUserAction, 3000)
// 300ms之内不再触发，我才执行事件
container.onmousemove = setAction

document.getElementById('cancel').addEventListener('click', function() {
    setAction.cancel()
})