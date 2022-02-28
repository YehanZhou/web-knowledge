function createAnother(o){
    const clone = Object.create(o);
    clone.hi = function(){
        alert('hi')
    }
    return clone;
}

/**
 * 无法复用函数
 */