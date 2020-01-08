var net = require("net");
// tcp服务端
server1 = net.createServer(function(client){
     // 给客户端返回数据
    client.write('Hello World!\r\n');
});
server1.listen(9001);

// telnet localhost 9001