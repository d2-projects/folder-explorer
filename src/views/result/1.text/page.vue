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
        slot="header-left"
        class="page-result-text--folder-path">
        {{ SCAN_FOLDER_PATH }}
      </span>
      <div slot="header-right" flex="main:center">
        <share title="导出当前树型数据"/>
        <!-- <export-copy :value="exportValue"/>
        <export-file
          :value="exportValue"
          name="FolderTreeExport.txt"
          placement="bottomRight"/> -->
      </div>
      <div class="full">
        <reader/>
      </div>
    </template>
    <empty v-else/>
    <span slot="footer-left">
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
    ]),
    exportValue () {
      // 是否存在备注
      const hasNote = this.SCAN_RESULT_FLAT.find(e => e.note !== '')
      // 找最大文件名称长度
      let itemLengthMax = 0
      if (hasNote) {
        this.SCAN_RESULT_FLAT.forEach(e => {
          const item = `${e.tree.text}${e.data.filePathParsed.name}`
          if (item.length > itemLengthMax) {
            itemLengthMax = item.length
          }
        })
      }
      // 导出的文本
      return this.SCAN_RESULT_FLAT.map(e => {
        const item = `${e.tree.text}${e.data.filePathParsed.name}`
        const hasNoteInCurrentRow = e.note !== ''
        return hasNoteInCurrentRow ? `${item.padEnd(itemLengthMax, ' ')} // ${e.note}` : item
      }).join('\n')
    }
  }
}
</script>
