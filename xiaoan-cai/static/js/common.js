//
// if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
//   window.applicationCache.update();
// }
// console.log(window.applicationCache);
// js
var _mtac = {};
(function () {
  var mta = document.createElement("script");
  mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
  mta.setAttribute("name", "MTAH5");
  mta.setAttribute("sid", "500478892");
  mta.setAttribute("cid", "500478902");
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(mta, s);
})();

// //////////////////////////////////
// //////////////////////////////////

var _vds = _vds || [];
window._vds = _vds;
(function () {
  _vds.push(['setAccountId', '9c9efd6cce607f91']);
  (function () {
    var vds = document.createElement('script');
    vds.type = 'text/javascript';
    vds.async = true;
    vds.src = (document.location.protocol == 'https:' ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(vds, s);
  })();
})();
