const http = require('http');
const url = require('url')

const routers=[];
class Application{
    get(path,callback){
        routers.push({
            path,
            method:'get',
            callback
        })
    }
    handle(){
        const server=http.createServer((req,res)=>{
            const {pathname}=url.parse(req.url,true)
            console.log(routers)
            let find=routers.filter((v)=>{
                return v.path == pathname && req.method.toLowerCase()==v.method
            })
            console.log(find)
            find && find.callback(req,res)
        })
        server.listen(...arguments)
    }
}
module.exports=function(){
    return new Application()
}