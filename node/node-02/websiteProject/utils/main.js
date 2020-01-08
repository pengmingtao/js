function xmlAjax(opt){
    return new Promise(function(resolve,reject){
        var initOpt = {
            method:'post',
            url:'',
            data:null,
            async:true,
            //告诉服务器，我给的是什么数据
            headers:{
                contentType:''
            }
        };
    
        // contentType:
        // 'json':'application/json;charset=UTF-8',
        // 'form':'application/x-www-form-urlencoded' //默认
        //  multipart/form-data 

        var endobj = Object.assign({},initOpt,opt);
        
        //1. 创建xml对象
        var xhr = new XMLHttpRequest();
    
        var isGet = endobj.method.toLowerCase()=='get';
        if(isGet && endobj.data) { 
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
         xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
         xhr.setRequestHeader('Content-Type',endobj.headers.contentType); 
        //如果这里设置了Content-Type就是复杂请求
    
           //4. 发送数据
         if(isGet) {
            xhr.send(null);
         } else {
             switch(Object.prototype.toString.call(endobj.data)){
                case '[object FormData]':
                    
                    xhr.send(endobj.data);
                    break;
                case '[object object]':
                    var dataparam = JSON.stringify(endobj.data);
                    xhr.send(dataparam);
                    break;
                default:
                    xhr.send(null);
                    break;
             }
            
         }
         
       xhr.onreadystatechange = function(){ 
            if(xhr.readyState==4) {
                if(xhr.status==200) {
                    if(typeof xhr.responseText =='object'){
                        var data = JSON.parse(xhr.responseText);
                        resolve(data)
                    } else {
                        resolve(xhr.responseText);
                    }
                   
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

    function uploadAllImg(){
        xhr.onreadystatechange = function(){ 
            if(xhr.readyState==4) {
                if(xhr.status==200) {
                    console.log('pppp');
                }
            }
    }
}
    xhr.upload.addEventListener("progress", function(event) { 
        if(event.lengthComputable){
            var progress = Math.ceil(event.loaded * 100 / event.total) + "%";
            console.log(progress);
            uploadAllImg();
        }
    }, false);

})
}

// https://wangdoc.com/javascript/bom/cors.html
// CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。
//  只要同时满足以下两大条件，就属于简单请求。
// （1）请求方法是以下三种方法之一。
    // HEAD
    // GET
    // POST
// （2）HTTP 的头信息不超出以下几种字段。
    // Accept
    // Accept-Language
    // Content-Language
    // Last-Event-ID
    // Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

    // 凡是不同时满足上面两个条件，就属于非简单请求。
    // 一句话，简单请求就是简单的 HTTP 方法与简单的 HTTP 头信息的结合