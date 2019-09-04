import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import { ipcRenderer } from 'electron'
import groupby from 'lodash.groupby'

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
    // 扫描结果 扁平化
    SCAN_RESULT_FLAT: []
  },
  getters: {
    // 文件类型统计
    SCAN_RESULT_STATISTIC_EXT: state => {
      const grouped = groupby(state.SCAN_RESULT_FLAT, 'data.filePathFullParsed.ext')
      let result = []
      for (const key in grouped) {
        if (grouped.hasOwnProperty(key)) {
          const group = grouped[key]
          result.push({
            ext: key,
            value: group.length
          })
        }
      }
      return result
    }
  },
  mutations: {
    // 数据更新 [ 目标文件夹地址 ]
    SCAN_FOLDER_PATH_UPDATE (state, data) {
      state.SCAN_FOLDER_PATH = data
    },
    // 数据更新 [ 扫描结果 ]
    SCAN_RESULT_UPDATE (state, data) {
      state.SCAN_RESULT = data
    },
    // 数据更新 [ 扫描结果 扁平化 ]
    SCAN_RESULT_FLAT_UPDATE (state, data) {
      state.SCAN_RESULT_FLAT = data
    },
    // 数据更新 [ 扫描结果 扁平化 一项 ]
    SCAN_RESULT_FLAT_UPDATE_ITEM (state, { index, item }) {
      state.SCAN_RESULT_FLAT.splice(index, 1, item)
    },
    // ELECTRON IPC [ 发送扫描文件夹请求 ]
    IPC_DIR_SCAN (state) {
      ipcRenderer.send('IPC_DIR_SCAN', {
        folderPath: state.SCAN_FOLDER_PATH
      })
    },
    // ELECTRON IPC [ 通过文件选择窗口选择一个文件夹 ]
    IPC_DIR_SELECT () {
      ipcRenderer.send('IPC_DIR_SELECT')
    },
    // ELECTRON IPC [ 导出文件 ]
    IPC_EXPORT (state, { name, value }) {
      ipcRenderer.send('IPC_EXPORT', {
        name,
        value
      })
    }
  }
})
