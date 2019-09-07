import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import { ipcRenderer } from 'electron'
import groupby from 'lodash.groupby'
import set from 'lodash.set'

Vue.use(Vuex)

const stateDefault = {
  // 扫描的文件夹地址
  SCAN_FOLDER_PATH: '',
  // 扫描结果
  SCAN_RESULT: [],
  // 扫描结果 扁平化
  SCAN_RESULT_FLAT: [],
  // 设置
  SETTING: {
    // 通用
    APP: {
      // 在导出之后打开文件
      OPEN_AFTER_EXPORT: true,
      // 在导出之后打开文件位置
      OPEN_FOLDER_AFTER_EXPORT: false,
      // 删除文件前确认
      DELETE_CONFIRM: true
    },
    // 导出相关的设置
    EXPORT: {
      TREE_TEXT: {
        FILE_NAME: 'FolderExplorerExport'
      },
      TREE_JSON: {
        FILE_NAME: 'FolderExplorerExport'
      }
    },
    // 扫描相关
    SCAN: {
      // 忽略的文件夹
      IGNORE_PATH: [ '.git', '.DS_Store', 'node_modules', '/dist' ],
      // 忽略的文件类型
      IGNORE_EXT: [ '.md' ],
      // 忽略文件
      IGNORE_FILE: false,
      // 忽略点开头的文件
      IGNORE_DOT_START_FILE: false,
      // 忽略点开头的文件夹
      IGNORE_DOT_START_FOLDER: false,
      // 扫描深度 0 为没有限制
      DEEP: 0
    }
  }
}

export default new Vuex.Store({
  plugins: [
    persistedState()
  ],
  state: stateDefault,
  getters: {
    /**
     * 当前是否有扫描结果
     */
    HAS_SCAN_DATA: state => state.SCAN_RESULT.length !== 0,
    /**
     * 根据扫描结果统计文件和文件夹的数量
     */
    SCAN_RESULT_FILE_AND_FOLDER_NUM: state => {
      const grouped = groupby(state.SCAN_RESULT_FLAT, item => item.data.isFile ? 'file' : 'folder')
      return {
        file: (grouped.file || []).length,
        folder: (grouped.folder || []).length
      }
    },
    /**
     * 根据扫描结果统计文件类型分布
     */
    SCAN_RESULT_STATISTIC_EXT: state => {
      const grouped = groupby(state.SCAN_RESULT_FLAT, 'data.ext')
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
     * 根据扫描结果统计设置建议选项 [ 忽略的文件夹路径 ]
     */
    SETTING_SCAN_IGNORE_PATH_OPTIONS: state => {
      let result = []
      function isFolderAndPush (itemArray, level = 1) {
        if (level > 3) return
        for (const item of itemArray) {
          if (item.isDirectory) {
            result.push(item.filePath)
            isFolderAndPush(item.children, level + 1)
          }
        }
      }
      isFolderAndPush(state.SCAN_RESULT)
      return result
    },
    /**
     * 根据扫描结果统计设置建议选项 [ 忽略的文件类型 ]
     */
    SETTING_SCAN_IGNORE_EXT_OPTIONS: state => {
      const grouped = groupby(state.SCAN_RESULT_FLAT, 'data.ext')
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
        ignoreFile: state.SETTING.SCAN.IGNORE_FILE,
        ignoreDotStartFile: state.SETTING.SCAN.IGNORE_DOT_START_FILE,
        ignoreDotStartFolder: state.SETTING.SCAN.IGNORE_DOT_START_FOLDER,
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
        value,
        openAfterExport: state.SETTING.APP.OPEN_AFTER_EXPORT,
        openFolderAfterExport: state.SETTING.APP.OPEN_FOLDER_AFTER_EXPORT
      })
    },
    /**
     * 重置软件所有数据
     */
    RESTORE (state) {
      for (const key in stateDefault) {
        if (stateDefault.hasOwnProperty(key)) {
          const value = stateDefault[key]
          state[key] = value
        }
      }
    },
    /**
     * 导出当前状态
     */
    STORE_EXPORT (state, {
      data = true,
      setting = true
    } = {}) {
      // 除了设置之外的字段
      let DATA = {}
      Object.keys(state).filter(e => {
        return e !== 'SETTING' && e !== ''
      }).forEach(key => {
        DATA[key] = state[key]
      })
      // 设置
      const { SETTING } = state 
      // 导出的数据
      const exportData = {
        ...data ? DATA : {},
        ...setting ? { SETTING } : {}
      }
      this.commit('IPC_EXPORT', {
        name: 'FOLDER_EXPLORER_BACKUP.json',
        value: JSON.stringify(exportData, null, 2)
      })
    },
    /**
     * 导入之前的备份
     */
    STORE_IMPORT (state, { data = {} }) {
      for (const key in state) {
        if (data.hasOwnProperty(key)) {
          state[key] = data[key]
        }
      }
    },
    /**
     * 导出 [ 树形文本 ]
     */
    EXPORT_TREE_TEXT (state) {
      // 是否存在备注
      const hasNote = state.SCAN_RESULT_FLAT.find(e => e.note !== '')
      // 找最大文件名称长度
      let itemLengthMax = 0
      if (hasNote) {
        state.SCAN_RESULT_FLAT.forEach(e => {
          const item = `${e.tree.text}${e.data.name}`
          if (item.length > itemLengthMax) {
            itemLengthMax = item.length
          }
        })
      }
      // 导出的文本
      const text = state.SCAN_RESULT_FLAT.map(e => {
        const item = `${e.tree.text}${e.data.name}`
        const hasNoteInCurrentRow = e.note !== ''
        return hasNoteInCurrentRow ? `${item.padEnd(itemLengthMax, ' ')} // ${e.note}` : item
      }).join('\n')
      // 导出
      this.commit('IPC_EXPORT', {
        name: `${state.SETTING.EXPORT.TREE_TEXT.FILE_NAME}.txt`,
        value: text
      })
    },
    /**
     * 导出 [ JSON ]
     */
    EXPORT_TREE_JSON (state) {
      const text = JSON.stringify(state.SCAN_RESULT, null, 2)
      // 导出
      this.commit('IPC_EXPORT', {
        name: `${state.SETTING.EXPORT.TREE_JSON.FILE_NAME}.json`,
        value: text
      })
    }
  }
})
