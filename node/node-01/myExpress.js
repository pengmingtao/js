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
        const server=http.createServer((request,response)=>{
            const {pathname}=url.parse(request.url,true)
            let result=routers.find((v)=>{
                return v.path == pathname && request.method.toLowerCase()==v.method
            })
            result && result.callback(request,response)
        })
        server.listen(...arguments)
    }
}
module.exports=function(){
    return new Application()
}