const http = require('http')
// const querystring = require('querystring')

const postData = JSON.stringify({
  time: 1571217561
})

const options = {
    protocol: 'http:',
    hostname: 'localhost',
    method: 'POST',
    port: 3000,
    path: '/data',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

const server = http.createServer((req,res)=>{
    const request = http.request(options, (result) => {
    })
    request.write(postData)
    request.end()
    res.end()
})

server.listen(8080, () => {
    console.log('localhost:8080')
})