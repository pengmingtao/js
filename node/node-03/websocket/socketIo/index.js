//https://socket.io/get-started/chat/ 官网
// https://www.cnblogs.com/edwardloveyou/p/10625152.html 
// socket.io 与 ws对比
// https://blog.csdn.net/chenguohong88/article/details/81359307


// Websocket 研究 / Nodejs 模块选型对比
// https://cloud.tencent.com/developer/article/1005550

// Socket.io 快速搭建 和 注意事项
// https://www.jianshu.com/p/81ed0affe85a

// 安装：npm install socket.io   yarn add socket.io

var app = require('http').createServer(handler);
app.listen(8083,function(){
    console.log('8083端口开启成功！');
});

var socket = require('socket.io');
 //服务端的Socket.io对象
// var io = socket(app);
var io = socket.listen(app);

function handler(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello Socket Lover!</h1>');
}

io.on('connection', function (socket) {
    // 只要连接成功，给客户端发送信息
    socket.emit('news', { data : 'server world----' });

    socket.on('test_event', function (data) {
        console.log('receive data from client. data : ' + JSON.stringify(data));

        var str = data.data + "(from server by " + new Date().getTime() + ")";
        socket.emit('news', { data : str});
        // 监听到test_event后，给客户端发送信息
    });

    socket.on('disconnect', function () {
        console.log('websocket close. -- server log');
    });
    
});