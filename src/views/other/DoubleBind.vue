<template>
    <div class="box">
        <h2 style="font-size:18px;">测试本页面功能时，记得打开控制台，以查看各个按钮点击后console的内容</h2>
        <button class="btn-reset" @click="getValue">getObjectValue</button>
        <button class="btn-reset" @click="setValue">setObjectValue</button>

        <div id="observe">observe</div>
        <input id="input" value="123456"/>

        <button class="btn-reset" @click="changeDomAttr">改变div的属性</button>
        <button class="btn-reset" @click="changeDomText">改变div的内容</button>
        <button class="btn-reset" @click="changeInputValue">改变input的value</button>

        
    </div>
</template>

<script>
export default {
    data () {
        return {
           app:null,

           dom:null,

           input:null
        }
    },
    mounted() {
        this.createObserver()

        this.createDomObserver()
    },
    methods: {
        // 数据变化的监听
        createObserver() {
            function Observer() {
                var result = null;
                
                Object.defineProperty(this, 'result', {
                    get: function() {
                        console.log('你访问了 result');
                        return result;
                    },
                    set: function(value) {
                        result = value;
                        console.log('你设置了 result = ' + value);
                    }
                });
            };
            this.app = new Observer(); // 实例化
        },
        getValue() {
            console.log(this.app.result); // 你访问了 result
        },
        setValue() {
            this.app.result = 11; // 你设置了 result = 11;
        },

        // 我们可以使用MutationObserver(html5)创建一个观察者对象，其会监听某个 DOM 元素，
        // 并在它的 DOM 树发生变化时执行我们提供的回调函数，监听不了input value的变化。
        createDomObserver() {

            /**观察选项可取的值，https://www.jianshu.com/p/b5c9e4c7b1e1
             *  childLIst  观察目标节点的子节点的新增和删除。
                attributes 观察目标节点的属性节点(新增或删除了某个属性,以及某个属性的属性值发生了变化)。
                characterData 如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化
                subtree 观察目标节点的所有后代节点(观察目标节点所包含的整棵DOM树上的上述三种节点变化)
                attributeOldValue 在attributes属性已经设为true的前提下, 将发生变化的属性节点之前的属性值记录下来(记录到下面MutationRecord对象的oldValue属性中)
                characterDataOldValue 在characterData属性已经设为true的前提下,将发生变化characterData节点之前的文本内容记录下来(记录到下面MutationRecord对象的oldValue属性中)
                attributeFilter 一个属性名数组(不需要指定命名空间),只有该数组中包含的属性名发生变化时才会被观察到,其他名称的属性发生变化后会被忽略想要设置那些删选参数的话，
             */
            
            // 配置观察选项
            var config = { 
                attributes: true, // 是否观察属性的变动
                childList: true, // 是否观察子节点的变动（指新增，删除或者更改）
                characterData: true // 是否观察节点内容或节点文本的变动
            };

            // Callback function to execute when mutations are observed
            // 回调函数进行实例化
            var callback = function(mutationsList) {
                for(var mutation of mutationsList) {
                    console.log(mutation);
                    if (mutation.type == 'childList') { //子节点变动
                        console.log('A child node has been added or removed.');
                    }
                    else if (mutation.type == 'attributes') { //属性变动
                        console.log('The ' + mutation.attributeName + ' attribute was modified.');
                    }else{ //文本内容变动
                        console.log('The ' + mutation.attributeName + ' attribute was modified.');
                    }
                }
            };

            // 选择目标节点，如果元素是通过data数据生成的（v-for,v-if），则不能在mounted里面获取到
            var dom = document.getElementById('observe');
            this.dom = dom;

            // 创建并返回一个新的 MutationObserver 它会在指定的DOM发生变化时被调用
            var observer = new MutationObserver(callback);
            // 配置MutationObserver在DOM更改匹配给定选项时，通过其回调函数开始接收通知。
            observer.observe(dom, config);
            // Later, you can stop observing
            // observer.disconnect();


            // 选择目标节点，如果元素是通过data数据生成的（v-for,v-if），则不能在mounted里面获取到
            var input = document.getElementById('input');
            this.input = input;

            // Create an observer instance linked to the callback function
            var observer2 = new MutationObserver(callback);
            // Start observing the target node for configured mutations
            observer2.observe(input, config);
            // Later, you can stop observing
            // observer2.disconnect();

            /**
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var list = document.querySelector('ol');
            
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    var list_values = [].slice.call(list.children)
                        .map( function(node) { return node.innerHTML; })
                        .filter( function(s) {
                        if (s === '<br />') {
                            return false;
                        }
                        else {
                            return true;
                        }
                    });
                    console.log(list_values);
                }
                });
            });
            
            observer.observe(list, {
                attributes: true,
                childList: true,
                characterData: true
            });
            */

        },
        changeDomText() {
            this.dom.innerHTML = '改变了节点内容'; // 在js中，文本也算一个节点，属于元素的子节点
        },
        changeDomAttr() {
            this.dom.className = 'test-class';
        },
        changeInputValue() {
            this.input.value = '改变了value';
        }
    }
}
</script>

<style lang="scss" scoped>
.test-class{
    color:#f00;
}
input,#observe{
    height: 22px;
    font: 16px/18px arial;
    line-height: 22px;
    margin: 6px 0 0 7px;
    padding: 0;
    background: transparent;
    border: 1px solid #efefef;
    outline: 0;
    -webkit-appearance: none;
}
.puzzle-wrap {
    width: 328px;
    height: 328px;
    padding: 0;
    margin: 50px auto 0;
    background: #ccc;
    list-style: none;
}
.puzzle {
    float: left;
    width: 80px;
    height: 80px;
    font-size: 20px;
    background: #f90;
    text-align: center;
    line-height: 80px;
    border: 1px solid #ccc;
    cursor: pointer;
}
.puzzle-empty {
    background: #ccc;
    box-shadow: inset 2px 2px 18px;
}
.btn-reset {
	display: block;
	width: 200px;
	height: 40px;
	line-height: 40px;
	margin: 20px auto 0;
	text-align: center;
	border-radius: 5px;
	border: none;
	background: #ccc;
}
</style>