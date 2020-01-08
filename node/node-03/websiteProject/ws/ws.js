
// native code
//必须服务端也是ws包发起
var websocket = new WebSocket('ws://localhost:8181');
 // 监听socket连接
websocket.addEventListener('open', function (evt) { 
    console.log('websocket open.')
    // websocket.send('oooo');
});
 // 监听socket消息,获取后端发来的信息
websocket.addEventListener('message', function (evt) { 
    var endData = JSON.parse(evt.data);
    console.log(evt.data); 
    console.log('Received data from '+endData.name+':'+evt.data);
 
    showMessage(endData); 

});
 // 监听socket错误信息
 websocket.addEventListener('error', function (evt) {
    console.log('websocket error.')
})
 // socket关闭
websocket.addEventListener('close', function (evt) {
    console.log('websocket close.')
})

function showMessage(data) {
    
    var txtConsole = document.getElementById('txtConsole');
    var str = `<div class="show-message ${data.name=='laney'?'left':'right'}">
            <span class="name">${data.name}说:</span>
            <span class="info">${data.info}</span>
        </div>`;

    txtConsole.innerHTML +=str;
    
}