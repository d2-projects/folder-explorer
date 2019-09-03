<template>
  <container>
    <div class="full">
      <reader :value="SCAN_RESULT"/>
    </div>
    <div slot="footer" flex="main:center">
      <copy :value="translate"/>
    </div>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import translate from '@/util/translate.tree.data.js'
export default {
  name: 'doc',
  title: '文本',
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ]),
    translate () {
      return translate(this.SCAN_RESULT).map(e => {
        return `${e.tree.text}${e.data.filePathRelativeParsed.name}`
      }).join('\n')
    }
  }
}
</script>
