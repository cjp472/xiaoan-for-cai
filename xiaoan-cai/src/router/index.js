import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('../components/index.vue');
const advertizing = () => import('../components/advertizing.vue');

const law = () => import('../view/tabbar/law.vue');
const my = () => import('../view/tabbar/my.vue');
const affiche = () => import('../view/tabbar/affiche.vue');
const report = () => import('../view/tabbar/report.vue');

const lawsearch = () => import('../view/rule/lawSearch.vue');
const lawindex = () => import('../view/rule/lawIndex.vue');
const lawlist = () => import('../view/rule/lawList.vue');
const lawdetail = () => import('../view/rule/lawDetail.vue');
const lawlates = () => import('../view/rule/lawLates.vue');
// const drawerindex = () => import('../components/xaDrawer.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [{
    path: '/',
    name: '',
    redirect: '/advertizing',
    component: index,
    children: [{
      path: '/law',
      name: 'law',
      component: law,
      meta: {
        title: '法规',
        tabName: 'law',
        footer: true
      }
    }, {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        title: '个人中心',
        tabName: 'my',
        footer: true
      }
    }, {
      path: '/affiche',
      name: 'affiche',
      component: affiche,
      meta: {
        title: '公告',
        tabName: 'affiche',
        footer: true
      }
    }, {
      path: '/report',
      name: 'report',
      component: report,
      meta: {
        title: '研报',
        tabName: 'report',
        footer: true
      }
    }]
  }, {
    path: '',
    name: '',
    component: lawindex,
    meta: {title: '搜索', tabName: ''},
    children: [{
      path: '/lawsearch',
      name: 'lawsearch',
      component: lawsearch,
      meta: {
        title: '搜索',
        tabName: ''
      }
    }, {
      path: '/lawlist',
      name: 'lawlist',
      component: lawlist,
      meta: {
        title: '列表',
        tabName: 'law'
      }
    }, {
      path: '/lawlates',
      name: 'lawlates',
      component: lawlates,
      meta: {
        title: '最新法规',
        tabName: '',
        isKeepAlive: false,
        isHome: true
      }
    }, {
      path: '/lawdetail',
      name: 'lawdetail',
      component: lawdetail,
      meta: {
        title: '内容',
        tabName: '',
        isHome: true
      }
    }]
  }, {
    path: '/advertizing',
    name: 'advertizing',
    component: advertizing,
    meta: {
      title: '广告',
      tabName: 'advertizing'
    }
  }]
})

export default router
