// //////////
// 数据处理==>"数组"
//
export default {
  // //数组去重
  unique: function (arr) {
    let result = [];
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (!obj.hasOwnProperty(arr[i])) {
        result.push(arr[i]);
        obj[arr[i]] = 0;
      }
    }
    return result
  },
  // 去除空数组
  ImpArr: function (array) {
    let arr = array;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "" || typeof (arr[i]) === "undefined") {
        arr.splice(i, 1);
        i = i - 1;
      }
    }
    return arr
  },
  // 删除array指定下标下的元素
  closeArr(array, index) {
    if (isNaN(index) || index >= array.length) {
      return false;
    }
    for (let i = 0, n = 0; i < array.length; i++) {
      if (array[i] !== array[index]) {
        array[n++] = array[i];//
      }
    }
    array.length -= 1;

    return array;
  },
  // 删除左右两端的空格
  trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  // 删除左边的空格
  ltrim(str) {
    return str.replace(/(^\s*)/g, "");
  },
  // 删除右边的空格
  rtrim(str) {
    return str.replace(/(\s*$)/g, "");
  },
  // 处理获取到的数据 实现上拉加载
  loadMore(arr, contents) {
    let array = arr, content = contents;

    /**
     * 判断一个对象是否是数组，参数不是对象或者不是数组，返回false
     * @param {Object} arg 需要测试是否为数组的对象
     * @return {Boolean} 传入参数是数组返回true，否则返回false
     * contentsw为获取到的数据
     * arr为原数据
     */
    function isArray(arg) {
      if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) == '[object Array]';
      }
      return false;
    }

    if (isArray(array) && isArray(content)) {
      if (array.length > 0 && content !== null) {
        for (let i in content) {
          array.push(content[i]);
        }
      } else if (array.length === 0 && content !== null) {
        array = content;
      } else {
        array = [];
      }
    }
    // 控制下拉刷新
    return (array)
  },
  // 根据总条数 判断有多少页
  totalPage: function (arr, content) {
    let array = arr, number = content, page = '';
    array = Number(array);
    number = Number(number);
    page = Number(page);
    if (array % number > 0) {
      page = (array / number) + 1;
    } else {
      page = array / number;
    }
    return parseInt(page)
  },
  //
  // 高亮显示
  key(value, str) {
    let star = [];
    star = value.split(" ");
    for (let i = 0; i < star.length; i++) {
      if (star[i] == "" || typeof (star[i]) == "undefined" || star[i] == 0 || star[i] == 1 || star[i] == 2 || star[i] == 3 || star[i] == 4 || star[i] == 5 || star[i] == 6 || star[i] == 7 || star[i] == 8 || star[i] == 9) {
        star.splice(i, 1);
        i = i - 1;
      }
    }
    /* console.log("432453", star); */
    for (let i = 0; i < star.length; i++) {
      let fen = str.split(star[i]);
      str = fen.join('<span style="color:#ffc051;">' + star[i] + '</span>');
    }
    return str;
  }
}
