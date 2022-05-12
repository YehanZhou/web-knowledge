function curry(fn) {
    const judge = (...args) => {
        if (args.length === fn.length) return fn(...args)
        return (...args2) => judge(...args, ...args2)
    }
    return judge
}

// function curry(fn){
// 	return function curried(...args) {
// 		if(args.length >= fn.length) {
// 			return fn.apply(this, args)
// 		} else {
// 			return function(...args2) {
// 				return curried.apply(this, args.concat(args2))
// 			}
// 		}
// 	}
// }

function add(a,b,c){
    return a+b+c
}

const addCurry =curry(add)

console.log(addCurry(1)(2)(3)) // 6
console.log(addCurry(1,2,3)) // 6
console.log(addCurry(1)(2)(3) === addCurry(1,2,3)) // true
