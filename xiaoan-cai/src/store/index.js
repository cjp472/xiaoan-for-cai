// 文件都会汇聚到这个地方来,也是创建store对象的地方,就像store的入口一样
import Vue from 'vue';
import VueX from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './rootState';
Vue.use(VueX);
const store = new VueX.Store({
  state, // 存放状态
  getters, // 从state中派生出状态，比如将state中的某个状态进行 过滤 然后获取新的状态
  actions, // mutations的加强版 通过提交的mutations中的方法来改变状态，异步操作
  mutations // 存放如何更改状态
});
export default store
