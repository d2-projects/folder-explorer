<style lang="scss" scoped>
.page-scan-result-display-types-text {
  margin: 10px;
  pre {
    margin-bottom: 0px;
    font-size: 16px;
    line-height: 18px;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      background-color: #1890FF;
      color: #FFF;
    }
  }
}
</style>

<template>
  <container>
    <div class="page-scan-result-display-types-text">
      <pre v-for="(row, index) of display.split('\n')" :key="index">{{row}}</pre>
    </div>
    <template slot="footer">
      <div flex="main:center">
        <copy :value="display"/>
      </div>
    </template>
  </container>
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
