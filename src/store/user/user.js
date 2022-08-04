import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: '',
    token: getToken(),
    userInfo: {},
}
const actions = {
    async getCode({ commit }, phone) {
        // 非正常验证码形式
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    },

    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    },

    async userLogin({ commit }, { phone, password }) {
        // 向服务器发请求
        let result = await reqUserLogin(phone, password);
        // 服务器下发token，用户唯一标识符。
        if (result.code == 200) {
            // 客户端需要持久存储 token，以后客户端每次向服务端请求资源的时候需要带着服务端签发的 token。
            commit("SETTOKEN", result.data.token);
            // 持久化存储token，存储到本地
            setToken(result.data.token)
            return 'ok'
        }
        else {
            return Promise.reject(new Error('fail'));
        }
    },

    async getUserInfo({ commit }) {
        // 向服务器发请求
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("USERINFO", result.data);
            return 'ok';
        }
    },

    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit("CLEAR");
            return 'ok';
        }
        else {
            return Promise.reject(new Error('fail'));
        }
    }
}

const mutations = {

    GETCODE(state, code) {
        state.code = code;
    },

    USERLOGIN(state, token) {
        state.token = token;
    },

    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },

    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}