// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/components/commonApp';
import router from '@/router';
import store from '@/store/index'; // vuex
/* icon-font reset-css */
import "../../static/font/iconfonts-style.css";
import '../../static/css/reset.css'; // 清除各个浏览器默认样式
/**
 * 淘宝lib-flexible
 * */
import Flexible from 'lib-flexible';
/**
 * 公共的工具方法
 * */
import Utils from "@/services/utils.js";
/**
 * api接口
 */
import api from "@/services/api.js";
/**
 * axios
 * */
import axios from 'axios';
Vue.config.productionTip = false

//axios不支持vue.use()方式声明使用,在main.js申明Vue.prototype.axios=axios;那么在其他组件就可以this.axios调用使用
Vue.prototype.axios = axios;
//公共的工具方法
Vue.prototype.Utils = Utils;
//api接口
Vue.prototype.api = api;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
