class EventEmitter {
    constructor(){
        this.cache = []
    }

    on(name, fn) {
        if(this.cache[name]) {
            this.cache[name].push(fn)
        }else{
            this.cache[name] = [fn]
        }
    }

    off(name, fn) {
        let tasks = this.cache[name]
        if (tasks) {
            const idx = tasks.findIndex(f => f === fn || f.callback === fn)
            idx > -1 && tasks.splice(idx,1)
        }
    }

    emit(name, ...args) {
        let tasks = this.cache[name]
        if(tasks){
            tasks.forEach(fn => {
                fn(...args)
            })
        }
    }

    once(name, ...args) {
        let tasks = this.cache[name]
        if(tasks){
            tasks.forEach(fn => {
                fn(...args)
            })
        }
        delete this.cache[name]
    }
}

// 测试
let eventBus = new EventEmitter()
let fn1 = function(name, age) {
	console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
	console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', '布兰', 12)
// '布兰 12'
// 'hello, 布兰 12'
