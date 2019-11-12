//classList     //兼容性不好,支持classList的浏览器有Firefox3.6+和chrome和IE10+。

var classTool = {
    hasClass :function (elem,cls){
        // /toShow/.test(elem.className) //常用
        return new RegExp(cls).test(elem.className);
    },
    addClass :function (elem, cls) {
      if (!this.hasClass(elem, cls)) {
        elem.className += " " + cls; 
      }
    },
    removeClass :function (elem, cls) {
      if (this.hasClass(elem, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)'); 
         elem.className = elem.className.replace(reg, ' '); 
      }
    },
    toggleClass(elem,cls){ 
        if(this.hasClass(elem,cls)){ 
            this.removeClass(elem, cls); 
        }else{ 
            this.addClass(elem, cls); 
        } 
    }
}

// 解决classList的兼容问题(ie9及以下)
var isClassList = 'classList' in HTMLElement.prototype;
if(!isClassList){
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get:function(){
            var _self = this;
            var hasClass = function(cls){
                return new RegExp(cls).test(_self.className);
            }
            return {
                add:function(cls){  
                    if(!this.contains(cls)){
                    // if(!hasClass(cls)) {
                        _self.className += " " + cls; 
                    }
                },
                contains:function(cls){
                    var index = _self.className.indexOf(cls);
                    return index!=-1 ? true :false;
                },
                remove:function(cls){
                    if(!this.contains(cls)){
                        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)'); 
                        _self.className = _self.className.replace(reg, ''); 
                      }
                },
                toggle:function(cls){
                    if(!this.contains(cls)){
                        this.remove(cls); 
                    }else{ 
                        this.add(cls); 
                    } 
                }
            }
        }
    })
}

//为什么要在属性的get上定义， 而不是直接在HTMLElement.prototype的原型上去定义呢， 是为了对方法进行保护


 
