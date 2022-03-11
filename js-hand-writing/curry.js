function curry(fn) {
    const judge = (...args) {
        if(args.length === fn.length) return fn(...args)
        return (...args2) => judge(...args, ...args2)
    }
    return judge
}

function add(a,b,c){
    return a+b+c
}

const addCurry =curry(add)

console.log(addCurry(1)(2)(3) === curry(1,2,3)) // true