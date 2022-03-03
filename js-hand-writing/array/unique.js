function unique(arr) {
    return arr.filter((val,idx,array) => {
        return array.indexOf(val) === idx;
    })
}

console.log(unique([1,2,3,3,4,5,5]))

function uniqueEs6(arr){
    return [...new Set(arr)]
}

console.log(uniqueEs6([1,2,3,3,4,5,5]))
