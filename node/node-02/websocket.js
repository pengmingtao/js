let webSocket=require('ws').Server;// nodejs 的websocket库
let wss= new webSocket({port:8181});
wss.on('connection',(ws)=>{
    console.log('建立连接成功！')
    ws.on('message',(data)=>{
        console.log('data');
        ws.send(`你好${data}!`)
    })
})