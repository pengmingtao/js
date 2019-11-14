function xmlAjax(opt){
    return new Promise(function(resolve,reject){
        var initOpt = {
            method:'post',
            url:'',
            data:null,
            async:true,
            //告诉服务器，我给的是什么数据
            contentType:'application/json;charset=UTF-8',
            done:function(){},
            fail:function(){}
            // dataType:
        };
    
        var endobj = Object.assign({},initOpt,opt);
        //1. 创建xml对象
        var xhr = new XMLHttpRequest();
    
        var isGet = endobj.method.toLowerCase()=='get';
        if(isGet && endobj.data) { 
           // {
           //     name:'laney',
           //     age:'10'
           // }
           // http://localhost:3000/info   ?   name=laney&age=10&size=10
           var str = '';
          for(var key in endobj.data) {
             str+=key+'='+ endobj.data[key]+'&';
          }
          str = str.substring(0,str.length-1);
          endobj.url = endobj.url +'?'+str;
        }
    
         //2.创建HTTP请求，链接服务器
        xhr.open(endobj.method,endobj.url,endobj.async);
    
         //3. 设置请求头部的方法，必须在open和send之间
         xhr.setRequestHeader('Content-Type',endobj.contentType);
    
           //4. 发送数据
         if(isGet) {
            xhr.send(null);
         } else {
            if(endobj.data){
                var dataparam = JSON.stringify(endobj.data);
                xhr.send(dataparam);
            } else {
                xhr.send(null);
            }
         }
    
       xhr.onreadystatechange = function(){ 
            if(xhr.readyState==4) {
                if(xhr.status==200) {
                    var data = JSON.parse(xhr.responseText);
                    // endObj.done(data);
                    resolve(data)
                } else {
                    reject('error')
                    switch(xhr.status){
                        case 500:
                            break;
                        case 400:
                            break;
                        case 304:
                            break;
                    }
                    endObj.fail('error');
                } 
            }
    
    }
})
}
