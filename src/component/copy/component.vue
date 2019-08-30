<template>
  <a-tooltip placement="top" >
    <span slot="title">复制到剪贴板</span>
    <a-button @click="onClick" icon="copy"></a-button>
  </a-tooltip>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'copy',
  props: {
    value: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    onClick () {
      console.log(this.value)
      this.$copyText(this.value)
        .then(() => {
          this.$notify({
            type: 'success',
            title: '复制成功',
            body: '内容已经复制到剪贴板'
          })
        }, () => {
          this.$notify({
            type: 'error',
            title: '失败',
            body: '出现了一些小错误'
          })
        })
    }
  }
}
</script>
