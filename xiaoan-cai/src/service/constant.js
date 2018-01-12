/*
* todo
* */
export default {
  /* *************处理时间戳****************/
  add0: function (m) {
    return m < 10 ? '0' + m : m
  },
  // 提示'-'显示
  format: function (shijianchuo) {
    if (shijianchuo == null || shijianchuo == "") {
      let date = "";
      return date
    } else {
      // console.log("shijianchuo", shijianchuo);
      // shijianchuo是整数，否则要parseInt转换
      let time = new Date(parseInt(shijianchuo));
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let date = y + '-' + this.add0(m) + '-' + this.add0(d);
      return date
    }
  },
  // 时分秒
  formatS(shijianchuo) {
    if (shijianchuo == null || shijianchuo == "") {
      let date = "";
      return date
    } else {
      // shijianchuo是整数，否则要parseInt转换
      let time = new Date(shijianchuo);
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      return this.add0(h) + ':' + this.add0(mm) + "'" + this.add0(s) + "s";
    }
  },
  // 秒 转 时分秒
  formatSeconds(value) {
    if (value == null || value == "") {
      let date = "";
      return date
    } else {
      let theTime = parseInt(value);// 秒
      let theTime1 = 0;// 分
      let theTime2 = 0;// 小时
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
        }
      }
      let result = "" + parseInt(theTime) + "s";
      if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "'" + result;
      }
      if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "时" + result;
      }
      return result;
    }
  },
  // 文本年月日显示
  formatText: function (shijianchuo) {
    if (shijianchuo == null || shijianchuo == "") {
      let date = "";
      return date
    } else {
      // console.log("shijianchuo", shijianchuo);
      // shijianchuo是整数，否则要parseInt转换
      let time = new Date(parseInt(shijianchuo));
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let date = y + '年' + this.add0(m) + '月' + this.add0(d) + '日';
      return date
    }
  },
  // 时间-->距离之前时间
  getBeforeDate: function (an) {
    let n = parseInt(an);
    let d = new Date();
    let year = d.getFullYear();
    let mon = d.getMonth() + 1;
    let day = d.getDate();
    if (day <= n) {
      if (mon > 1) {
        mon = mon - 1;
      } else {
        year = year - 1;
        mon = 12;
      }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
  },
  // 当前时间
  getNewDate: function () {
    let date = new Date();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + "-" + month + "-" + strDate;
    return currentdate;
  },
  // 日期换算成时间戳
  getTimestamp: function (date) {
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    return (date.getTime());
  },
  // 年月日转“-”
  transFormat: function (str) {
    let result = /^(\d+)年(\d+)月(\d+)日$/.exec(str);
    if (result) {
      let y = result[1];
      let m = result[2];
      let d = result[3];
      m = Number(m) < 10 ? '0' + m : m;
      d = Number(d) < 10 ? '0' + d : d;
      return y + '-' + m + '-' + d;
    } else {
      return null
    }
  },
  /******************************/
  // 安卓机聚焦时键盘上顶以及聚焦定位
  /* 需要给body上添加《《》》 */
  /* $(document).ready(function () {
      $('body').height($('body')[0].clientHeight);
    }); */
  /*  */
  // androidTop: function (id) {
  //   let u = navigator.userAgent, app = navigator.appVersion;
  //   let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
  //   let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  //   // console.log('是否是iOS：', isiOS, '是否是Android：', isAndroid);
  //   if (isAndroid == true) {
  //     let totId = document.getElementById(id);
  //     let aa = totId.offset().top;
  //     let bodyH = document.body.clientHeight;
  //     bodyH = parseInt((bodyH / 4) - 20);
  //     $("body").animate({scrollTop: aa - bodyH}, 550);
  //   }
  // },
  //
  chkstrlen(str) {
    let strlen = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        // 如果是汉字，则字符串长度加2
        strlen += 2;
      } else {
        strlen++;
      }
    }
    return strlen;
  },
  /*
  * todo
  * */
  // 判断访问终端
  userAgent: function () {
    // 判断访问终端
    let u = navigator.userAgent; // app = navigator.appVersion;
    let app = {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') == -1, // 是否web应用程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq", // 是否QQ
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    return (app)
  },
  getQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return unescape(r[2]);
    }
    return null;
  }
}
