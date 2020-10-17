import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import MyHttpServer from './plugins/http'; //引入axios
import moment from 'moment' //引入日期插件
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(MyHttpServer)
    // 全局过滤器 处理日期
Vue.filter('fmtdate', (v) => {
    return moment(v).format('YYYY-MM-DD')
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')