function Animal(name) {
    this.name = name
}

Animal.prototype.getName = function () {
    return this.name;
}

function Dog(name,colors){
    Animal.call(this, name);
    this.colors = colors;
}

Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

const d1 = new Dog('奶昔', [])
d1.colors.push('brown')
console.log(d1) // { name: "奶昔", colors: ["brown"] }

const d2 = new Dog('哈赤', ['black'])
console.log(d2)  // { name: "哈赤", colors: ["black"] }

/**
 * 组合式继承（组合原型链和借用构造函数）
 * 
 * 结合了1和2的优点：
 * 1. 用原型链解决了方法复用的问题
 * 2. 用借用构造函数解决了引用类型共享的问题
 * 3. instanceof和isPrototypeOf()也能够用于识别基于组合继承创建的对象
 * 
 * 缺点：
 * 构造函数边调用了两次
 */