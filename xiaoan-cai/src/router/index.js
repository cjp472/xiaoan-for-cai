import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'
import home from '@/components/tabbar/home'
import law from '@/components/tabbar/law'
import my from '@/components/tabbar/my'
import lawsearch from '@/view/rule/lawsearch'

/* Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
} */

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    redirect: '/law',
    component: index,
    children: [{
      path: '/law',
      name: 'home',
      component: home,
      meta: {title: '信公小安'},
      children: [{
        path: '/law',
        name: 'law',
        component: law,
        meta: {title: '信公小安', tabName: 'law'}
      }, {
        path: '/my',
        name: 'my',
        component: my,
        meta: {
          title: '信公',
          tabName: 'my'
        }
      }]
    }, {
      path: '/lawsearch',
      name: 'lawsearch',
      component: lawsearch,
      meta: {
        title: '信公',
        tabName: 'my'
      }
    }
    ]
  }]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
})

export default router
