function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]
    const paramsArr = paramsStr.split('&')
    const paramsObj = {}
    paramsArr.forEach(param => {
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
            return paramsObj[param]=true
        }
    })
    return paramsObj
}

console.log(parseParam('baidu.com?x=1&x=2&y=3'))