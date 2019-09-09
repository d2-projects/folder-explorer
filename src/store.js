import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import { message } from 'ant-design-vue'
import xmind from 'xmind'
import XMLJS from 'xml-js'
import { remote, shell, ipcRenderer } from 'electron'
import groupby from 'lodash.groupby'
import set from 'lodash.set'
import clone from 'lodash.clonedeep'
import translateFlat from '@/util/translate.flat.js'
import { stringReplace } from '@/util/stringReplace.js'
import { Object } from 'core-js'

Vue.use(Vuex)

const stateDefault = {
  CACHE: {
    // 扫描的文件夹地址
    SCAN_FOLDER_PATH: '',
    // 扫描结果
    SCAN_RESULT: [],
    // 扫描结果 扁平化
    SCAN_RESULT_FLAT: []
  },
  // 数据库
  DB: {
    // 所有的注释信息 可以在重新扫描时自动恢复注释
    NOTES: {}
  },
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
      // 系统存储
      STORE: {
        FILE_NAME: 'FolderExplorerBackup [ {YYYY}-{MM}-{DD} ]'
      },
      // 树形文本
      TREE_TEXT: {
        FILE_NAME: 'FolderExplorer'
      },
      // JSON
      TREE_JSON: {
        FILE_NAME: 'FolderExplorer'
      },
      // XMIND
      XMIND: {
        FILE_NAME: 'FolderExplorer'
      },
      // XML
      XML: {
        FILE_NAME: 'FolderExplorer'
      }
    },
    // 扫描相关
    SCAN: {
      // 忽略的文件夹
      IGNORE_PATH: [ '/node_modules', '/dist', '/.git' ],
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
  state: clone(stateDefault),
  getters: {
    // 快速访问 CACHE
    SCAN_FOLDER_PATH: state => state.CACHE.SCAN_FOLDER_PATH,
    SCAN_RESULT: state => state.CACHE.SCAN_RESULT,
    SCAN_RESULT_FLAT: state => state.CACHE.SCAN_RESULT_FLAT,
    /**
     * 当前是否有扫描结果
     */
    HAS_SCAN_DATA: state => state.CACHE.SCAN_RESULT.length !== 0,
    /**
     * 根据扫描结果统计文件和文件夹的数量
     */
    SCAN_RESULT_FILE_AND_FOLDER_NUM: state => {
      const grouped = groupby(state.CACHE.SCAN_RESULT_FLAT, item => item.data.isFile ? 'file' : 'folder')
      return {
        file: (grouped.file || []).length,
        folder: (grouped.folder || []).length
      }
    },
    /**
     * 根据扫描结果统计文件类型分布
     */
    SCAN_RESULT_STATISTIC_EXT: state => {
      const grouped = groupby(state.CACHE.SCAN_RESULT_FLAT, 'data.ext')
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
        if (level > 2) return
        for (const item of itemArray) {
          if (item.isDirectory) {
            result.push(item.filePath)
            isFolderAndPush(item.elements, level + 1)
          }
        }
      }
      isFolderAndPush(state.CACHE.SCAN_RESULT)
      return result
    },
    /**
     * 根据扫描结果统计设置建议选项 [ 忽略的文件类型 ]
     */
    SETTING_SCAN_IGNORE_EXT_OPTIONS: state => {
      const grouped = groupby(state.CACHE.SCAN_RESULT_FLAT, 'data.ext')
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
      state.CACHE.SCAN_FOLDER_PATH = data
    },
    /**
     * 数据更新 [ 扫描结果 ]
     */
    SCAN_RESULT_UPDATE (state, data) {
      state.CACHE.SCAN_RESULT = data
      state.CACHE.SCAN_RESULT_FLAT = translateFlat({
        data,
        notes: state.DB.NOTES
      })
    },
    /**
     * 数据更新 [ 扫描结果 扁平化 一项 ]
     */
    SCAN_RESULT_FLAT_UPDATE_ITEM (state, { index, item }) {
      // 更新 SCAN_RESULT_FLAT
      state.CACHE.SCAN_RESULT_FLAT.splice(index, 1, item)
      // 更新 NOTES 中的数据
      state.DB.NOTES[item.data.filePathFull] = item.note
    },
    /**
     * ELECTRON IPC [ 发送扫描文件夹请求 ]
     */
    IPC_FOLDER_SCAN (state) {
      ipcRenderer.send('IPC_FOLDER_SCAN', {
        folderPath: state.CACHE.SCAN_FOLDER_PATH,
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
    RESTORE (state, {
      include = [
        'CACHE',
        'DB',
        'SETTING'
      ]
    }) {
      include.forEach(key => {
        state[key] = clone(stateDefault[key])
      })
    },
    /**
     * 导出当前状态
     */
    STORE_EXPORT (state, {
      include = [
        'CACHE',
        'DB',
        'SETTING'
      ]
    } = {}) {
      let exportData = {}
      include.forEach(key => {
        exportData[key] = state[key]
      })
      this.commit('IPC_EXPORT', {
        name: `${stringReplace(state.SETTING.EXPORT.STORE.FILE_NAME)}.json`,
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
      const hasNote = state.CACHE.SCAN_RESULT_FLAT.find(e => e.note !== '')
      // 找最大文件名称长度
      let itemLengthMax = 0
      if (hasNote) {
        state.CACHE.SCAN_RESULT_FLAT.forEach(e => {
          const item = `${e.tree.text}${e.data.name}`
          if (item.length > itemLengthMax) {
            itemLengthMax = item.length
          }
        })
      }
      // 导出的文本
      const text = state.CACHE.SCAN_RESULT_FLAT.map(e => {
        const item = `${e.tree.text}${e.data.name}`
        const hasNoteInCurrentRow = e.note !== ''
        return hasNoteInCurrentRow ? `${item.padEnd(itemLengthMax, ' ')} // ${e.note}` : item
      }).join('\n')
      // 导出
      this.commit('IPC_EXPORT', {
        name: `${stringReplace(state.SETTING.EXPORT.TREE_TEXT.FILE_NAME)}.txt`,
        value: text
      })
    },
    /**
     * 导出 [ JSON ]
     */
    EXPORT_TREE_JSON (state) {
      const text = JSON.stringify(state.CACHE.SCAN_RESULT, null, 2)
      // 导出
      this.commit('IPC_EXPORT', {
        name: `${stringReplace(state.SETTING.EXPORT.TREE_JSON.FILE_NAME)}.json`,
        value: text
      })
    },
    /**
     * 导出 [ 思维导图 ]
     * https://github.com/leungwensen/xmind-sdk-javascript/blob/master/doc/api.md
     */
    async EXPORT_TREE_XMIND (state) {
      const Workbook = xmind.Workbook
      const workbook = new Workbook({
        firstSheetId: 'folder-explorer',
        firstSheetName: 'Folder Explorer',
        rootTopicId: state.CACHE.SCAN_FOLDER_PATH,
        rootTopicName: state.CACHE.SCAN_FOLDER_PATH
      })
      function addTopic (scanResultArray, parentTopic) {
        scanResultArray.forEach(item => {
          const topic = parentTopic.addChild({
            title: item.name
          })
          if (state.DB.NOTES[item.filePathFull]) {
            topic.setNotes(state.DB.NOTES[item.filePathFull])
          }
          if (item.isFile && item.ext) {
            topic.setLabels(item.ext)
          }
          if (item.isDirectory) {
            addTopic(item.elements, topic)
          }
        })
      }
      addTopic(state.CACHE.SCAN_RESULT, workbook.getPrimarySheet().rootTopic)
      // 这里不使用默认的导出方法
      const pathSelect = await remote.dialog.showSaveDialog(remote.BrowserWindow.getFocusedWindow(), {
        defaultPath: `${stringReplace(state.SETTING.EXPORT.XMIND.FILE_NAME)}.xmind`,
        message: '需要将导出的文件放置在哪个位置'
      })
      if (pathSelect.canceled === false) {
        workbook.save(pathSelect.filePath)
        if (state.SETTING.APP.OPEN_AFTER_EXPORT) {
          shell.openItem(pathSelect.filePath)
        } else if (state.SETTING.APP.OPEN_FOLDER_AFTER_EXPORT) {
          shell.showItemInFolder(pathSelect.filePath)
        }
        message.success('内容已经导出')
      }
    },
    /**
     * 导出 [ XML ]
     * https://github.com/nashwaan/xml-js
     */
    EXPORT_TREE_XML (state) {
      /**
       * 创建标签
       * @param {String} name 标签名
       * @param {String} elements 元素
       */
      function el (name, elements) {
        return { type: 'element', name, ...elements ? { elements } : {} }
      }
      /**
       * 创建文字标签
       * @param {String} name 标签名
       * @param {String} value 值
       */
      function text (name, value) {
        return el(name, [{ type: 'text', text: value }])
      }
      // 循环
      function maker (itemArray) {
        let result = []
        itemArray.forEach(item => {
          result.push(
            el('element', [
              ...Object.keys(item).filter(e => e !== 'elements').map(e => text(e, item[e])),
              ...(item.isDirectory && item.elements.length > 0) ? [ el('elements', maker(item.elements)) ] : []
            ])
          )
        })
        return result
      }
      const data = {
        declaration: {
          attributes: {
            version: "1.0",
            encoding: "utf-8"
          }
        },
        elements: [
          el('folder-explorer', maker(state.CACHE.SCAN_RESULT))
        ]
      }
      // 导出
      this.commit('IPC_EXPORT', {
        name: `${stringReplace(state.SETTING.EXPORT.XML.FILE_NAME)}.xml`,
        value: XMLJS.js2xml(data, { spaces: '\t' })
      })
    }
  }
})
