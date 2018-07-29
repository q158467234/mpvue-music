import * as types from './mutation-types'
const mutations = {
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SAVE_DISCLIST] (state, discList) {
    state.discList = discList
  },
  [types.SAVE_SONGLIST] (state, list) {
    Object.assign(state.data, list);
  },
  [types.SAVE_RADIOLIST] (state, radioList) {
    state.radioList = radioList
  },
  [types.SAVE_SIDERLIST] (state, sider) {
    state.siderList = sider
  },
  [types.SAVE_SONG] (state, song) {
    Object.assign(state.song, song);
  }
}

export default mutations
