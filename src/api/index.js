//API 统一管理
import requests from "./request";
import mockRequests from './mockAjax'

//三级联动接口 get 无参数
export const reqCategoryList = () => {
    //发请求返回一个Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 轮播图
export const reqGetBannerList = () => mockRequests.get('/banner')

// floor
export const reqFloorList = () => mockRequests.get('/floor')

// 搜索模块数据
export const reqGetSearchInfo = (params) => {
    return requests({ url: '/list', method: 'post', data: params })
}

//商品详情页数据
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//添加到购物车 更新产品个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车中的商品
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete"
})

// 修改商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked) => requests ({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})  

//获取验证码
export const reqGetCode = (phone) => requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})

//注册
export const reqUserRegister = (data) => requests({
    url:'/user/passport/register',
    data,
    method:'post'
})

//登录
export const reqUserLogin = (data) => requests({
    url:'/user/passport/login',
    data,
    method:'post'
})

// 获取用户信息
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: "get"
})

//退出登录
export const reqLogout = () => requests({
    url: '/user/passport/logout',
    method: "get"
})

// 获取用户地址信息
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: "get"
})

// 获取交易页信息（商品清单）
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: "get"
})

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data
})

// 获取支付信息
export const reqPayInfo = (orderId) => requests({
    url: `payment/weixin/createNative/${orderId}`,
    method: "get"
})

// 获取订单支付状态
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get"
})

// 获取我的订单列表
export const reqMyorderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get"
})


