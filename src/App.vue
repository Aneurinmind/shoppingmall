<template>
  <div>
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- Footer在登录和注册界面隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  // 派发actions 获取商品分类三级列表数据 放在App组件中只发一次请求
  mounted() {
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>
