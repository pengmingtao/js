const os=require('os');
module.exports={
   showMen(){
        const men=os.freemem()/os.totalmem()*100
        console.log(`内存占用率${men.toFixed(2)}%`)
    },
    showCpu(){
        const cupstat=require('cpu-stat') //第三方  npm install cpu-stat -D
        cupstat.usagePercent((err,percent)=>{
            console.log(`cpu占用率${percent.toFixed(2)}%`) 
        })
    }
}

