
// Create SocketIO instance, connect
//io //Socket.io客户端对象
var socket = io.connect('ws://localhost:8083'); 

// Add a connect listener
socket.on('connect', function() {
    showMessage('Client has connected to the server!');
});

// Add a connect listener
socket.on('news', function(data) {
    var str = 'Received data from server. data : ' + JSON.stringify(data);
    debugger
    showMessage(str); 
});

// Add a disconnect listener
socket.on('disconnect', function() {
    showMessage('The client has disconnected');
});

// Sends a message to the server via sockets
function sendMessageToServer(msgData) {
    socket.emit('test_event', msgData);
}

function showMessage(str) {
    var txt = document.getElementById('txtConsole');
    txt.value = txt.value + '\n' + str;

}

// 向服务端发送数据
function sendMsgHandler() {
    var elem =  document.getElementById('chatpIpt');
    var iptValue = elem.value;
    sendMessageToServer({data : iptValue});
    elem.value = "";
    elem.focus();
}