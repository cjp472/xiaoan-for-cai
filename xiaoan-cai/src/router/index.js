import Vue from 'vue'
import Router from 'vue-router'

const appIndex = () => import('@/view/index.vue')
const lawIndex = () => import('@/view/law/lawIndex.vue')
const afficheIndex = () => import('@/view/affiche/afficheIndex.vue')
const myIndex = () => import('@/view/my/myIndex.vue')
const reportIndex = () => import('@/view/report/reportIndex.vue')
const especiallyIndex = () => import('@/view/especially/especiallyIndex.vue')
// *登陆域注册 个人中心*/
const My = r => require.ensure([], () => r(require('@/view/tabbar/My.vue')), 'chunknameMy')
const moreInfo = r => require.ensure([], () => r(require('@/components/login/more-info.vue')), 'chunknamePerson')
const personalInfo = r => require.ensure([], () => r(require('@/components/login/personal-info.vue')), 'chunknamePerson')
const registerSuss = r => require.ensure([], () => r(require('@/components/login/registerSusscess.vue')), 'chunknamePerson')
const passwordSusscess = r => require.ensure([], () => r(require('@/components/login/passwordSusscess.vue')), 'chunknamePerson')
const number = r => require.ensure([], () => r(require('@/components/login/number.vue')), 'chunknamePerson')
const completeInfo = r => require.ensure([], () => r(require('@/components/login/completeInfo.vue')), 'chunknamePerson')
const login = r => require.ensure([], () => r(require('@/components/login/userlogin.vue')), 'chunknamePerson')
const forgetPass = r => require.ensure([], () => r(require('@/components/login/forgetPass.vue')), 'chunknamePerson')
const reset = r => require.ensure([], () => r(require('@/components/login/reset.vue')), 'chunknamePerson')
const manage = r => require.ensure([], () => r(require('@/components/login/manage.vue')), 'chunknamePerson')
const reviseInfo = r => require.ensure([], () => r(require('@/components/login/reviseInfo.vue')), 'chunknamePerson')
const revisePhone = r => require.ensure([], () => r(require('@/components/login/revisePhone.vue')), 'chunknamePerson')
const revisePassword = r => require.ensure([], () => r(require('@/components/login/revisePassword.vue')), 'chunknamePerson')
const loadPass = r => require.ensure([], () => r(require('@/components/login/loadPass.vue')), 'chunknamePerson')
const resetinfoPass = r => require.ensure([], () => r(require('@/components/login/resetinfoPass.vue')), 'chunknamePerson')
// * 微信统一授权 */
const wxRedirect = r => require.ensure([], () => r(require('@/components/login/wxRedirect.vue')), 'chunknamePerson')
// *足迹页面*/
const track = r => require.ensure([], () => r(require('@/components/duty/track.vue')), 'chunknamePerson')
// *我的权限速查表*/
const userTables = r => require.ensure([], () => r(require('@/components/lookupTables/userTables.vue')), 'chunknameTable')
const customerTables = r => require.ensure([], () => r(require('@/components/lookupTables/customerTables.vue')), 'chunknameTable')
const innerCustomerTables = r => require.ensure([], () => r(require('@/components/lookupTables/innerCustomerTables.vue')), 'chunknameTable')
const internalTables = r => require.ensure([], () => r(require('@/components/lookupTables/internalTables.vue')), 'chunknameTable')
const searchPower = r => require.ensure([], () => r(require('@/components/lookupTables/searchPower.vue')), 'chunknameTable')
const searchInner = r => require.ensure([], () => r(require('@/components/lookupTables/searchInner.vue')), 'chunknameTable')
// *收藏夹*/
const collect = r => require.ensure([], () => r(require('@/components/collect/collect.vue')), 'chunknameCollect')
const collectDetails = r => require.ensure([], () => r(require('@/components/collect/collectDetails.vue')), 'chunknameCollect')
const collectGrooms = r => require.ensure([], () => r(require('@/components/collect/collectGroom.vue')), 'chunknameCollect')
// *关注页面*/
const Focus = r => require.ensure([], () => r(require('@/components/duty/Focus.vue')), 'chunknameFocus')
const AddFocus = r => require.ensure([], () => r(require('@/components/duty/Addfocus.vue')), 'chunknameFocus')
// *小安指南*/
const brief = r => require.ensure([], () => r(require('../components/duty/brief.vue')), 'chunknameN')
const briefs = r => require.ensure([], () => r(require('../components/duty/briefFixed.vue')), 'chunknameN')
// 质押
const pledge = r => require.ensure([], () => r(require('../components/duty/pledge.vue')), 'chunknameN')
// *法规*/
const Law = r => require.ensure([], () => r(require('@/view/tabbar/Law.vue')), 'chunknameLawNew')
const newrules = r => require.ensure([], () => r(require('@/view/law/newRules.vue')), 'chunknameLaw')
const ruleslist = r => require.ensure([], () => r(require('@/view/law/rulesList.vue')), 'chunknameLaw')
const search = r => require.ensure([], () => r(require('@/view/law/search.vue')), 'chunknameLaw')
const rulesCount = r => require.ensure([], () => r(require('@/view/law/rulesCount.vue')), 'chunknameLaw')
const ads = r => require.ensure([], () => r(require('@/components/rules/ads.vue')), 'chunknameLaw')

// *小鹅通跳转*/
const application = r => require.ensure([], () => r(require('@/components/ticket/application.vue')), 'chunknameAffiche')
const applicationList = r => require.ensure([], () => r(require('@/components/ticket/applicationList.vue')), 'chunknameE')
const applicationImg = r => require.ensure([], () => r(require('@/components/ticket/applicationImg.vue')), 'chunknameE')
// *公告*/
const Affiche = r => require.ensure([], () => r(require('@/view/tabbar/Affiche.vue')), 'chunknameAffiche')
const Affpdf = r => require.ensure([], () => r(require('@/view/affiche/Affpdf.vue')), 'chunknameAffiche')
const newAffiche = r => require.ensure([], () => r(require('@/view/affiche/newaffiche.vue')), 'chunknameAffiche')
const searchList = r => require.ensure([], () => r(require('@/view/affiche/searchList.vue')), 'chunknameAffiche')
const afficheList = r => require.ensure([], () => r(require('@/view/affiche/afficheList.vue')), 'chunknameAffiche')
const afficheSearch = r => require.ensure([], () => r(require('@/view/affiche/afficheSearch.vue')), 'chunknameAffiche')
const afficheContent = r => require.ensure([], () => r(require('@/view/affiche/afficheContent.vue')), 'chunknameAffiche')
// 测评引入
const test = r => require.ensure([], () => r(require('@/view/testing/test.vue')), 'chunknamePersonTest')
const testing = r => require.ensure([], () => r(require('@/view/testing/testing.vue')), 'chunknamePerson')
const testPlate = r => require.ensure([], () => r(require('@/view/testing/testPlate.vue')), 'chunknameTest')
const testingList = r => require.ensure([], () => r(require('@/view/testing/testingList.vue')), 'chunknameTest')
const testLoading = r => require.ensure([], () => r(require('@/view/testing/testLoading.vue')), 'chunknameTest')
const testingEnd = r => require.ensure([], () => r(require('@/view/testing/testingEnd.vue')), 'chunknameTest')
const newTestPlate = r => require.ensure([], () => r(require('@/view/testing/newOTCBBTestPlate.vue')), 'chunknameTest')
const newOTCBBTestingEnd = r => require.ensure([], () => r(require('@/view/testing/newOTCBBTestingEnd.vue')), 'chunknameTest')
const newOTCBBTestingList = r => require.ensure([], () => r(require('@/view/testing/newOTCBBTestingList.vue')), 'chunknameTest')
const newOTCBBTestWrong = r => require.ensure([], () => r(require('@/view/testing/newOTCBBTestWrong.vue')), 'chunknameTest')
const newOTCBBTestWrongList = r => require.ensure([], () => r(require('@/view/testing/newOTCBBTestWrongList.vue')), 'chunknameTest')
const newOTCBBTestDescribe = r => require.ensure([], () => r(require('@/view/testing/newOTCBBTestDescribe.vue')), 'chunknameTest')
const newOTCBBTestCollect = r => require.ensure([], () => r(require('@/view/testing/newOTCBBTestCollect.vue')), 'chunknameTest')
// 问答详情
const answersDetails = r => require.ensure([], () => r(require('@/view/especially/answers/answersDetails.vue')), 'chunknameAsk')
// 小鹅通课后作业
const homework = r => require.ensure([], () => r(require('@/view/testing/homework.vue')), 'chunknameAsk')
const homeworkend = r => require.ensure([], () => r(require('@/view/testing/homeworkend.vue')), 'chunknameAsk')
// 测试显示效果展示 路演中组件
const rulesDemo1 = r => require.ensure([], () => r(require('@/view/especially/roadshowchina/roadShow.vue')), 'chunknameLyz')
const rulesDemo = r => require.ensure([], () => r(require('@/components/demo/rulesDemo.vue')), 'chunknameLyz')
// 研报
const report = r => require.ensure([], () => r(require('@/view/tabbar/report.vue')), 'chunknameyB')
const searchReport = r => require.ensure([], () => r(require('@/components/report/searchReport.vue')), 'chunknameyb')
const detailReport = r => require.ensure([], () => r(require('@/components/report/detailReport.vue')), 'chunknameyb')
const listReport = r => require.ensure([], () => r(require('@/components/report/listReport.vue')), 'chunknameyb')
const pdfReport = r => require.ensure([], () => r(require('@/components/dialog/pdfReport.vue')), 'chunknameyb')
// 舆情
const opinion = r => require.ensure([], () => r(require('@/components/opinion/opinion.vue')), 'chunknameYQ')
const supervise = r => require.ensure([], () => r(require('@/components/opinion/supervise.vue')), 'chunknameYQ')
const superviseList = r => require.ensure([], () => r(require('@/components/opinion/superviseList.vue')), 'chunknameYQ')
// 我的2017
const myYear = r => require.ensure([], () => r(require('@/view/especially/my2017/myYear.vue')), 'chunknamemyYear')

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/Law?MathTime=' + new Date().getTime(),
      component: appIndex,
      children: [{
        path: '/Law',
        name: 'Law',
        component: Law,
        meta: {
          title: '信公小安',
          tabName: 'law'
        }
      }, {
        path: "/ruleslist",
        name: 'ruleslist',
        component: ruleslist,
        meta: {
          title: "法规列表",
          tabName: 'law'
        }
      }, {
        path: '/newrules',
        name: 'newrules',
        component: newrules,
        meta: {
          title: '最新法规',
          tabName: 'law'
        }
      }, {
        path: '/affiche',
        name: 'Affiche',
        component: Affiche,
        meta: {
          title: '公告',
          tabName: 'affiche'
        }
      }, {
        path: "/searchList",
        name: 'searchList',
        component: searchList,
        meta: {
          title: "公告列表",
          tabName: 'affiche'
        }
      }, {
        path: "/afficheList",
        name: "afficheList",
        component: afficheList,
        meta: {
          title: "关注公司",
          tabName: 'affiche'
        }
      }, {
        path: "/my",
        name: 'My',
        component: My,
        meta: {
          title: '个人中心',
          tabName: 'my'
        }
      }, {
        path: "/report",
        name: 'report',
        component: report,
        meta: {
          title: '研报',
          tabName: 'report'
        }
      }
      ]
    },
    {
      path: "/testing",
      name: 'testing',
      component: test,
      children: [
        {
          path: "/testing",
          name: 'testing',
          component: testing,
          meta: {
            title: '我的测评'
          }
        }, {
          path: "/testPlate",
          name: 'testPlate',
          component: testPlate,
          meta: {
            title: '董秘测试'
          }
        }, {
          path: "/testingList",
          name: 'testingList',
          component: testingList,
          meta: {
            title: '董秘测试'
          }
        }, {
          path: "/testLoading",
          name: 'testLoading',
          component: testLoading,
          meta: {
            title: '董秘测试'
          }
        }, {
          path: "/testingEnd",
          name: 'testingEnd',
          component: testingEnd,
          meta: {
            title: '董秘测试'
          }
        }, {
          path: "/newOTCBBTestingEnd",
          name: 'newOTCBBTestingEnd',
          component: newOTCBBTestingEnd,
          meta: {
            title: '董秘测试'
          }
        }, {
          path: "/newOTCBBTestingList",
          name: 'newOTCBBTestingList',
          component: newOTCBBTestingList,
          meta: {
            title: '董秘测试'
          }
        }, {
          path: "/newOTCBBTestWrong",
          name: 'newOTCBBTestWrong',
          component: newOTCBBTestWrong,
          meta: {
            title: '错题'
          }
        }, {
          path: "/newOTCBBTestWrongList",
          name: 'newOTCBBTestWrongList',
          component: newOTCBBTestWrongList,
          meta: {
            title: '错题'
          }
        }, {
          path: "/newOTCBBTestDescribe",
          name: 'newOTCBBTestDescribe',
          component: newOTCBBTestDescribe,
          meta: {
            title: '付费简介'
          }
        }, {
          path: "/newOTCBBTestCollect",
          name: 'newOTCBBTestCollect',
          component: newOTCBBTestCollect,
          meta: {
            title: '付费简介'
          }
        }, {
          path: "/newTestPlate",
          name: 'newTestPlate',
          component: newTestPlate,
          meta: {
            title: '选择题数'
          }
        }
      ]
    },
    {
      path: "/myYear",
      name: 'myYear',
      component: myYear,
      meta: {
        title: "我在董办的2017",
        name: 'myYear'
      },
      children: []
    },
    {
      path: "/affiche",
      name: 'affiche',
      component: afficheIndex,
      children: [
        {
          path: "/afficheSearch",
          name: 'afficheSearch',
          component: afficheSearch,
          meta: {
            title: "公告搜索"
          }
        }, {
          path: '/afficheContent',
          name: 'afficheContent',
          component: afficheContent,
          meta: {
            title: '公告详情'
          }
        }, {
          path: '/Affpdf',
          name: 'Affpdf',
          component: Affpdf,
          meta: {
            title: '研报搜索'
          }
        }, {
          path: '/newAffiche',
          name: 'newAffiche',
          component: newAffiche,
          meta: {
            title: '关注公司最新公告'
          }
        }
      ]
    },
    {
      path: '/report',
      name: 'report',
      component: reportIndex,
      children: [
        {
          path: '/searchReport',
          name: 'searchReport',
          component: searchReport,
          meta: {
            title: '研报搜索'
          }
        }, {
          path: '/listReport',
          name: 'listReport',
          component: listReport,
          meta: {
            title: '研报列表'
          }
        }, {
          path: '/detailReport',
          name: 'detailReport',
          component: detailReport,
          meta: {
            title: '研报'
          }
        }, {
          path: '/pdfReport',
          name: 'pdfReport',
          component: pdfReport,
          meta: {
            title: '研报'
          }
        }
      ]
    },
    {
      path: '/',
      name: 'especially',
      component: especiallyIndex,
      children: [
        {
          path: '/application',
          name: 'application',
          component: application,
          meta: {
            title: '申请开票信息'
          }
        }, {
          path: '/applicationList',
          name: 'applicationList',
          component: applicationList,
          meta: {
            title: '开票信息'
          }
        }, {
          path: '/applicationImg',
          name: 'applicationImg',
          component: applicationImg,
          meta: {
            title: '凭证示范'
          }
        }, {
          path: '/ads',
          name: 'ads',
          component: ads,
          meta: {
            title: '精选'
          }
        }, {
          path: "/collect",
          name: 'collect',
          component: collect,
          meta: {
            title: "我的收藏"
          }
        }, {
          path: '/collect/collectDetails',
          name: 'collectDetails',
          component: collectDetails,
          meta: {
            title: '我的收藏夹'
          }
        }, {
          path: '/collectGroom',
          name: 'collectGroom',
          component: collectGrooms,
          meta: {title: '推荐收藏夹'}
        }, {
          path: '/briefs',
          name: 'briefs',
          component: briefs,
          meta: {title: '股权激励'}
        }, {
          path: '/pledge',
          name: 'pledge',
          component: pledge,
          meta: {title: '小安指南'}
        }, {
          path: "/focus",
          name: 'focus',
          component: Focus,
          meta: {title: "我的关注"}
        }, {
          path: "/Addfocus",
          name: 'Addfocus',
          component: AddFocus,
          meta: {title: "添加关注"}
        }, {
          path: "/track",
          name: 'track',
          component: track,
          meta: {
            title: "我的足迹"
          }
        }, {
          path: "/lookupTables",
          name: 'lookupTables',
          component: userTables,
          meta: {
            title: "权限速查"
          }
        }, {
          path: "/customerTables",
          name: 'customerTables',
          component: customerTables,
          meta: {
            title: "数据校准"
          }
        }, {
          path: "/innerCustomerTables",
          name: 'innerCustomerTables',
          component: innerCustomerTables,
          meta: {
            title: "数据校准"
          }
        }, {
          path: "/internalTables",
          name: 'internalTables',
          component: internalTables,
          meta: {
            title: "内部权限速查"
          }
        }, {
          path: "/searchPower",
          name: 'searchPower',
          component: searchPower,
          meta: {
            title: "权限速查"
          }
        }, {
          path: "/searchInner",
          name: 'searchInner',
          component: searchInner,
          meta: {
            title: "权限速查"
          }
        }, {
          path: "/homework",
          name: 'homework',
          component: homework,
          meta: {
            title: '小鹅通作业'
          }
        }, {
          path: "/homeworkend",
          name: 'homeworkend',
          component: homeworkend,
          meta: {
            title: '我的作业'
          }
        }, {     // 信公小安 问答模块
          path: '/answersDetails',
          name: 'answersDetails',
          component: answersDetails,
          meta: {
            title: '信公小安'
          }
        }, {   // 信公小安 路演中
          path: '/roadShow',
          name: 'rulesDemo1',
          component: rulesDemo1,
          meta: {
            title: '信公小安×路演中'
          }
        }, {   // 信公小安 路演中
          path: '/rulesDemo',
          name: 'rulesDemo',
          component: rulesDemo,
          meta: {
            title: '信公小安'
          }
        }, {   // 信公小安 路演中
          path: '/opinion',
          name: 'opinion',
          component: opinion,
          meta: {
            title: '舆情'
          }
        }, {   // 信公小安 路演中
          path: '/supervise',
          name: 'supervise',
          component: supervise,
          meta: {
            title: '舆情'
          }
        }, {   // 信公小安 路演中
          path: '/superviseList',
          name: 'superviseList',
          component: superviseList,
          meta: {
            title: '舆情'
          }
        }
      ]
    },
    {
      path: '/',
      name: 'law',
      component: lawIndex,
      children: [
        {
          path: "/search",
          name: 'search',
          component: search,
          meta: {
            title: "法规"
          }
        }, {
          path: "/rulesCount",
          name: 'rulesCount',
          component: rulesCount,
          meta: {
            title: "法规内容"
          }
        }
      ]
    },
    {
      path: '/',
      name: 'my',
      component: myIndex,
      children: [
        {
          path: '/brief',
          name: 'brief',
          component: brief,
          meta: {title: '小安指南'}
        }, {
          path: "/number",
          name: 'number',
          component: number,
          meta: {
            title: "完善个人信息"
          }
        }, {
          path: "/more-info",
          name: 'more-info',
          component: moreInfo,
          meta: {
            title: "完善个人信息"
          }
        }, {
          path: "/personal-info",
          name: 'personal-info',
          component: personalInfo,
          meta: {
            title: "完善个人信息"
          }
        }, {
          path: "/register",
          name: 'register',
          component: registerSuss,
          meta: {
            title: "注册成功"
          }
        }, {
          path: "/completeInfo",
          name: 'completeInfo',
          component: completeInfo,
          meta: {
            title: "完善个人信息"
          }
        }, {
          path: "/login",
          name: "login",
          component: login,
          meta: {
            title: "完善个人信息"
          }
        }, {
          path: "/forgetPass",
          name: "forgetPass",
          component: forgetPass,
          meta: {
            title: "找回密码"
          }
        }, {
          path: "/reset",
          name: "reset",
          component: reset,
          meta: {
            title: "找回密码"
          }
        }, {
          path: "/passwordSusscess",
          name: "resetPassSusscess",
          component: passwordSusscess,
          meta: {
            title: "找回密码"
          }
        }, {
          path: "/manage",
          name: "manage",
          component: manage,
          meta: {
            title: "账号管理"
          }
        }, {
          path: "/manage/reviseInfo",
          name: "reviseInfo",
          component: reviseInfo,
          meta: {
            title: "修改个人信息"
          }
        }, {
          path: "/manage/revisePhone",
          name: "revisePhone",
          component: revisePhone,
          meta: {
            title: "修改绑定手机"
          }
        }, {
          path: "/manage/revisePassword",
          name: "revisePassword",
          component: revisePassword,
          meta: {
            title: "修改登录密码"
          }
        }, {
          path: "/loadPass",
          name: "loadPass",
          component: loadPass,
          meta: {
            title: "登录成功"
          }
        }, {
          path: "/resetinfoPass",
          name: "resetinfoPass",
          component: resetinfoPass,
          meta: {
            title: "修改信息成功"
          }
        }, {
          path: "/wxRedirect",
          name: "wxRedirect",
          component: wxRedirect,
          meta: {
            title: "微信授权登陆"
          }
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router
