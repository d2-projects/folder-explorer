<style lang="scss" scoped>
.page-scan-result-display-types-text {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  pre {
    margin-bottom: 0px;
    font-size: 16px;
    line-height: 18px;
    height: 18px;
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
      <!-- 虚拟滚动 -->
      <recycle-scroller
        :items="display.split('\n').map((e, index) => ({ id: index, value: e }))"
        :item-size="18"
        key-field="id"
        v-slot="{ item }"
        style="height: 100%;">
        <pre>{{item.value}}</pre>
      </recycle-scroller>
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
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { translateToText } from '@/util/scanDataTranslate.js'
export default {
  name: 'doc',
  title: '文本',
  components: {
    RecycleScroller
  },
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
