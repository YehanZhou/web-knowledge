
function jsonp({url, params, cbName}){
    function genUrl() {
        let queryStr = ''
        for(let key in params) {
            if(params.hasOwnProperty(key)) {
                queryStr += `${key}=${paramsp[key]}&`
            }
        }
        queryStr += `callback=${cbName}`
        return `${url}?${queryStr}`
    }
    return new Promise((resolve,reject)=>{
        const scriptEl = document.createElement('script')
        scriptEl.src = genUrl()
        document.body.appendChild(scriptEl)
        window[cbName] = (res) => {
            resolve(res)
            document.removeChild(scriptEl)
        }
    })
}

// 后端
let data = {a:1}
res.write(`${urlObj.query.cbName}({data: ${data}})`)