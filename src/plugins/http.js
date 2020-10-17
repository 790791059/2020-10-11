//插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = function(Vue) {
    // 设置请求数据的基准地址
    axios.defaults.baseURL = 'api/'
        //添加token
    const AUTH_TOKEN = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
        // 4. 添加实例方法
    Vue.prototype.$http = axios
}
export default MyHttpServer