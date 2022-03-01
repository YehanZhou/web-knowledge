const http = require('http')

const server = http.createServer((request, response)=> {
    response.writeHead(200,{
        'content-type': 'text/plain'
    })
    response.write('<div>home1</div>')
    response.end()
})

server.listen(8080,()=>{
    console.log('localhost:8080')
})

// node --inspect --inspect-brk http.js