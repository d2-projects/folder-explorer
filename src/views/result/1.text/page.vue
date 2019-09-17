<style lang="scss" scoped>
.page-result-text--folder-path {
  font-size: 12px;
  color: #606266;
  margin-left: 2px;
}
.page-result-text--count {
  font-size: 12px;
  color: #909399;
}
</style>

<template>
  <result-container>
    <template v-if="HAS_SCAN_DATA">
      <span
        v-if="SCAN_FOLDER_PATH"
        slot="header"
        class="page-result-text--folder-path">
        {{ SCAN_FOLDER_PATH }}
      </span>
      <div class="full">
        <reader/>
      </div>
    </template>
    <empty v-else/>
    <span slot="footer" class="page-result-text--count">
      <a-icon type="database"/>
      总计 {{ SCAN_RESULT_FLAT.length }}
      <a-icon type="file"/>
      文件 {{ SCAN_RESULT_FILE_AND_FOLDER_NUM.file }}
      <a-icon type="folder"/>
      目录 {{ SCAN_RESULT_FILE_AND_FOLDER_NUM.folder }}
    </span>
  </result-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'doc',
  title: '总览',
  computed: {
    ...mapGetters([
      'SCAN_FOLDER_PATH',
      'SCAN_RESULT_FLAT',
      'HAS_SCAN_DATA',
      'SCAN_RESULT_FILE_AND_FOLDER_NUM'
    ])
  }
}
</script>
