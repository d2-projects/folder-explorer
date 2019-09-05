<template>
  <result-container>
    <template v-if="HAS_SCAN_DATA">
      <div slot="header-right" flex="main:center">
        <export-copy :value="code"/>
        <export-file
          :value="code"
          name="FolderTreeExport.json"
          placement="bottomRight"/>
      </div>
      <highlight :value="code"/>
    </template>
    <empty v-else/>
  </result-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'raw',
  title: '数据',
  icon: 'table',
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ]),
    ...mapGetters([
      'HAS_SCAN_DATA'
    ]),
    code () {
      return JSON.stringify(this.SCAN_RESULT, null, 2)
    }
  }
}
</script>
