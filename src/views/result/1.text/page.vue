<template>
  <container>
    <span slot="header-left">
      <a-tag color="purple">
        <a-icon type="database" />
        {{ SCAN_RESULT_FLAT.length }}
        总计
      </a-tag>
      <a-tag color="green">
        <a-icon type="file" />
        {{ SCAN_RESULT_FILE_AND_FOLDER_NUM.file }}
        文件
      </a-tag>
      <a-tag color="cyan">
        <a-icon type="folder" />
        {{ SCAN_RESULT_FILE_AND_FOLDER_NUM.folder }}
        目录
      </a-tag>
    </span>
    <div slot="header-right" flex="main:center">
      <export-copy :value="exportValue"/>
      <export-file
        :value="exportValue"
        name="FolderTreeExport.txt"
        placement="bottomRight"/>
    </div>
    <div class="full">
      <reader/>
    </div>
  </container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'doc',
  title: '文本',
  icon: 'cluster',
  computed: {
    ...mapState([
      'SCAN_RESULT_FLAT'
    ]),
    ...mapGetters([
      'SCAN_RESULT_FILE_AND_FOLDER_NUM'
    ]),
    exportValue () {
      // 是否存在注释
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
