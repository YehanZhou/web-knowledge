// class A {
//     constructor() {
//         this.name = 'jarry'
//     }

//     getUser() {
//         return {
//             name: 'tom',
//             getUserName () {
//                 return this.name
//             }
//         }
//     }
// }

// const a = new A()
// console.log(a.getUser().getUserName())

const a = {a:1}
function F(){}
const f = new F()
console.log(f.__proto__)
console.log(F.prototype.constructor === F)
F.prototype = a
const f2 = new F()
console.log(f.__proto__)
console.log(f2.__proto__)

let str = "Hello";

// 和 for..of 做相同的事
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]()

while(true) {
    let it = iterator.next()
    if(it.done) break
    console.log(it.value)
}