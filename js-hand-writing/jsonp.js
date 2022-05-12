
function jsonp({url, params, cbName}){
    function genUrl() {
        let queryStr = ''
        for(let key in params) {
            if(params.hasOwnProperty(key)) {
                queryStr += `${key}=${paramsp[key]}&`
            }
        }
        // 添加参数后接callback
        queryStr += `callback=${cbName}`
        return `${url}?${queryStr}`
    }
    return new Promise((resolve,reject)=>{
        const scriptEl = document.createElement('script')
        scriptEl.src = genUrl()
        document.body.appendChild(scriptEl)
        window[cbName] = (res) => { // res即为后端的数据
            resolve(res)
            document.removeChild(scriptEl)
        }
    })
}

// 后端
let data = {a:1}
res.write(`${urlObj.query.cbName}({data: ${data}})`)