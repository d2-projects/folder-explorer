import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    persistedState()
  ],
  state: {
    // 扫描的文件夹地址
    SCAN_FOLDER_PATH: '',
    // 扫描结果
    SCAN_RESULT: [],
    // 设置
    SETTING: {
      // 通用
      PUBLIC: {}
    }
  },
  mutations: {
    // 更新 [ 扫描的文件夹地址 ]
    SCAN_FOLDER_PATH_UPDATE (state, data) {
      state.SCAN_FOLDER_PATH = data
    },
    // 更新 [ 扫描结果 ]
    SCAN_RESULT_UPDATE (state, data) {
      state.SCAN_RESULT = data
    }
  }
})
