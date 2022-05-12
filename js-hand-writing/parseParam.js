function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]
    const paramsArr = paramsStr.split('&')
    let paramsObj = {}
    for(let param of paramsArr) {
        if(/=/.test(param)) {
            let [key, val] = param.split('=')
            val = decodeURIComponent(val)
            val = /^\d+$/.test(val) ? parseFloat(val) : val
            if(paramsObj.hasOwnProperty(key)) {
                paramsObj[key] = [].concat(paramsObj[key], val)
            } else {
                paramsObj[key] = val
            }
        } else {
            paramsObj[param] = true
        }
    }
    return paramsObj
}

console.log(parseParam('http://baidu.com?x=1&x=2&y=3&z=santa&test'))