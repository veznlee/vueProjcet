// import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'

import Layout from '@/views/Layout'
import Index from '@/views/Index'

import Table from '@/views/tableandform/Table.vue'
import Form from '@/views/tableandform/Form.vue'
import User from '@/views/tableandform/user.vue'

import MockTest from '@/views/mock/mock.vue'

import Component from '@/views/c-d-f/Component.vue'
import Directive from '@/views/c-d-f/Directive.vue'
import Filter from '@/views/c-d-f/Filter.vue'

import State from '@/views/statemanage/State.vue'

// import Page4 from '@/views/nav2/Page4.vue'
// import Page42 from '@/views/nav2/Page4-2.vue'
// import Page5 from '@/views/nav2/Page5.vue'
// import Page6 from '@/views/nav3/Page6.vue'
import echarts from '@/views/charts/echarts.vue'

let routes = [
  // {
  //   path: '/login',
  //   component: Login,
  //   name: '',
  //   hidden: true
  // },
  {
    path: '/404',
    name: '',
    component: NotFound,
    hidden: true
  },
  {
    path: '/',
    name: 'tablelist',
    menuName: '列表与表单',
    component: Layout,
    iconCls: 'el-icon-message', // 图标样式class
    children: [
      { path: '/index', component: Index, name: 'Index', menuName: '首页', hidden: true },
      { path: '/table', component: Table, name: 'Table', menuName: '增删改查'},
      // { path: '/mock', component: MockTest, name: 'MockTest', menuName: 'mock基础'},
      { path: '/form', component: Form, name: 'Form', menuName: '表单演示'},
      { path: '/user', component: User, name: 'User', menuName: '列表分页'}
    ]
  },
  {
    path: '/',
    name: 'cdf',
    menuName: '组件指令过滤器',
    component: Layout,
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/component', component: Component, name: 'Component', menuName: '组件' },
      { path: '/directive', component: Directive, name: 'Directive', menuName: '指令' },
      { path: '/filter', component: Filter, name: 'Filter', menuName: '过滤器' }
    ]
  },
  {
    path: '/',
    name: '',
    menuName: '状态管理',
    component: Layout,
    iconCls: 'fa fa-address-card',
    leaf: true, // 只有一个节点
    children: [
      { path: '/state', component: State, name: 'State', menuName: '状态管理' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

export default routes
