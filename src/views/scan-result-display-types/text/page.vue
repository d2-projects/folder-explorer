<style lang="scss" scoped>
.page-scan-result-display-types-text {
  pre {
    margin-bottom: 0px;
    font-size: 18px;
    line-height: 23px;
  }
}
</style>

<template>
  <div class="page-scan-result-display-types-text">
    <pre>{{display}}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { translateToText } from '@/util/scanDataTranslate.js'
export default {
  name: 'text',
  title: '文本',
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ]),
    display () {
      return translateToText({
        data: this.SCAN_RESULT
      })
    }
  }
}
</script>
