// home 模块仓库
import { reqCategoryList,reqFloorList,reqGetBannerList } from "@/api"
const state = {
    //state 默认初始值
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }

}
const actions = {
    //调用API接口函数 获取数据
    async categoryList({commit}) {
        let result = await reqCategoryList()
        if(result.code == 200){
            commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit("BANNERLIST",result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit("BANNERLIST",result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit("FLOORLIST",result.data)
        }
    }

}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}