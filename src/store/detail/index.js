import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const actions = {
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODLIST',result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //服务器写入数据成功，没有返回其它数据，只是返回code=200，代表这次操作成功
        if(result.code==200){
            return "ok"
        }
        else{
            return Promise.reject(new Error('fail'))
        }
    
    }
    
}
const mutations = {
    GETGOODLIST(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const getters = {
    //路径导航简化数据
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    //商品信息简化数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性简化数据
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default{
    state,
    actions,
    mutations,
    getters
}