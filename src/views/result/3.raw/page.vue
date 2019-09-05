<template>
  <container>
    <div slot="header-right" flex="main:center">
      <export-copy :value="code"/>
      <export-file
        :value="code"
        name="FolderTreeExport.json"
        placement="bottomRight"/>
    </div>
    <!-- <highlight :value="code"/> -->
    <pre>{{code}}</pre>
  </container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'raw',
  title: '数据',
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ]),
    code () {
      return JSON.stringify(this.SCAN_RESULT, null, 2)
    }
  }
}
</script>
