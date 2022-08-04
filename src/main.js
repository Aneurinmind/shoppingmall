import Vue from 'vue'
import App from './App.vue'

// 三级联动组件  全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

//分页器 全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

import router from '@/router'

//数据仓库
import store from '@/store'

//轮播图 全局组件
import Carousel from "@/components/Carousel"
Vue.component(Carousel.name,Carousel)

Vue.config.productionTip = false

import '@/mock/mockServe'

import "swiper/css/swiper.css"

import * as API from '@/api'

// 引入图片懒加载插件
import VueLazeload from 'vue-lazyload';
// 引入懒加载默认图片（即真实图片没加载好之前，加载时显示的图片）
import tp from '@/assets/logo.png';
// 注册插件
Vue.use(VueLazeload, {
  // 懒加载默认图片，（即真实图片没加载好之前，加载时显示的图片）
  loading: tp,
})

import { Button, MessageBox } from 'element-ui'
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入封装的表单验证插件
import "@/plugins/validate"

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
