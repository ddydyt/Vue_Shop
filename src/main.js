import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
Vue.prototype.$http = axios

axios.interceptors.request.use(config=>{
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
  // 必须return config
})
// 配置请求的根路径
// axios.defaults.baseURL = 'http://192.168.1.108:3000'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
