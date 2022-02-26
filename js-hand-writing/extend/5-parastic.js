// 寄生式
/**
 * 第一种方法：
 * 借助原型式方法
 */
function object(o) {
    function F()
    F.prototype = o
    return new F()
}

function extend1(child, parent){
    child.prototype = object(parent.prototype)
    child.prototype.constructor = child
}

/**
 * 第二种方法：
 * Object.create
 */
function extend2(child,parent){
    child.prototype = Object.create(parent.prototype)
    child.prototype.constructor = child 
}

/**
 * 示例
 * 寄生式组合式
 */
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

extend1(Dog,Animal)
