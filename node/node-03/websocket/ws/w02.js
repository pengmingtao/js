var WebSocketServer = require('ws').Server;

//maxPayload 同时有多少人链接
var wss = new WebSocketServer({ port: 8181,maxPayload: 60000 }); 

wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (data) {
        console.log('receive:',data);
        // ws.send(msg); //向客户端发送数据
        // 如果需要把消息发送到所有用户，需要遍历
         /**
         * 把消息发送到所有的客户端
          * wss.clients获取所有链接的客户端
         */
          wss.clients.forEach(function each(client) {
             client.send(data);
          });

    });
    ws.on('close',function(){
        console.log('服务关闭');
    })
});