// 一个大神的做法创建rootState.js保存顶层的数据

function aaa() {
  return ["111", "11111", "2222"]
}

const state = {
  msg: '我是原始数据', //
  app: aaa()
};

export default state;
