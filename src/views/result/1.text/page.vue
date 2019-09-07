<style lang="scss" scoped>
.page-result-text--folder-path {
  font-size: 12px;
  color: #606266;
  margin-left: 2px;
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
    <span slot="footer">
      <a-tag color="purple" class="is-mr-5">
        <a-icon type="database"/>
        总计 {{ SCAN_RESULT_FLAT.length }}
      </a-tag>
      <a-tag color="green" class="is-mr-5">
        <a-icon type="file"/>
        文件 {{ SCAN_RESULT_FILE_AND_FOLDER_NUM.file }}
      </a-tag>
      <a-tag color="cyan" class="is-mr-5">
        <a-icon type="folder"/>
        目录 {{ SCAN_RESULT_FILE_AND_FOLDER_NUM.folder }}
      </a-tag>
    </span>
  </result-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'doc',
  title: '文本',
  icon: 'cluster',
  computed: {
    ...mapState([
      'SCAN_FOLDER_PATH',
      'SCAN_RESULT_FLAT'
    ]),
    ...mapGetters([
      'HAS_SCAN_DATA',
      'SCAN_RESULT_FILE_AND_FOLDER_NUM'
    ])
  }
}
</script>
