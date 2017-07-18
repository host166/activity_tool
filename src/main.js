// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'	//为了转码Array上新增的from系列方法
import Vue from 'vue'
// import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//主组件
import App from './App'
//路由配置
import router from './router'
import store from './store'
//全局引入安装
//全局函数工具集
import tools from './js/utils'
//注入的全局组件
import uiConfig from './config-ui'
//注入的全局api接口
import apiConfig from './config-api'
//注入业务ajax方法
// import oAjaxs from './pages/toolInit/modules/server.js'
// var oAjaxs = require('elongapp').ajaxs;
// console.log( oAjaxs );

//全局路由方法
Vue.router = router;
//全局api接口
Vue.apiConfig = apiConfig;

//第三方js
// require('bridge');

//全局安装函数工具集
// var tool = require('./js/utils');	
// Vue.use(oAjaxs);
Vue.use(uiConfig);
Vue.use(tools);

Vue.use(VueRouter);
Vue.use(VueResource);


// 务必在加载 Vue 之后，立即同步设置以下内容
// Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // render: h => h(App),
    template: '<App/>',
    components: {
        App
    }
})

