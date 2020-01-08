var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });

wss.on('connection', function (ws) {
    console.log('client connected');
   var timer =null;

   function repeatFun(str){
        clearInterval(timer);
        timer = setInterval(()=>{
            var ran = Math.random();
            ws.send(10 * ran+str); //向客户端发送数据
        },2000);
   }
// repeatFun();

    ws.on('message', function (message) {
        console.log('receive:',message);
        repeatFun(message);

        // ws.send(message); //向客户端发送数据

    });
    ws.on('close',function(){
        clearInterval(timer);
    })
});