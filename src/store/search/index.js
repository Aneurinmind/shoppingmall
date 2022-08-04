// search 模块仓库
import { reqGetSearchInfo } from "@/api"

const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({commit},params={}){
        // params形参：是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result == 200){
            commit('GETSEARCHLIST',result.data) 
        }
    }
}
const getters = {
    goodsList(state){
        //数据不一定返回 若无返回 对象则是undefined undefined不能参加遍历
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}