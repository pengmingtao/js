const https=require('https')
const fs=require('fs');
const key=fs.readFileSync('./key.pem');
const cert=fs.readFileSync('./cert.pem');

const options={
    key:key,
    cert:cert
}
https.createServer(options,(req,res)=>{
    res.writeHead(200)
    res.end('hello world')
}).listen(8000,()=>{
    console.log('监听8000端口成功')
});