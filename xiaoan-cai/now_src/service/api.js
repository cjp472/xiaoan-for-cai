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
const HOST = HOSTS[process.env.NODE_ENV].domain

export default {
  user: {
    login: HOST + 'passport/login',
    reg: HOST + 'reg',
    imageCode: HOST + 'usercode/getimagecodedesktop',
    imgcodecheck: HOST + 'usercode/imgcodecheckdesktop',
    getMyInfo: HOST + 'user/userhomedesktop', // 获取用户信息
    getMyCollect: HOST + 'favourite/getfavourite' // 获取用户收藏夹信息
  },
  rule: {
    autoComplete: HOST + 'law/autoComplete',
    getalllmappingrules: HOST + 'lawsearch/getallmappingrules',
    getHotSearch: HOST + 'getHotSearch',
    getDetails: HOST + 'law/getDetails',
    lawSearch: HOST + "law/search"
  },
  affiche: {
    autoComplete: HOST + 'common/autoComplete',
    hotSearch: HOST + 'announcesearch/gethotsearch', // 公告热门搜索
    afficheSearch: HOST + 'announcesearch/search', // 公告查询
    afficheContent: HOST + '/announcedetail/getdetails', // 公告详情
    pdfLink: currentIp
  },
  cases: {}
  /**
   * window api 获取数据
   * */

}
