var http = require('http');
var server = http.createServer();  // server eventEmitter

// http.createServer(function(request,response){
// }).listen(3000,function(){
//     console.log('监听到3000');
// });


server.on('request', function(request, response) {
// handle your request
}).listen(9080,function(){

}); 