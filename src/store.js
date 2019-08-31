import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import { ipcRenderer } from 'electron'
import { notify } from './plugin/vue.notify'

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
    // 更新 [ 目标文件夹地址 ]
    SCAN_FOLDER_PATH_UPDATE (state, data) {
      state.SCAN_FOLDER_PATH = data
    },
    // 更新 [ 扫描结果 ]
    SCAN_RESULT_UPDATE (state, data) {
      state.SCAN_RESULT = data
    },
    // IPC [ 发送扫描文件夹请求 ]
    IPC_DIR_SCAN (state) {
      ipcRenderer.send('IPC_DIR_SCAN', {
        folderPath: state.SCAN_FOLDER_PATH
      })
    },
    // IPC [ 通过文件选择窗口选择一个文件夹 ]
    IPC_DIR_SELECT () {
      ipcRenderer.send('IPC_DIR_SELECT')
    }
  }
})
