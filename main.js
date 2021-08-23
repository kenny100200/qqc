import Vue from 'vue'
import App from './App'
import './common/ican-H5Api.js'
Vue.config.productionTip = false

import tools from './common/tools.js'
Vue.prototype.$tools=tools

import uView from "uview-ui";
Vue.use(uView);

import * as filters from './common/filters.js'
/* 过滤器 */
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

import i18n from './common/index18.js';

App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

app.$mount()
