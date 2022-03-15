const express = require('express')
const app = express()
const router = require('./router')
const path = require('path')

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// 静态资源服务中间件（内置中间件）
// __dirname当前文件所在的目录
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router)

app.listen(8080, ()=>{
    console.log('listen localhost:8080')
})