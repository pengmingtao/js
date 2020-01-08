const http = require('http');
const fs = require('fs');
//request
//response
// eventEmitter

// 响应简单请求
// get/post/head，没有自定义请求头，
// Content-Type是
// application/x-www-form-urlencoded，
// multipart/form-data或text/plain之一，

// 跨域：通过添加以下响应头解决： 
// res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.102:8080')

http.createServer(function(request,response){
    const {url,method,headers} = request;
    console.log(method)
    response.setHeader('Access-Control-Allow-Headers', 'XX-Token,Content-Type');
    response.setHeader('Access-Control-Allow-Origin', ' http://192.168.0.102:8080'); 
    response.setHeader('Access-Control-Allow-Credentials', 'true'); 
   
    // setPageHeader(response); //或者放一个函数里

    if(method == "OPTIONS"){
        //允许跨域
        response.end();
    }
    if(url=='/' && method=='GET'){
        fs.readFile('index.html', (err, data) => {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/pain;charset=utf-8' });
               
                response.end('服务器错误');
                return;
            }
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        })
    } else if (url == '/users' && method === 'GET') {
        response.setHeader('Set-Cookie', 'cookie1=va222;')
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html')
        response.end(JSON.stringify({ name: 'laney' }))
    }

    else if (url == '/list' && method === 'GET') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html')
        response.end(JSON.stringify({ name: 'sss' }))
    }
}).listen(3000,function(){
    console.log('监听到3000');
});

function setPageHeader(res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.102:8080');  //允许任何源
    // res.setHeader('Access-Control-Allow-Origin', '*');  
    //允许任何源 ,如果服务器要求浏览器发送 Cookie，这是不能设置为*
 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  
    // res.setHeader('Access-Control-Allow-Methods', '*'); 

    res.setHeader('Access-Control-Allow-Headers', 'X-Token,Content-Type')
    // res.setHeader('Access-Control-Allow-Headers', '*');   //允许任何类型

    // 服务器可能需要拿到 Cookie，这时需要服务器显式指定Access-Control-Allow-Credentials字段，
    // 告诉浏览器可以发送 Cookie

    // 同时，开发者必须在 AJAX 请求中打开withCredentials属性。

    // res.setHeader('Access-Control-Allow-Credentials', 'true');  
    //允许携带cookie,true 允许携带cookie  false 不携带

    // 需要注意的是，如果服务器要求浏览器发送 Cookie，Access-Control-Allow-Origin就不能设为星号，
    // 必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，
    // 只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，
    // 且（跨域）原网页代码中的document.cookie也无法读取服务器域名下的 Cookie。


}


