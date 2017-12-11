// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/assets/css/reset.css'
import '@/assets/css/animate.css'
import '@/assets/iconfont/iconfont.css'
import 'lib-flexible/flexible.js' // 移动端rem编译
import md5 from 'js-md5'
import App from './App'
import router from './router'
import store from './store/index'

import Http from '@/service/http'
import Regx from '@/service/regx'
import Cookie from '@/service/cookie'
import storage from '@/service/storage'
import Api from '@/service/api'
// import Ele from '@/service/ele'
import common from '@/service/common'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

let Base64 = require('js-base64').Base64

Vue.prototype.$md5 = md5
Vue.prototype.$http = Http(Vue)
Vue.prototype.$regx = Regx
Vue.prototype.$cookie = Cookie
Vue.prototype.$storage = storage
Vue.prototype.$api = Api
Vue.prototype.$common = common

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
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
})
