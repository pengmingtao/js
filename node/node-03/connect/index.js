var connect = require('connect');
var bodyParser = require('body-parser');   //body解析
var cors = require('cors'); 
const url = require('url');
const qs = require('qs');
const path = require('path');
const formidable = require('formidable');
function logger(req, res, next) {
    console.log(req.method + ' ' + req.url);
    next(); //执行下一个中间件
}
//注意post请求的时候可以通过req.body获取参数，但是url不行得 通过url去解析
function getParams(req){
    //判断是什么请求
    var query={};
    if(req.method.toLocaleLowerCase()=='post') {
        query = req.body;
    } else {
        // localhost:9090/kkk?name=pp&age=pp
        const urlJson = url.parse(req.url);
        console.log('urlJson',urlJson);
        query = qs.parse(urlJson.query);
        console.log('query',query);
    }
    return query;
}

// 写成中间件形式
function getParamsMiddle(req, res,next) {
    if(req.method.toLocaleLowerCase()=='post') {
        query = req.body;
    } else {
        const urlJson = url.parse(req.url);
        query = qs.parse(urlJson.query);
    }
    req.query = query;
    console.log('参数');
    next();
}

var app = connect();
app.use(cors())
// .use(function (req, res, next) {
//         //跨域处理
//         // Website you wish to allow to connect
//         res.setHeader('Access-Control-Allow-Origin', '*');  //允许任何源
//         // Request methods you wish to allow
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  //允许任何方法
//         // Request headers you wish to allow
//         res.setHeader('Access-Control-Allow-Headers', '*');   //允许任何类型
//          //utf-8转码
//         next();  //next 方法就是一个递归调用
// })
    .use(logger)

    .use(function(req, res, next) {
        console.log('---------'); 
        console.log(req.body); // undefined
        next();
    })
    //解析 application/json,最后保存的数据都放在req.body对象上
    .use(bodyParser.json())   //JSON解析
    // 解析 application/x-www-form-urlencoded
    .use(bodyParser.urlencoded({extended: true})) 
    .use(function(req, res, next) {
        console.log('++++++++'); 
        console.log(req.body); // 有数据
        next();
    })
    .use(getParamsMiddle)
    .use('/info', function(req, res, next) {
                //response 响应   request请求
                // 中间件
                // var queryres =  getParams(req);
           
                //需要使用getParamsMiddle中间件
                res.end(JSON.stringify(req.query)); 
                var data={
                        "code": "200",
                        "msg": "success",
                        "result": [{
                            "id":1,
                            "name": "sonia",
                            "content": "广告投放1----"
                        },
                        {
                            "id":2,
                            "name": "ben",
                            "content": "广告投放2"
                        },
                        {
                            "id":3,
                            "name": "lili",
                            "content": "广告投放3"
                        }]
                    }
                    res.end(JSON.stringify(data));
                    next();  
        })
        .use('/upload/img',function(req, res, next){
            
                var form = new formidable.IncomingForm();
            //     form.encoding='utf-8'; //设置表单域的编码
                form.uploadDir = path.join(__dirname,'./static');
              //设置上传文件存放的文件夹，默认为系统的临时文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名
                 form.keepExtensions=true;
              //设置该属性为true可以使得上传的文件保持原来的文件的扩展名。
              
            //   form.parse(request, [callback])
            //   该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
        
                form.parse(req,function(err,fields,files){
                    console.log(files)
                    if (err){
                        return;
                    };
                    var size=parseInt(files.uploadImg.size);
                    if (size>1024*1024){
                        res.end("图片过大！")
                        // 删除文件操作。 用法：fs.unlink(path, [callback(err)])
                        fs.unlink(files.uploadImg.path);
                         return;
                    };
                    res.end(JSON.stringify({
                            data:1,
                            success:true,
                            msg:'success！'
                       }));
                    next();
                });
               
            })
    .listen(3000);