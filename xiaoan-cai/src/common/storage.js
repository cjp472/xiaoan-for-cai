export default {
  localStorage: {
    // 建议name 完全用大写字母
    set(name, value) {
      let newVal = value;
      let val = typeof newVal;
      if (newVal != null && val == 'Object') {
        newVal = window.JSON.stringify(value);
      }
      // console.log('===========', typeof value);
      // window.JSON.stringify 为字符串
      window.localStorage.setItem(name, newVal);
    },
    get(name) {
      if (window.localStorage.getItem(name)) {
        return (window.JSON.parse(window.localStorage.getItem(name)));
      } else {
        return false
      }
    },
    del(name) {
      window.localStorage.removeItem(name);
      return true
    }
  },
  unique(arr) {
    // 数组去重
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
  /**
   * status 默认 false
   **/
  // 去除空数组
  ImpArr(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "" || typeof (array[i]) === "undefined") {
        array.splice(i, 1);
        i = i - 1;
      }
    }
  },
  // 存入localStorage //key==value==排序 value是数组【["","",""]】
  localStorageSystem(storageName, storageValue) {
    window.localStorage.removeItem(storageName); // 先清空数据

    let storageArray = window.JSON.stringify(storageValue);
    console.log('23423432', storageArray);
    window.localStorage.setItem(storageName, storageArray);
  },
  //
  localStorageAll(storageName) {
    let read = [];
    if (window.localStorage.getItem(storageName) === null) {
      // 没有localStorage的情况
      read = [];
    } else {
      read = window.JSON.parse(window.localStorage.getItem(storageName)); // 读取数组
    }
    return read
  },
  localStorageRemove(array) {
    for (let i in array) {
      window.localStorage.removeItem(array[i]);
    }
  },
  // 存入sessionStorage //key==value==排序
  sessionStorageSystem(storageName, storageContent, status) {
    if (window.sessionStorage.getItem(storageName) !== null) {
      let read = window.JSON.parse(window.sessionStorage.getItem(storageName)); // 读取数组
      status ? read.unshift(storageContent) : read.push(storageContent);
      window.sessionStorage.setItem(storageName, window.JSON.stringify(read)); // 存入sessionStorage
    } else {
      window.sessionStorage.setItem(storageName, window.JSON.stringify([storageContent]));
    }
  },
  sessionStorageAll(storageName) {
    let read = [];
    if (window.sessionStorage.getItem(storageName) === null) {
      // 没有localStorage的情况
      read = [];
    } else {
      read = window.JSON.parse(window.sessionStorage.getItem(storageName)); // 读取数组
    }
    return read
  },
  // 鉴定是否注册登陆 保存sessionStorage
  loginStatus(that, title, url, goTo) {
    goTo = goTo ? goTo : "number";
    window.sessionStorage.setItem("refer_title", title);
    window.sessionStorage.setItem("refer_url", url);
    setTimeout(() => {
      that.$router.replace({path: "/" + goTo, query: {MathTime: global.timestamp}});
    })
  }
}
