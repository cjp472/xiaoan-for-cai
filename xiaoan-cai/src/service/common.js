/*
* todo
* describe: common javascript file
* ldk || cwd || zyl
* */
export default {
  /* 高亮 input的value, 文本text */
  highlight (value, content) {
    return content.replace(value, '<highlight style="color: #FFB148">' + value + '</highlight>')
  },
  /* 根据总数获取页数 */
  totalPage: function (pages, pageTolo) {
    let pageSize = pages, number = pageTolo, page = ''
    pageSize = Number(pageSize)
    number = Number(number)
    page = Number(page)
    if (pageSize % number > 0) {
      page = (pageSize / number) + 1
    } else {
      page = pageSize / number
    }
    return parseInt(page)
  },
  /* 取字符串十位 */
  subString (value) {
    if (value.length >= 10) {
      value = value.substring(0, 10) + '...'
    }
    return value
  },
  /* 处理时间戳 */
  add0: function (m) {
    return m < 10 ? '0' + m : m
  },
  /* 文本年月日显示 */
  transTime: function (shijianchuo) {
    if (shijianchuo == null || shijianchuo == '') {
      let date = ''
      return date
    } else {
      // shijianchuo是整数，否则要parseInt转换
      let time = new Date(parseInt(shijianchuo))
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      let date = y + '年' + this.add0(m) + '月' + this.add0(d) + '日'
      let date1 = y + '-' + this.add0(m) + '-' + this.add0(d)
      return ([date, date1])
    }
  },
  /* 去除空元素 */
  ImpArr: function (array) {
    let arr = array
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '' || typeof (arr[i]) === 'undefined') {
        arr.splice(i, 1)
        i = i - 1
      }
    }
    return (arr)
  },
  // 唯一标识uuid
  uuid: function () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  },
  /* 返回顶部 */
  returnTop () {
    var timer = setInterval(function () { // 设置一个计时器
      var ct = document.documentElement.scrollTop || document.body.scrollTop // 获取距离顶部的距离
      ct -= 50
      if (ct > 0) { // 如果与顶部的距离大于零
        window.scrollTo(0, ct)// 向上移动50px
      } else { // 如果距离小于等于零
        window.scrollTo(0, 0)// 移动到顶部
        clearInterval(timer)// 清除计时器
      }
    }, 10)
  },
  /* 获取当前时间（年月日） */
  getNowDate () {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var str = year + '-' + month + '-' + day
    return str
  },
  /* 获取前一周时间 （年月日） */
  getLastDate () {
    var now = new Date()
    var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var str = year + '-' + month + '-' + day
    return str
  }
}
