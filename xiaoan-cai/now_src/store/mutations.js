/**
 * Created by Administrator on 2017/12/29.
 */
import * as types from './types'
import getters from './getters'
const state = {
  isLoading: false,
  direction: 'forward',
  isHomeShow: false
};

const mutations = {
  [types.UPDATE_LOADING](state, payload) {
    state.isLoading = payload.isLoading
  },
  [types.UPDATE_DIRECTION](state, payload) {
    state.direction = payload.direction
  },
  [types.UPDATE_HOMESHOW](state, payload) {
    state.isHomeShow = payload.isHomeShow
  }
};

export default {
  state,
  mutations,
  getters
}
