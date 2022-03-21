function instanceof1(left,right) {
    // 获取实例对象的原型
    // let proto = left.__proto__ // 写法一
    let proto = Object.getPrototypeOf(left) // 写法二
    while(true) {
        if(proto === null) return false
        if(proto === right.prototype) return true
        prop = prop.__proto__
    }
}
