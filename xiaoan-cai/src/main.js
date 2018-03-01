// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import api from '@/common/host'
import router from './router/index'
import store from './store/index'
import Http from './common/http'
import VIEWUI from './common/viewUI'
import FastClick from 'fastclick'
// 封装方法
import weixin from './common/weixin'
import cookie from './common/cookie'
import constant from './common/constant'
import array from './common/array'
import storage from './common/storage'
import MTAmethod from './common/MTAmethod'
import ybstore from './common/YBstore'
import share from './common/share'
import styleStore from './common/styleStore'
import 'lib-flexible' // 移动端rem编译

Vue.use(VIEWUI)

FastClick.attach(document.body)

// require("lrz/dist/lrz.bundle.js") // 图片压缩工具

Vue.prototype.$weixin = weixin;
Vue.prototype.$api = api;
Vue.prototype.$cookie = cookie;
Vue.prototype.$http = Http(Vue, cookie)
Vue.prototype.$const = constant;
Vue.prototype.$array = array;
Vue.prototype.$storage = storage;
Vue.prototype.$MTAmethod = MTAmethod;
Vue.prototype.$YBstore = ybstore;
Vue.prototype.$share = share;
Vue.prototype.$style = styleStore;

// const VueTouch = require('vue-touch');
// Vue.use(VueTouch, {name: 'v-touch'});

// 本地环境，测试环境,预发布环境添加log
// process.env.NODE_ENV === 'dev' ||  testing => 信安测试  pre => 董办助手
// fundebug 监控
if (process.env.NODE_ENV === 'dev') {
} else {
  // const fundebug = require("fundebug-javascript");
  // fundebug.apikey = "48e2830bba8a9cfdd4d7153a73c99e35df660ea99cfb1dd1ff5955cd7274815e";
}
if (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'pre') {
  const opt = {
    'logExtJs': '/static/log/log_ext.js',
    'logExtCss': '/static/log/log.css'
  };
  // window.MLogger.init(opt);
}
// Axios.defaults.withCredentials = true;
//
const history = window.sessionStorage;
// history.clear();
let historyCount = history.getItem('count') * 1;
// history.setItem('/', 0)
router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', {isLoading: true})
  window.document.title = to.meta.title;
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1];
    window.location.href = `http${url}`
  } else {
    next()
  }
});
//
router.afterEach(function (to) {
  setTimeout(() => {
    store.commit('UPDATE_LOADING', {isLoading: false})
  }, 500)
})
//
Vue.config.productionTip = false; // 生产环境关闭提示

// Vue.config.silent = true;//输出日志
// *eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App),
  // template: '<App/>',
  // components: {App},
  beforeCreate() {
    console.info('(全局)开始初始化vue实例')
  },
  created() {
    console.info('(全局)vue实例创建完成')
  },
  beforeMount() {
    console.info('(全局)开始渲染')
  },
  mounted() {
    console.info('(全局)渲染完成')
  },
  beforeUpdate() {
    console.info('(全局)DOM开始重新渲染或打补丁')
  },
  updated() {
    console.info('(全局)DOM渲染或打补丁完成')
  }
}).$mount('#app');
