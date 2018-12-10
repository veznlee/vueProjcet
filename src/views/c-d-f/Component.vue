<template>
    <div>
        <h1>组件测试-局部</h1>
		<my-alert :title="title" description="https://segmentfault.com/a/1190000009682735"></my-alert>
		<h1>组件测试-全局</h1>
		<el-button type="primary" v-on:click="changeOption">修改参数</el-button>
		<chart-component id="chartblock" :option="option" style="width:100%; height:400px;"></chart-component>

		<h1>组件测试-递归对象</h1>
		<ul>
			<item class="item" :model="treeData"></item>
		</ul>
		<h1>组件测试-递归数组</h1>
		<ul>
			<item class="item" v-for="(model,index) in items" :key="index" :model="model"></item>
		</ul>
		<h1>组件测试-简单的输入框</h1>
		<base-input v-model="value" label="测试输入框" placeholder="请输入内容" v-on:input="input"></base-input>
        <h1>Vue 中父子组件、兄弟组件通信</h1>
        <div id="parent">
            <div class="h-border">
                
                <p>不使用vuex，使用new Vue()实例的事件派发（$emit）和监听（on）实现</p>
            </div>
            <p>来自组件1的数据：{{c1}}</p>
            <p>来自组件2的数据：{{c2}}</p>
            <child-f :child1-content="content1" :child1-name="name1" @on-clicks-child1="onClickF"></child-f>
            <child-s :child2-content="content2" :child2-name="name2" @on-clicks-child2="onClickS"></child-s>
        </div>
    </div>
    
</template>
<script type="text/ecmascript-6">
    // 第一种引入方式
    import childF from '../../components/Bus1.vue'
    import childS from '../../components/Bus2.vue'

    // 第二种引入方式
    import Vue from 'vue'
    import MyAlert from '../../components/Alert.vue'
    Vue.use(MyAlert);
    import Menu from '../../components/Menu.vue'
    Vue.use(Menu);
    import BaseInput from '../../components/BaseInput.vue'
    Vue.use(BaseInput);
    export default {    
        components: {
            childF,
            childS
        },
        data () {      
            return {
                // 父子通信部分
                content1: 'this is child1 content',
                content2: 'this is child2 content',
                name1: 'my name is child1',
                name2: 'my name is child2',
                c1:'',
                c2:'',
                // 其他
                visible:false,
                title:'测试',
                option:{
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                },
                data:[5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20,5, 20, 36, 10],
                treeData:{
                    name: 'My Tree',
                    children: [
                        { name: 'hello' },
                        { name: 'wat' },
                        {
                            name: 'child folder',
                            children: [
                                {
                                    name: 'child folder',
                                    children: [
                                        { name: 'hello' },
                                        { name: 'wat' }
                                    ]
                                },
                                { name: 'hello' },
                                { name: 'wat' },
                                {
                                    name: 'child folder',
                                    children: [
                                        { name: 'hello' },
                                        { name: 'wat' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                items:[
                    { name: 'hello' },
                    { name: 'wat' },
                    {
                        name: 'child folder',
                        children: [
                            {
                                name: 'child folder',
                                children: [
                                    { name: 'hello' },
                                    { name: 'wat' }
                                ]
                            },
                            { name: 'hello' },
                            { name: 'wat' },
                            {
                                name: 'child folder',
                                children: [
                                    { name: 'hello' },
                                    { name: 'wat' }
                                ]
                            }
                        ]
                    }
                ],
                value:''
            }
        },    
        methods: {
            onClickF (params) {        
                //console.log('这是child1Click触发的事件，child1传给父组件参数==', params)
                this.c1 = params.content;
            },
            onClickS (params) {        
                //console.log('这是child2Click触发的事件，child2传给父组件参数==', params)
                this.c2 = params.content;
            },

            changeOption(){
                var r = Math.floor(Math.random()*12);
                var d = this.data.slice(r,r+6);
                this.option.series[0].data = d;
            },
            input(value){
                console.log(value)
            }
        }
    }
</script>
<style>
    #parent {    
        padding: 30px;    
        line-height: 30px;   
        padding-top: 50px;    
        text-align: center;
    }  
    .h-border {    
        border-bottom: 2px solid black;
    }
</style>