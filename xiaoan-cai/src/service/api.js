const protocol = document.location.protocol == 'https:' ? 'https:' : 'http:'
const HOSTS = {
  development: {
    domain: protocol + '//test.in-hope.com.cn/v1/'
  },
  testing: {
    domain: protocol + '//test.in-hope.com.cn/v1/'
  },
  pre: {
    domain: protocol + '//api.in-hope.com.cn/v1/'
  },
  production: {
    domain: protocol + '//test.in-hope.com.cn/v1/'
  }
}
const currentIp = protocol + '//test.in-hope.com.cn/'
const HOST = HOSTS[process.env.NODE_ENV]

export default {
  user: {
    login: HOST.domain + 'passport/login',
    reg: HOST.domain + 'reg',
    imageCode: HOST.domain + 'usercode/getimagecodedesktop',
    imgcodecheck: HOST.domain + 'usercode/imgcodecheckdesktop',
    getMyInfo: HOST.domain + 'user/userhomedesktop', // 获取用户信息
    getMyCollect: HOST.domain + 'favourite/getfavourite' // 获取用户收藏夹信息
  },
  rule: {
    autoComplete: HOST.domain + 'law/autoComplete',
    getalllmappingrules: HOST.domain + 'lawsearch/getallmappingrules',
    getHotSearch: HOST.domain + 'getHotSearch',
    getDetails: HOST.domain + 'law/getDetails',
    lawSearch: HOST.domain + "law/search"
  },
  affiche: {
    autoComplete: HOST.domain + 'common/autoComplete',
    hotSearch: HOST.domain + 'announcesearch/gethotsearch', // 公告热门搜索
    afficheSearch: HOST.domain + 'announcesearch/search', // 公告查询
    afficheContent: HOST.domain + '/announcedetail/getdetails', // 公告详情
    pdfLink: currentIp
  },
  cases: {}
  /**
   * window api 获取数据
   * */

}
