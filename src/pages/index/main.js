import '@babel/polyfill'
import Vue from 'vue'
import App from '@index/App.vue'
import router from '@index/router'
import store from '@index/store'

// iView 全局(按需的话低版本会出问题，已经比原版小1M)
import iView from 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

// Antd 按需
import { Spin } from 'ant-design-vue'
const Antd = [Spin]

// 捆绑注册
function* register(name) {
	Vue.use(name)
}
;[...Antd].forEach(component => register(component).next())

// 挂载api
import api from '@index/api'
Vue.prototype.$_api = api

/**
 * 动态响应rem
 */
import '@/config/rem.config'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
