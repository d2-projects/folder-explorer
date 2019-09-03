<template>
  <a-tooltip placement="top" >
    <span slot="title">复制到剪贴板</span>
    <a-button
      @click="onClick"
      size="small"
      icon="copy"/>
  </a-tooltip>
</template>

<script>
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
      if (this.value === '') {
        this.$notify({
          type: 'warning',
          title: '内容为空',
          body: '请先扫描一个非空目录'
        })
      }
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
