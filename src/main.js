// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css' //
import 'element-ui/lib/theme-chalk/index.css' // 默认只有这个样式
// import './styles/common.scss'
// import './styles/main.css'

import 'font-awesome/css/font-awesome.min.css'

import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'

// 单纯的使用mock
require('./mock/indexBase.js')
// 使用axios-mock-adapter
import Mock from './mock'
Mock.bootstrap();

//全局自定义过滤器，指令，组件
import filters from "./filters";
import directives from "./directives";
//import components from "./components"
import './components/common/componentRegister.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>',
//   router,
//   store
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
