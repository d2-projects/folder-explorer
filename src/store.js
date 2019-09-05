import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import { ipcRenderer } from 'electron'
import groupby from 'lodash.groupby'
import set from 'lodash.set'

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
    SCAN_RESULT_FLAT: [],
    // 设置
    SETTING: {
      // 扫描相关
      SCAN: {
        // 忽略的文件夹
        IGNORE_PATH: [
          '.git',
          '.DS_Store',
          'node_modules',
          '/dist'
        ],
        // 忽略的文件类型
        IGNORE_EXT: [
          '.md'
        ],
        // 扫描深度 0 为没有限制
        DEEP: 0
      }
    }
  },
  getters: {
    /**
     * 文件类型统计
     */
    SCAN_RESULT_STATISTIC_EXT: state => {
      const grouped = groupby(state.SCAN_RESULT_FLAT, 'data.filePathFullParsed.ext')
      let result = []
      for (const key in grouped) {
        if (key !== '' && grouped.hasOwnProperty(key)) {
          result.push({
            name: key.replace(/^./, ''),
            value: grouped[key].length
          })
        }
      }
      return result
    },
    /**
     * 设置建议选项 [ 忽略的文件夹路径 ]
     */
    SETTING_SCAN_IGNORE_PATH_OPTIONS: state => {
      let result = []
      function isFolderAndPush (itemArray, level = 1) {
        if (level > 3) {
          return
        }
        for (const item of itemArray) {
          if (item.stat.isDirectory) {
            result.push(item.filePath)
            isFolderAndPush(item.children, level + 1)
          }
        }
      }
      isFolderAndPush(state.SCAN_RESULT)
      return result
    },
    /**
     * 设置建议选项 [ 忽略的文件类型 ]
     */
    SETTING_SCAN_IGNORE_EXT_OPTIONS: state => {
      const grouped = groupby(state.SCAN_RESULT_FLAT, 'data.filePathFullParsed.ext')
      return Object.keys(grouped)
    }
  },
  mutations: {
    /**
     * 数据更新 [ 设置 ]
     */
    SETTING_UPDATE (state, { path, value }) {
      state.SETTING = set(state.SETTING, path, value)
    },
    /**
     * 数据更新 [ 目标文件夹地址 ]
     */
    SCAN_FOLDER_PATH_UPDATE (state, data) {
      state.SCAN_FOLDER_PATH = data
    },
    /**
     * 数据更新 [ 扫描结果 ]
     */
    SCAN_RESULT_UPDATE (state, data) {
      state.SCAN_RESULT = data
    },
    /**
     * 数据更新 [ 扫描结果 扁平化 ]
     */
    SCAN_RESULT_FLAT_UPDATE (state, data) {
      state.SCAN_RESULT_FLAT = data
    },
    /**
     * 数据更新 [ 扫描结果 扁平化 一项 ]
     */
    SCAN_RESULT_FLAT_UPDATE_ITEM (state, { index, item }) {
      state.SCAN_RESULT_FLAT.splice(index, 1, item)
    },
    /**
     * ELECTRON IPC [ 发送扫描文件夹请求 ]
     */
    IPC_FOLDER_SCAN (state) {
      ipcRenderer.send('IPC_FOLDER_SCAN', {
        folderPath: state.SCAN_FOLDER_PATH,
        ignorePath: state.SETTING.SCAN.IGNORE_PATH,
        ignoreExt: state.SETTING.SCAN.IGNORE_EXT,
        deep: state.SETTING.SCAN.DEEP
      })
    },
    /**
     * ELECTRON IPC [ 通过文件选择窗口选择一个文件夹 ]
     */
    IPC_FOLDER_SELECT () {
      ipcRenderer.send('IPC_FOLDER_SELECT')
    },
    /**
     * ELECTRON IPC [ 导出文件 ]
     */
    IPC_EXPORT (state, { name, value }) {
      ipcRenderer.send('IPC_EXPORT', {
        name,
        value
      })
    }
  }
})
