// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Http from '@/service/http'
import Regx from '@/service/regx'
import Cookie from '@/service/cookie'
import storage from '@/service/storage'
import array from '@/service/array'
import constant from '@/service/constant'
import Api from '@/service/api'
import md5 from 'js-md5'
import common from '@/service/common'
import VueUI from '@/service/vueui'
/* 引入移动端手势库 */
import directives from '@/directives/touch'
directives(Vue);
Vue.use(VueUI);

const Base64 = require('js-base64').Base64
Vue.prototype.$md5 = md5
Vue.prototype.$http = Http(Vue)
Vue.prototype.$regx = Regx
Vue.prototype.$cookie = Cookie
Vue.prototype.$const = constant
Vue.prototype.$storage = storage
Vue.prototype.$array = array
Vue.prototype.$api = Api
Vue.prototype.$common = common

const fundebug = require("fundebug-javascript");
fundebug.apikey = "1e4eebbb02b9eeedfd5864097477eaad2c38b0028c8340f751bec4afd52e64b5"

const FastClick = require('fastclick')
FastClick.attach(document.body)
/**/
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
  }, 700)
})

Vue.config.productionTip = false;
/* eslint-disable no-new */
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
