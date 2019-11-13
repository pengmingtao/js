var b = (function(){
    var div = document.getElementById("showcount");
    var mainPage= document.getElementById('mainPage');
    eventObj.listen('add',function(res){
        debugger
        // 2.取数据，渲染页面 
        div.innerHTML = res.count;
        var data = res.data.data;
        var listSt = [];
        for(var i=0,len=data.length;i<len;i++) {
            listSt.push(`<li>姓名:${data[i].name}--内容：${data[i].content}</li>`)
        }
        mainPage.innerHTML = listSt.join('');
    });
})();
// 负责监听add这个消息，并把点击的总次数显示到页面上来