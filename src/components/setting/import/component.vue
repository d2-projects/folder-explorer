<template>
  <div class="setting-component">
    <a-upload-dragger
      :file-list="fileList"
      :beforeUpload="beforeUpload">
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">点击拖拽文件到此区域导入文件</p>
      <p class="ant-upload-hint">请导出本软件导出的备份</p>
    </a-upload-dragger>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'setting-import',
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    ...mapMutations([
      'STORE_IMPORT'
    ]),
    beforeUpload(file, fileList) {
      this.fileList = []
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        let data = {}
        try {
          data = JSON.parse(reader.result)
          this.STORE_IMPORT({ data })
          this.$message.success('导入完成')
        } catch {
          this.$message.error('导入的文件不符合要求')
        }
      }
      return false
    }
  }
}
</script>
