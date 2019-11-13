        //发布者
        var eventObj = {
            //缓存列表，存放订阅者的信息
            list:{},
            //添加订阅
            listen:function(key,fn){
                if(!this.list[key]){
                    this.list[key] = [];
                }
               typeof fn==='function' &&  this.list[key].push(fn);
            },
            // 发布信息
            trigger:function(){

                // 取出颜色 color
                // var key = [].shift.call(arguments);
                var key = Array.prototype.shift.call(arguments);
                // var key =  Array.from(arguments).shift();
                
                var fns = this.list[key];
                for(var i=0,len=fns.length;i<len;i++) {
                    var fn = fns[i];
                    // fn();
                    fn.apply(this,arguments);
                }
            },
             //取消订阅
            removeListen(key,fn){
                var fns = this.list[key];
                //不存在的订阅类型，以及订阅未传入处理回调
                if(!fns) {
                    return;
                }
                if(typeof fn==='undefined'){
                    return;
                }
                var sindex = fns.indexOf(fn);
                fns.splice(sindex,1);
            }
        }
