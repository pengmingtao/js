var mysql = require('mysql'); 
const express = require('express');
var bodyParser = require('body-parser');   //body解析
var cors = require('cors'); 


const app = express();
app.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))

// .use(function (req, res, next) {
//     //跨域处理
//     res.setHeader('Access-Control-Allow-Origin', '*');  //允许任何源
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  
//     res.setHeader('Access-Control-Allow-Headers', '*');   //允许任何类型
//     // res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});  
//     next();  //next 方法就是一个递归调用
// });

// app.use(cors());
 

//jsonp
app.get('/jsonp/callback=:cbk',function(req,res){
    console.log('ooopp heelo');
    var bk = req.params.cbk;
    console.log(bk);
    var vt = {name:'Tim',age:28,id:bk};
   
    res.send(bk+'('+JSON.stringify(vt)+')');
})
 
app.get('/api/info',(req,res) => {
    var data={
                "code": "200",
                "msg": "success",
                "result": [{
                    "id":1,
                    "name": "laney",
                    "content": "test01"
                },
                {
                    "id":2,
                    "name": "ben",
                    "content": "test02"
                },
                {
                    "id":3,
                    "name": "lili",
                    "content": "test03"
                }]
            }
    res.json({
        err_code:0,
        data:data.result
    })
})
app.post('/api/msg',(req,res) => {
    var data={
                "code": "200",
                "msg": "success",
                 "result": {
                    "focus":true,
                    "data":[{
                                    "id":1,
                                    "name": "laney01",
                                    "content": "test01"
                                },
                                {
                                    "id":2,
                                    "name": "ben",
                                    "content": "test02"
                                },
                                {
                                    "id":3,
                                    "name": "lili",
                                    "content": "test03"
                            }]
                }
             }
    res.json({
        err_code:0,
        result:data.result
    })
})

app.post('/api/hello',(req,res) => {
    var data={
                "code": "200",
                "msg": "success",
                "result": [{
                    "id":10,
                    "name": "laney",
                    "content": "hello world"
                }]
         };
     res.json({
        err_code:0,
        result:data.result
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
