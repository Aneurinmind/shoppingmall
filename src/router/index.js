import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'

import store from '@/store'

Vue.use(VueRouter)

// 保存原VueRouter对象上的push方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push replace 方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // 注意上下文关系
        originPush.call(this, location, resolve, reject)
    }
    else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // 注意上下文关系
        originReplace.call(this, location, resolve, reject)
    }
    else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savePosition) {
        return { y: 0 }
    }
})

//全局守卫 前置守卫
router.beforeEach(async(to, from, next) => {
    //用户登陆了才有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    //用户登录后不允许去login页
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        }
        else {
            // 不是去/login，放行
            if (name) {
                // 如果用户信息存在，则放行
                next();
            }
            else {
                // 用户信息不存在，派发action获取用户信息后再放行
                try {
                    await store.dispatch("getUserInfo")
                    next();
                }
                catch (error) {
                    // 如果不能获取用户信息，说明token失效，此时需要清除token，重新登录
                    await store.dispatch("userLogout")
                    next('/login');
                }
            }
        }
    }
    else {
        //未登录 不能去交易相关组件
        let toPath = to.path
        if(toPath.indexOf('/trade')!==-1 || toPath.indexOf('/pay')!==-1 || toPath.indexOf('/center')!==-1){
            //未登录下 如果想跳转到我的订单 那么先跳转到login组件 登录完成后 跳转到原来想要去的我的订单页
            next('/login?redirect='+toPath)
        }
        else{
            next()
        }
    }
})

export default router