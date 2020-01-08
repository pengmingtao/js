/*
  要使用ws协议，那么就要装一个ws的包
 */
// wws
 let WebSocket = require("ws").Server;
 let wss = new WebSocket({port:8181});

 //eventEmitter
 wss.on("connection",function(ws){
  //先连接
  ws.on("message",function(data){
   //用message来监听客户端发来的消息
   console.log(data);
   ws.send("你好111,"+data+"！"); //给客户端发送消息
  })

  ws.on("close",function(message){
    console.log('关闭连接')
   })

 })
