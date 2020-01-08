let net=require("net") //tcp 服务
server1=net.createServer((client)=>{
    //给客户端返回数据
    client.write('hello world')
})
server1.listen(9001)

//命令 telnet localhost 9001 
