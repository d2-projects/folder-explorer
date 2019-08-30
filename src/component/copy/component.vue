<template>
  <a-tooltip placement="top" >
    <span slot="title">复制到剪贴板</span>
    <a-button @click="onClick" icon="copy"></a-button>
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
      console.log(this.value)
      this.$copyText(this.value)
        .then(() => {
          this.$notification.success({
            message: '成功',
            description: '复制成功'
          })
        }, () => {
          this.$notification.error({
            message: '错误',
            description: '复制失败'
          })
        })
    }
  }
}
</script>
