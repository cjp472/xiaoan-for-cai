let protocol = document.location.protocol == 'https:' ? 'https:' : 'http:'
let wxAuthUr = protocol + '//open.weixin.qq.com/connect/oauth2/authorize?appid={appid}&redirect_uri={redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
let host = '', appid = '', currentIp = '';
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') { // 本地环境，测试环境
  host = protocol + '//test.in-hope.com.cn/v1/';
  appid = 'wx3313bba3a77541ef'; // api.in-hope.com.cn appid
  currentIp = protocol + "//test.in-hope.com.cn/";
} else if (process.env.NODE_ENV === 'pre') {  // 预发布环境
  host = protocol + '//api.in-hope.com.cn/v1/';
  appid = 'wx6c38960bcacb7a79'; // api.in-hope.com.cn appid
  currentIp = protocol + "//api.in-hope.com.cn/";
} else if (process.env.NODE_ENV === 'product') {  // 线上环境
  host = protocol + '//xiaoan.api.in-hope.cn/v1/';
  appid = 'wx006d673ce5a4a44b'; // xiao.in-hope.cn appId
  currentIp = protocol + "//xiaoan.h5.in-hope.cn/";
}
// 通用地址
let redirect_uri = encodeURI(host + 'wxRedirect/STATE')
// var redirect_uri = encodeURIComponent(let currentIp + '#/wxRedirect')
let redirect_uriLaw = encodeURI(host + 'getwxoauth')
let wixAccredit = wxAuthUr.replace('{appid}', appid).replace('{redirect_uri}', redirect_uri)
let wixAccredit2 = wxAuthUr.replace('{appid}', appid).replace('{redirect_uri}', redirect_uri.replace('STATE', 'SUBSCRIBE'))
let wixAccreditLaw = wxAuthUr.replace('{appid}', appid).replace('{redirect_uri}', redirect_uriLaw).replace('snsapi_userinfo', 'snsapi_base,snsapi_userinfo')

// 域名切换 http://oss.in-hope.cn
let shareImg1 = "http://oss.in-hope.cn/xiaoan/shareRulesContent.jpg"; // 法规公告分享图片
let shareImg2 = "http://oss.in-hope.cn/xiaoan/20170628162356.jpg"; // 测评分享图片
let shareImg3 = "http://oss.in-hope.cn/image/1441513133897_.pic.jpg"; // 董办2017 分享图片
let xiaoetongUrl = 'https://h5.xiaoeknow.com/appe8O3plIM2665/homepage';
let timestamp = Math.random();
let version = 'V1.1.1';

export default {
  host: host,
  wixAccredit: wixAccredit,
  wixAccredit2: wixAccredit2,
  appid: appid,
  shareImg1: shareImg1,
  shareImg2: shareImg2,
  timestamp: timestamp,
  currentIp: currentIp,
  xiaoetongUrl: xiaoetongUrl,
  version: version
}
