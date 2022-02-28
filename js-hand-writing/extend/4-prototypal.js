function object(o) {
    function F()
    F.prototype = o
    return new F()
}

function extend(child, parent){
    child.prototype = object(parent.prototype)
    child.prototype.constructor = child
}

/**
 * 基于已有的对象创建新对象
 * 
 * ECMAScript 5 通过新增 Object.create()方法规范化了原型式继承。
 * 
 * 在没有必要兴师动众地创建构造函数，而只想让一个对象与另一个对象保持类似的情况下，原型式 继承是完全可以胜任的。
 */

function extend2(child,parent){
    child.prototype = Object.create(parent.prototype)
    child.prototype.constructor = child 
}