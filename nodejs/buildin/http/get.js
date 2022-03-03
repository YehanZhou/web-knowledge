const http = require('http')
const queryString = require('querystring')

const server = http.createServer((request, response)=> {
    let data = ''
    request.on('data', (chunk) => {
        data += chunk
    })
    request.on('end',()=>{
        response.writeHead(200, {
            'content-type': 'application/json;charset=utf-8'
        })
        response.write(JSON.stringify(queryString.parse(data)))
        response.end()
    })
    
})

server.listen(8080,()=>{
    console.log('localhost:8080')
})

// node --inspect --inspect-brk http.js