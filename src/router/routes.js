// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        name: "center",
        path: "/center",
        component: Center,
        children: [
            {
                path: "myorder",
                component: MyOrder
            },
            {
                path: "grouporder",
                component: GroupOrder
            },
            // 重定向，当进入center时，默认显示myorder
            {
                path: "/center",
                redirect: '/center/myorder'
            }
        ]
    },

    {
        name: "paysuccess",
        path: "/paysuccess",
        component: PaySuccess,
    },

    {
        path: "/pay",
        component: Pay,
        beforeEnter(to, from, next) {
            // 当然，也可以用路由独享守卫也可以实现此
            if (from.path == "/trade") {
                next();
            } 
            else {
                next(false);
            }
        },
    },

    {
        path: "/trade",
        component: Trade,
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            }
            else {
                //中断当前导航
                next(false)
            }
        }
    },

    {
        path: "/shopcart",
        component: ShopCart,
        meta: {
            show: true
        },
        name: 'shopcart'
    },

    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: {
            show: true
        },
        name: 'addcartsuccess'
    },

    {
        path: "/detail:skuId",
        component: Detail,
        meta: {
            show: true
        }
    },

    {
        path: "/home",
        //路由懒加载
        component: () => import('@/pages/Home'),
        meta: {
            show: true
        }
    },

    {
        path: "/search/:keyword?", //占位后加问号可指定params参数可传或者可不传
        component: Search,
        meta: {
            show: true
        },
        name: "search"
    },

    {
        path: "/login",
        component: Login,
        meta: {
            show: false
        }
    },

    {
        path: "/register",
        component: Register,
        meta: {
            show: false
        }
    },

    // 重定向
    {
        path: '*',
        redirect: "/home"
    }
]