const http = require('http');
const fs = require('fs');
/**
 * {}
 */
http.createServer((req,res)=>{
    const {url,method,headers} =req;
    console.log(method)
    res.setHeader('Access-Control-Allow-Origin','http://192.168.0.88:8080') //允许跨域
    res.setHeader('Access-Control-Allow-Headers','token,Content-Type')  //允许携带token 
    if (method==='OPTIONS'){
        res.end()
    }
    if(url=='/'&& method=='GET'){
        fs.readFile('./package.json',(err,data)=>{
            if(err) {
                res.end('读取文件失败！')
                return;
            } else {
                res.statusCode=200;
                res.setHeader('Content-Type','text/html')
                res.end(data)
            }
        })
    } else if(url=='/users'&& method=='GET'){
        res.statusCode=200
        res.setHeader('Content-Type','text/html')
        res.end(JSON.stringify({name:'peach'}))
    }
}).listen(3001,()=>{
    console.log('监听3001端口成功')
});

