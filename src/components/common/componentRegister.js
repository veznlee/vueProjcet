import Vue from 'vue'
 
/**
* 首字母大写
* @param str 字符串
* @example heheHaha
* @return {string} HeheHaha
*/
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
 
/**
* 对符合'xx/xx.vue'组件格式的组件取组件名
* @param str fileName
* @example abc/bcd/def/basicTable.vue
* @return {string} BasicTable
*/
function validateFileName(str) {
  return /^S+.vue$/.test(str) &&
    str.replace(/^S+\/(w+).vue$/, (rs, $1) => capitalizeFirstLetter($1))
}

/**
 * 使用 require.context() 方法来创建自己的模块上下文，从而实现自动动态require组件。
 * 这个方法需要3个参数：要搜索的文件夹目录、是否还应该搜索它的子目录、以及一个匹配文件的正则表达式。
 */
const requireComponent = require.context('./', true, /.vue$/)
console.log(requireComponent);
 
// 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
requireComponent.keys().forEach(filePath => {
  // 拿到的是js部分的文件内容
  const componentConfig = requireComponent(filePath)
//   const fileName = validateFileName(filePath)
//   // 这里对组件名做了判断，如果是index的话就取组件中的name属性处理后作为注册组件名
//   const componentName = fileName.toLowerCase() === 'index'
//     ? capitalizeFirstLetter(componentConfig.default.name)
//     : fileName
  const componentName = componentConfig.name || componentConfig.default.name

  // 组件名是文件名
  Vue.component(componentName, componentConfig.default || componentConfig)
})


/**
 * 最后我们在main.js中import ‘components/componentRegister.js’，然后我们就可以随时随地使用这些基础组件，无需手动引入了~ 
 * 适用组件格式定义如下
    <template>
        <div>
            ...
        </div>
    </template>
    <script>
        export default {
            data(){
            }，
            ...
        }
    </script>
    <style scoped>

    </style>
 * */ 

