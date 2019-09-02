<style lang="scss" scoped>
@import './style';
</style>

<template>
  <container>
    <div class="page">
      <!-- 虚拟滚动 -->
      <recycle-scroller
        :items="display.split('\n').map((e, index) => ({ id: index, value: e }))"
        :item-size="18"
        key-field="id"
        v-slot="{ item }"
        class="page--recycle-scroller">
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
import translate from '@/util/scanDataTranslate.js'
export default {
  name: 'doc',
  title: '文本',
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ]),
    display () {
      return translate({
        data: this.SCAN_RESULT
      })
    }
  }
}
</script>
