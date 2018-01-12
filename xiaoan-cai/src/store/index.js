/**
 * Created by Administrator on 2017/12/29.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mutations
  },
  actions
});
