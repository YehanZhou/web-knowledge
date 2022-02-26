function Animal(){
    this.colors = ['black']
}

Animal.prototype.getColors = function() {
    return this.colors;
}

function Dog() {}

Dog.prototype = new Animal()

const dog1 = new Dog()
dog1.colors.push('brown')

const dog2 = new Dog()
console.log(dog2.colors) // ['black', 'brown']

/**
 * #原型链继承
 * 
 * 关键点
 * 1. 子类的原型为父类的实例
 * 
 * 缺点
 * 1. 说有实例共享原型的引用类型属性
 * 2. 子类实例化是不能给父类构造函数传参
 */

