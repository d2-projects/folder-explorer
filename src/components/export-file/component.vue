<template>
  <a-tooltip :placement="placement" title="导出为文件">
    <a-button
      class="is-ml-2 is-mr-2"
      size="small"
      icon="download"
      @click="IPC_EXPORT({ name, value })"/>
  </a-tooltip>
</template>

<script>
import { mapMutations } from 'vuex'
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
    },
    placement: {
      type: String,
      default: 'bottom',
      required: false
    }
  },
  methods: {
    ...mapMutations([
      'IPC_EXPORT'
    ]),
    onClick () {
      if (this.value === '') {
        this.$message.warning('请先扫描一个非空目录')
      }
    }
  }
}
</script>
