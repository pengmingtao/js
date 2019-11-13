var a = (function(){
    var count = 0;
    var button = document.getElementById("count");
    button.onclick = function(){    
        //可能需要调取ajax请求，当取到数据后发布
            xmlAjax({
                method:'post',
                url:'http://localhost:3000/api/msg',
                done:function(data){  
                    count = count+1;
                    console.log(data);
                    eventObj.trigger("add",{
                        count,
                        data:data.result
                    });
                }
            });   
    }
})();

// 负责处理点击操作 及发布消息


// // 1.发起ajax，成功的时候，取到数据了
// eventObj.trigger("success",{name:'laney'});

// //2.取数据，渲染页面
// eventObj.listen("success",function(data){
//     console.log(data);
// });