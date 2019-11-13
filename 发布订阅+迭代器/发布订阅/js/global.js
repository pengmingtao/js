function xmlAjax(opt){
    var optInit = {
        method:'post',
        url:'',
        data:null,
        async:true,
        contentType:'application/json;charset=UTF-8',
        done:function(){},
        fail:function(){}
    }
    var endObj = Object.assign({},optInit,opt);
    var xml = new XMLHttpRequest();

    var isGet = endObj.method.toLowerCase()=='get';
    if(isGet && endObj.data) {
        var keys = Object.keys(endObj.data);
        var str = '';
        for(var key in endObj.data) {
            str+= key+'='+endObj.data[key]+'&';
        }
        str = str.substring(0,str.length-1);
        endObj.url = endObj.url+'?'+str;
    }

    xml.open(endObj.method,endObj.url,optInit.async);
    // xml.setRequestHeader('Authorization','99a9df06-c224-436b-a48a-65884dea37c9');
    // xml.setRequestHeader('Content-Type',endObj.contentType);

    if(endObj.data) {
        var dataParam = JSON.stringify(endObj.data)
        xml.send(dataParam);
    } else {
        xml.send();
    }

    xml.onreadystatechange = function(){
        if(xml.readyState==4) {
            if(xml.status==200){
                let response = JSON.parse(xml.responseText);
  
                endObj.done(response);
            } else {
                endObj.fail(response);
            }
            
            
        } 
    }  
}