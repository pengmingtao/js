const fs = require('fs').promises; //commonJS语法

//同步和异步读取
// const fileData =fs.readFileSync('./package.json'); //同步读取 读取格式是二进制buff 格式 需要toString()
// console.log(fileData.toString())

// const fileDataAsync = fs.readFile('./package.json',(err,res)=>{ //异步读取
//     console.log(res.toString())
// })
// fileDataAsync();

//利用promise第一种方式

// function promisify(fn){
//     return function(){
//         let args=Array.prototype.slice.call(arguments);
//         return new Promise((resolve,reject)=>{
//             args.push((err,result)=>{
//                 if(result) resolve(result)
//                 else reject(err)
//             })
//             fn.apply(null,args)
//         })
//     }
// }
// const readFile =promisify(fs.readFile); //同步读取 读取格式是二进制buff 格式 需要toString()
// readFile('./package.json').then((res)=>{
//     console.log(res.toString())
// })

//第二种方式 version > 8 util promisify
// const {promisify} = require('util');
// let readFile = promisify(fs.readFile);
// readFile('./package.json').then((res)=>{
//     console.log(res.toString())
// })
// (
//     async()=>{
//         let res = await readFile('./package.json');
//         console.log(res.toString())
//     }
// )();

//第三种方式 version>10  const fs = require('fs').promises;
fs.readFile('./package.json').then((res)=>{
    console.log(res.toString())
})

