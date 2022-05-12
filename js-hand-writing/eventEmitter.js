class EventEmitter {
    constructor() {
        this.cache = {}
    }

    // 订阅事件
    on(name, fn) {
        if(this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }

    }

    // 注销订阅事件
    off(name, fn) {
       const tasks = this.cache[name]
       if (tasks) {
            let idx = tasks.findIndex(f => f === fn)
            idx > -1 && tasks.splice(idx, 1)
       }

    }

    // 发布消息，触发事件
    emit(name, once = false, ...args) {
        if(this.cache[name]) {
            // 创建副本，以防回调中注册相同事件，造成死循环
            const tasks = this.cache[name].slice()
            for(let f of tasks) {
                f(...args)
            }
        }
        if(once) {
            delete this.cache[name]
        }
    }
}

let eventBus = new EventEmitter()
let fn1 = function(name, age) {
	console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
	console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, '布兰', 12)
