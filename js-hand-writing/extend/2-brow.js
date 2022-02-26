function Animal(name) {
    this.name = name
    this.getName = function () {
        return this.name
    }
}

function Dog(name){
    Animal.call(this, name)
}

const dog1 = new Dog('wawa')

console.log(dog1.getName()) // wawa

/**
 * 借用构造函数继承
 * 优点：
 * 1. 解决了原型链继承的【引用类型共享】和【子类无法像父类传参】的问题
 * 缺点：
 * 1. 方法在构造函数中调用未复用
 */