const express = require('express')

const app = express()

/**
 * use只能有一个res.send()
 * express中回调函数称之为中间件
 * 可定义多个中间件，称之为中间件栈
 * 可将多个中间件定义到一个数组里，传入use第二个参数
 */
// 写法一
// app.use('/', (req, res, next)=>{
//     console.log(0)
//     next()
// },(req, res, next)=>{
//     console.log(1)
//     next()
// },(req, res, next)=>{
//     console.log(2)
//     next()
// })
// 写法2
const middlewares = [(req, res, next)=>{
    console.log(0)
    next()
},(req, res, next)=>{
    console.log(1)
    next()
},(req, res, next)=>{
    console.log(2)
    next()
}]

app.use('/', middlewares)

app.use('/', (req, res, next)=>{
    console.log(3)
    res.send('home')  // home 
})

app.use('/api', (req, res, next)=>{
    res.send('api') // home,放在'/'上面可正确输出api
    // '/'匹配了'/api'，所以执行了最上面那个匹配
    // 换了顺序后，'/api'和'/'的上面没有相冲突的匹配正确send，
})

app.listen(8080, ()=>{
    console.log('listen localhost:8080')
})