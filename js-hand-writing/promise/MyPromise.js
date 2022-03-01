const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise{
    constructor(executor) {
        executor(this.resolve, this.reject)
    }

    status = PENDING

    value = null // 成功后的值
    reason = null // 失败后的原因

    resolveCallbacks = []
    rejectCallbacks = []

    /**
     * 用箭头函数以便绑定正确的this
     */
    resolve = (value)=>{
        if(this.status === PENDING){
            this.status = FULFILLED
            this.value = value
            while(this.resolveCallbacks.length) {
                this.resolveCallbacks.shift()(value)
            }
        }
    }

    reject = (reason)=>{
        if(this.status === PENDING){
            this.status = REJECTED
            this.reason = reason
            while(this.rejectCallbacks.length) {
                this.rejectCallbacks.shift()(reason)
            }
        }
    }

    then(onFullfilled, onRejected){
        onFulfiled = typeof onFulfiled == 'function' ? onFulfiled : v => v
        onRejected = typeof onRejected == 'function' ? onRejected : err => { throw err }
        const fulfilledMicrotask = () => {
            queueMicrotask(()=>{
                try {
                    const x = onFullfilled(this.value)
                    resolvePromise(promise2,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        const rejectedMicrotask = () => {
            queueMicrotask(()=>{
                try {
                    const x = onRejected(this.reason)
                    resolvePromise(promise2,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        const promise2 = new MyPromise((resolve, reject)=>{
            if(this.status===FULFILLED){
                fulfilledMicrotask()
            } else if(this.status===REJECTED){
                rejectedMicrotask()
            } else if(this.status===PENDING){
                this.resolveCallbacks.push(fulfilledMicrotask)
                this.rejectCallbacks.push(rejectedMicrotask)
            }
        })
        return promise2
    }

    static resolve(parma){
        if(parma instanceof MyPromise){
            return parma
        }
        return new MyPromise(resolve => {
            resolve(parma)
        })
    }

    static reject(reason){
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }

    static all(promises){
        let datas
        let count = 0
        return new MyPromise((resolve,reject)=>{
            promises.forEach((p,idx) => {
                MyPromise.resolve(p).then(val=>{
                    datas[idx]=val
                    if(++count === promises.length){
                        resolve(datas)
                    }
                }, err => {
                    reject(err)
                })
            })
        })
    }

    static race(promises){
        return new MyPromise((resolve,reject)=>{
            promises.forEach(p => {
                MyPromise.resolve(p).then(val=>{
                    resolve(val)
                }, err => {
                    reject(err)
                })
            })
        })
    }

    static allSettled(promises){
        let result = []
        return new MyPromise((resolve,reject)=>{
            promises.forEach(p => {
                MyPromise.resolve(p).then(val=>{
                    result.push({
                        status: 'fulfilled',
                        value: val
                    })
                    if(result.length === promises.length){
                        resolve(result)
                    }
                }, err => {
                    result.push({
                        status: 'rejected',
                        value: val
                    })
                    if(result.length === promises.length){
                        resolve(result)
                    }
                })
            })
        })
    }

    static any(promises){
        let count = 0
        return new MyPromise((resolve,reject)=>{
            promises.forEach(p => {
                MyPromise.resolve(p).then(val=>{
                    resolve(val)
                }, err => {
                    if(++count === promises.length){
                        reject(new AggregateError('All promises were rejected'))
                    }
                })
            })
        })
    }
}

function resolvePromise(promise, x, resolve, reject) {
    if(x=== promise) {
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    } 
    // if(x instanceof MyPromise) {
    //     x.then(resolve,reject) // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // } else {
    //     resolve(x)
    // }
    if(typeof x === 'object' || typeof x === 'function') {
        if(x===null) {
            return resolve(x)
        }

        let then
        try {
            then = x.then
        } catch (error) {
            reject(error)
        }

        if(typeof then === 'function') {
            let called = false
            try {
                then.call(x, 
                    y=>{
                        if(called) return;
                        called = true;
                        resolvePromise(promise, y, resolve, reject)
                    },
                    r=>{
                        if(called) return;
                        called = true;
                        reject(r)
                    })
            } catch (error) {
                if (called) return;
                reject(error);
            }
        } else {
            resolve(x)
        }
    } else {
        resolve(x)
    }
}

MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
      result.resolve = resolve
      result.reject = reject
    });
  
    return result
}

// export default MyPromise

module.exports = MyPromise
