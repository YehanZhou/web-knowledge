function debounce(fn, wait, immediate = false) {
    let timeId
    const debounceInnner = function(...args) {
        const that = this
        let res
        if(timeId) clearTimeout(timeId)
        if(immediate) {
            // 存储此时timeId值，第一次进来一定是undefined，callNow等于true，fn立即执行
            // wait后再进来，timeId为null，fn又立即执行
            let callNow = !timeId
            // console.log('1=>',callNow, timeId)
            timeId = setTimeout(()=> {
                timeId = null
            }, wait)
            // console.log('2=>',callNow, timeId)
            if(callNow) res = fn.apply(that, args)
        } else {
            timeId = setTimeout(() => {
                // fn是wait后异步执行的，所以此时返回值为undefined
                fn.apply(that, args)
            }, wait)
        }
        return res
    }
    debounceInnner.cancel = function() {
        clearTimeout(timeId)
        timeId = null
    }
    return debounceInnner
}

/*----test----*/
var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    // console.log(this, e)
    container.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction,1000, true);
/*----test----*/