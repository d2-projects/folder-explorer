<template>
  <a-tooltip placement="top" >
    <span slot="title">导出为文件</span>
    <a-button
      class="is-ml-2 is-mr-2"
      size="small"
      icon="download"
      @click="onClick"/>
  </a-tooltip>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'export-file',
  props: {
    name: {
      type: String,
      default: 'export.txt',
      required: false
    },
    value: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    onClick () {
      if (this.value === '') {
        this.$notify({
          type: 'warning',
          title: '内容为空',
          body: '请先扫描一个非空目录'
        })
      }
      ipcRenderer.send('IPC_EXPORT', {
        name: this.name,
        value: this.value
      })
    }
  }
}
</script>
