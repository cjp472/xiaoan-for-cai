//
export default {
  // 获取一级域名
  parseDomain(str) {
    if (!str) return '';
    if (str.indexOf('://') != -1) str = str.substr(str.indexOf('://') + 3);
    let topLevel = ['com', 'net', 'org', 'gov', 'edu', 'mil', 'biz', 'name', 'info', 'mobi', 'pro', 'travel', 'museum', 'int', 'areo', 'post', 'rec'];
    let domains = str.split('.');
    if (domains.length <= 1) return str;
    if (!isNaN(domains[domains.length - 1])) return str;
    let i = 0;
    while (i < topLevel.length && topLevel[i] != domains[domains.length - 1]) i++;
    if (i != topLevel.length) return domains[domains.length - 2] + '.' + domains[domains.length - 1];
    else {
      i = 0;
      while (i < topLevel.length && topLevel[i] != domains[domains.length - 2]) i++;
      if (i == topLevel.length) return domains[domains.length - 2] + '.' + domains[domains.length - 1];
      else return domains[domains.length - 3] + '.' + domains[domains.length - 2] + '.' + domains[domains.length - 1];
    }
  },
  // *设置cookie*/
  set(name, value, days) {
    let domain = this.parseDomain(document.domain);
    // console.log('这里的domain是一级域名', domain);
    let d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    window.document.cookie = name + "=" + value + ";path=/;domain=" + domain + ";expires=" + d.toGMTString();
  },
  // *读取cookie*/
  get(name) {
    let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : "";
  },
  // *清空Cookie*/
  delete(name) {
    this.setCookie(name, '', -1);
  },
  // *清空所有的cookie*/
  clear() {
    let keys = window.document.cookie.match(/[^ =;]+(?=\=)/g);
    let domain = this.parseDomain(document.domain);
    if (keys) {
      for (let i = keys.length; i--;) {
        window.document.cookie = keys[i] + '=0;domain=' + domain + ';expires=' + new Date(0).toUTCString();
      }
    }
  },
  isLogin() {
    let name = 'userId';
    if (this.get(name)) {
      return true
    }
    return false
  }
}
