<template>
  <div>
    <a-button type="primary" @click="onSelectDir">选择目录</a-button>
    <p>{{folderPath}}</p>
    <pre style="margin-bottom: -3px;" v-for="(row, index) in treeText" :key="index">{{row}}</pre>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { translateToText } from '@/util/scanDataTranslate.js' 
export default {
  data () {
    return {
      folderPath: '', // 选择的路径
      scanResult: [] // 扫描结果
    }
  },
  computed: {
    treeText () {
      return translateToText({
        data: this.scanResult
      })
    }
  },
  created () {
    // 注册事件监听 [ 返回文件夹扫描结果 ]
    ipcRenderer.on('IPC_DIR_SCAN_REPLY', (event, arg) => this.scanResult = arg)
  },
  beforeDestroy () {
    // 组件卸载之前取消事件监听 [ 返回文件夹扫描结果 ]
    ipcMain.removeListener('IPC_DIR_SCAN_REPLY')
  },
  methods: {
    onSelectDir () {
      this.folderPath = ipcRenderer.sendSync('IPC_DIR_SELECT')
      ipcRenderer.send('IPC_DIR_SCAN', { folderPath: this.folderPath })
    }
  }
}
</script>
