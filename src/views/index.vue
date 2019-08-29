<template>
  <div>
    <a-button type="primary" @click="onSelectDir">选择目录</a-button>
    <p>{{path}}</p>
    <pre style="margin-bottom: -3px;" v-for="(row, index) in treeText" :key="index">{{row}}</pre>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
      // 选择的路径
      path: '',
      // 扫描结果
      scanResult: []
    }
  },
  computed: {
    treeText () {
      function treeRowMaker (level, isFirst, isLast, lastTree) {
        let body = ''
        let end = '├─'
        // 判断 end
        if (isFirst) end = '├─'
        if (isLast) end = '└─'
        // 判断 body
        body = lastTree.map(cell => {
          if (cell === '│ ' || cell === '  ') {
            return cell
          } else if (cell === '├─') {
            return '│ '
          }else {
            return '  '
          }
        })
        return [...body, end]
      }
      function scan (dataArray, level, lastTree = []) {
        dataArray.forEach((fileOrDir, index) => {
          // 文字前面的树枝
          const treeBody = treeRowMaker(level, index === 0, index === dataArray.length - 1, lastTree)
          // 添加一行
          result.push(treeBody.join('') + fileOrDir.name)
          // 如果是文件夹的话，遍历文件夹内容
          if (fileOrDir.isDirectory) {
            scan(fileOrDir.children, level + 1, treeBody)
          }
        })
      }
      let result = []
      scan(this.scanResult, 1)
      return result
    }
  },
  // 注册事件监听
  created () {
    ipcRenderer.on('IPC_DIR_SCAN_REPLY', (event, arg) => {
      this.scanResult = arg
    })
  },
  // 组件卸载之前取消事件监听
  beforeDestroy () {
    ipcMain.removeListener('IPC_DIR_SCAN_REPLY')
  },
  methods: {
    onSelectDir () {
      this.path = ipcRenderer.sendSync('IPC_DIR_SELECT')
      ipcRenderer.send('IPC_DIR_SCAN', { filePath: this.path })
    }
  }
}
</script>
