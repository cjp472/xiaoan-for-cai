// 存放vuex的核心处理函数
export const fun = ({commit}) => {
  commit({
    type: 'getMsg',     // 对应mutation.js中的getMsg方法
    msg: '我是修改后的数据...'
  });
}
/*************************************/
export const date = ({commit}) => {
  function aaa() {
    return {'id': '1', name: '111'};
  }
  commit({
    type: 'getApp',     // 对应mutation.js中的getApp方法
    app: aaa()   /// 对应修改的值
  });
}
