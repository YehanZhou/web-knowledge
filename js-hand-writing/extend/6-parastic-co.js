function Animal(name) {
    this.name = name
}

Animal.prototype.getName = function () {
    return this.name
}

function Dog(name,colors){
    Animal.call(this, name) // 借用构造函数继承属性
    this.colors = colors
}

function object(o) {
    function F()
    F.prototype = o
    return new F()
}

function extend(child,parent){
    // child.prototype = Object.create(parent.prototype)
    child.prototype = object(parent.prototype) // 创建parent的原型对象的副本 赋值给 child的原型对象
    child.prototype.constructor = child 
}

extend(Dog,Animal) // 原型链混成继承方法，使之可复用

/**
 * 寄生组合式继承：
 * 通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
 * 
 * 优点
 * 1. 只调用了一次 父类 构造函数
 * 2. 原型链还能保持不变，能够正常使用 instanceof 和 isPrototypeOf()
 * 
 * 继承最优解
 */
