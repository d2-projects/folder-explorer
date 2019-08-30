<template>
  <div>
    <a-button type="primary" @click="onClickSelectDir">选择目录</a-button>
    <a-tabs
      :defaultActiveKey="$route.name"
      type="card"
      @change="name => $router.replace({ name })">
      <a-tab-pane
        v-for="type of scanResultDisplayTypesMenu"
        :tab="type.title"
        :key="type.name"/>
    </a-tabs>
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { ipcRenderer } from 'electron'
import { translateToText } from '@/util/scanDataTranslate.js'
import { scanResultDisplayTypesMenu } from '@/router.js'
export default {
  data () {
    return {
      // 支持的显示方式
      scanResultDisplayTypesMenu,
      // 选择的路径
      folderPath: ''
    }
  },
  created () {
    // 注册事件监听 [ 返回文件夹扫描结果 ]
    ipcRenderer.on('IPC_DIR_SCAN_REPLY', (event, arg) => this.SCAN_RESULT_UPDATE(arg))
  },
  beforeDestroy () {
    // 组件卸载之前取消事件监听 [ 返回文件夹扫描结果 ]
    ipcMain.removeListener('IPC_DIR_SCAN_REPLY')
  },
  methods: {
    ...mapMutations([
      // 更新扫描结果
      'SCAN_RESULT_UPDATE'
    ]),
    /**
     * 点击选择文件夹按钮
     */
    onClickSelectDir () {
      // 获得用户选择的文件夹路径
      this.folderPath = ipcRenderer.sendSync('IPC_DIR_SELECT')
      // 发送扫描文件夹请求
      ipcRenderer.send('IPC_DIR_SCAN', { folderPath: this.folderPath })
    }
  }
}
</script>
