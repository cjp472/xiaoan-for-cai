// 改版store中各种状态的地方
export const getMsg = (state, payload) => {
  state.msg = payload.msg;
  console.log(state, payload);
}
export const getApp = (state, payload) => {

  function bbb() {
    return {"111": "111", "11111": "22323"}
  }

 // state.app = bbb();   //state 表示暴露的rootState 初始数据  payLoad为actions 变化后的值
  state.app = payload.app;   // state 表示暴露的rootState 初始数据  payLoad为actions 变化后的值

  // console.log(state, payload);
}
