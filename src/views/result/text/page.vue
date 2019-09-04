<template>
  <container>
    <div class="full">
      <reader/>
    </div>
    <div slot="footer" flex="main:center">
      <export-copy :value="translate"/>
      <export-file :value="translate" name="export.txt"/>
    </div>
  </container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'doc',
  title: '文本',
  computed: {
    ...mapState([
      'SCAN_RESULT_FLAT'
    ]),
    translate () {
      return this.SCAN_RESULT_FLAT.map(e => {
        return `${e.tree.text}${e.data.filePathRelativeParsed.name}`
      }).join('\n')
    }
  }
}
</script>
