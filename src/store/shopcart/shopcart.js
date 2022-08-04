import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

const state = {
    cartList: []
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },

    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return "ok"
        }
        else {
            return Promise.reject(new Error("fail"))
        }
    },

    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return "ok"
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    },

    // 删除全部勾选的产品 context中 commit getters dispatch state
    deleteAllCheckedCart({ dispatch, getters }) {
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked==1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            PromiseAll.push(promise)
        })
        // 若有一个失败 返回的为失败的结果
        return Promise.all(PromiseAll)
    },

    updateAllCartChecked({dispatch,state},isChecked){
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

}

export default {
    state,
    actions,
    mutations,
    getters
}