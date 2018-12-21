<template>
    <div class="box">
        <ul class="puzzle-wrap" ref="ul">
            <li 
                :class="{'puzzle': true, 'puzzle-empty': !puzzle}" 
                v-for="(puzzle, index) in puzzles" 
                :key="index"
                v-text="puzzle"
                @click="moveFn(index)"
            ></li>
        </ul>
        <button class="btn-reset" @click="renderFn">重置游戏</button>

        <ul class="puzzle-wrap" ref="box">
            <li 
                class="puzzle"
                v-for="(item, index) in arr" 
                :key="index"
                v-text="item"
            ></li>
            <li class="puzzle puzzle-empty">空</li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            puzzles: [],
            arr: []
        }
    },
    mounted() {
        this.renderFn()
        this.getData()
    },
    methods: {
        // 重置渲染
        renderFn() {
        	let puzzleArr = Array.from({ length: 15 }, (value, index) => index + 1);
            // 页面显示
            this.puzzles = puzzleArr;
            this.puzzles.push('');

            // 这样会报错，因为我们获取 DOM 元素 li 的时候其还未被渲染
            // this.$refs.box.getElementsByTagName('li')[15].innerHTML = '揍你';

            this.$nextTick(()=>{
               // this.$refs.ul.query
               this.$refs.ul.getElementsByTagName('li')[15].innerHTML = '辶你';
            })
        },

        // 方法2， ES6 的 async/await 语法
        async getData() {
            this.arr = [1, 2, 3];
            
            // 等待渲染完成
            await this.$nextTick();
            
            this.$refs.box.getElementsByTagName('li')[0].innerHTML = 'hello';
        }
    }
}
</script>

<style lang="scss" scoped>
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