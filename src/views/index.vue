<style lang="scss" scoped>
.page-index {
  .page-index--selector {
    margin: 10px;
    .ant-input {
      margin-right: 10px;
    }
  }
  .page-index--tabbar {
  }
  .page-index--router-view {
    margin: 10px;
    padding: 10px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
  }
}
</style>

<template>
  <div flex="dir:top" class="page-index">
    <div flex="dir:left" class="page-index--selector">
      <a-input placeholder="选择目录" :value="folderPath" @click="onClickSelectDir"/>
      <a-button type="primary" @click="onClickSelectDir">选择目录</a-button>
    </div>
    <div flex="dir:left main:center" class="page-index--tabbar">
      <a-radio-group :defaultValue="$route.name" buttonStyle="solid" @change="e => $router.replace({ name: e.target.value })">
        <a-radio-button v-for="type of scanResultDisplayTypesMenu" :key="type.name" :value="type.name">{{type.title}}</a-radio-button>
      </a-radio-group>
    </div>
    <div flex-box="1" class="page-index--router-view">
      <router-view/>
    </div>
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
