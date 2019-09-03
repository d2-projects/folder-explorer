<template>
  <container>
    <div class="full is-p-5">
      <reader :value="SCAN_RESULT"/>
    </div>
    <div slot="footer" flex="main:center">
      <copy :value="translate"/>
    </div>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import translate from '@/util/translate.tree.text.js'
export default {
  name: 'doc',
  title: '文本',
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ]),
    translate () {
      return translate(this.SCAN_RESULT)
    }
  }
}
</script>
