// 二次封装Axios
import axios from 'axios'
//进度条
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
    baseURL:"/api",
    timeout:5000,
})

//请求拦截器
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }

    // 请求头添加一个字段：token：用户标识
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    
    nProgress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    nProgress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))
})

export default requests