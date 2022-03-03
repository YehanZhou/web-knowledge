function flat(arr){
    let res = []
    arr.forEach(el => {
        if(Array.isArray(el)) {
            res = res.concat(flat(el)) 
        }else{
            res.push(el)
        }
    })
    return res
}

console.log(flat([1,2,[3,[4,5]]]))


function flatEs6(arr){
    while(arr.some(el => Array.isArray(el))) {
        arr = [].concat(...arr)
    }
    return arr
}
console.log(flatEs6([1,2,[3,[4,5]]]))
