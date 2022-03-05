const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

function write404(res){
    res.writeHead(404,{
        'Content-Type': 'text/plain;charset=utf-8'
    })
    res.write('404 找不到页面')
}

function readFile(absolutePath,mimeType,res){
    try {
        const content = fs.readFileSync(absolutePath)
        res.writeHead(200,{
            'Content-Type': `${mimeType};charset=utf-8`
        })
        res.write(content)
    } catch (error) {
        write404(res)
    }
}

http.createServer((req, res)=>{
    const urlObj = url.parse(req.url)
    const urlPathname = urlObj.pathname
    let absolutePath = path.join(__dirname, './public', urlPathname)

    // 处理静态资源
    if(fs.existsSync(absolutePath)){
        const ext = path.parse(absolutePath).ext
        const mimeType = mime.getType(ext) || 'text/html'
        if(!ext){
            absolutePath = path.join(absolutePath, './index.html')
        }
        readFile(absolutePath, mimeType, res)
    } else {
        write404(res)
    }
    res.end()
    
}).listen(8080, ()=>{
    console.log('localhost:8080已启动')
})