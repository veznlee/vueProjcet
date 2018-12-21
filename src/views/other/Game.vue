<template>
    <div class="box">
        <ul class="puzzle-wrap">
            <li 
                :class="{'puzzle': true, 'puzzle-empty': !puzzle}" 
                v-for="(puzzle, index) in puzzles" 
                :key="index"
                v-text="puzzle"
                @click="moveFn(index)"
            ></li>
        </ul>
        <button class="btn-reset" @click="renderFn">重置游戏</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            puzzles: []
        }
    },
    mounted() {
        this.renderFn()
    },
    methods: {
        // 重置渲染
        renderFn() {
        	let puzzleArr = Array.from({ length: 15 }, (value, index) => index + 1);

            // 随机打乱数组
            // puzzleArr = puzzleArr.sort(() => {
            //     return Math.random() - 0.5
            // });
            // 为什么不适用sort排序，由于 JavaScript 内置排序算法的缺陷性，
            // 使用 sort 排序的结果并不随机分布，经过大量的测试你会发现越大的数字出现在越后面的概率越大。
        	
            // 页面显示
            this.puzzles = this.shuffle(puzzleArr)
            this.puzzles.push('')
        },
        // 随机打乱数组
        shuffle(arr) {
        	let len = arr.length
        	    
    	    for (let i = 0; i < len - 1; i++) {
    	        let idx = Math.floor(Math.random() * (len - i))
    	        let temp = arr[idx]
    	        arr[idx] = arr[len - i - 1]
    	        arr[len - i - 1] = temp
    	    }
    	    
    	    return arr
        },
        // 点击方块
        moveFn(index) {
        	let puzzles = this.puzzles
            // 获取点击位置上下左右的值
            let leftNum = this.puzzles[index - 1],
                rightNum = this.puzzles[index + 1],
                topNum = this.puzzles[index - 4],
                bottomNum = this.puzzles[index + 4]
            // 和为空的位置交换数值
            if (leftNum === '' && index % 4) {
                this.setPuzzle(index, -1)
            } else if (rightNum === '' && 3 !== index % 4) {
                this.setPuzzle(index, 1)
            } else if (topNum === '') {
                this.setPuzzle(index, -4)
            } else if (bottomNum === '') {
                this.setPuzzle(index, 4)
            }
            this.passFn()
        },
        // 设置数组值
        setPuzzle(index, num) {
        	let curNum = this.puzzles[index]

            /**
             * 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
             * 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
             * 当你修改数组的长度时，例如：vm.items.length = newLength
             *  
             * Vue 提供的 $forceUpdate 方法迫使 Vue 实例重新渲染，这样改变的数据就会被更新的页面中去。但是最好不要这样操作，
             * 因为这会导致 Vue 重新遍历此对象所有的属性，一定程度上会影响页面的性能。
             */
        	// this.puzzles[index + num] = curNum
        	// this.puzzles[index] = ''
        	// this.$forceUpdate()

        	this.$set(this.puzzles, index + num, curNum)
        	this.$set(this.puzzles, index, '')
        },
        // 校验是否过关
        passFn() {
            if (this.puzzles[15] === '') {
                let newPuzzles = this.puzzles.slice(0, 15)
                let isPass = newPuzzles.every((e, i) => e === i + 1)
                if (isPass) {
                    alert ('恭喜，闯关成功！')
                }
            }
        }
    },
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