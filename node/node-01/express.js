// const express = require('express'); //需要安装 npm install express -D
const express = require('./myExpress.js')
let app=express();
app.get('/',(request,response)=>{
    response.end('Hello world')
})
app.get('/users',(request,response)=>{
    response.end(JSON.stringify({name:'peach'}))
})
app.handle(3002,()=>{
    console.log('监听3002端口成功')
})