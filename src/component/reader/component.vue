<style lang="scss" scoped>
.reader {
  height: 100%;
  pre {
    margin-bottom: 0px;
    font-size: 14px;
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
  <recycle-scroller
    :items="display.split('\n').map((e, index) => ({ id: index, value: e }))"
    :item-size="18"
    key-field="id"
    v-slot="{ item }"
    class="reader">
    <pre>{{item.value}}</pre>
  </recycle-scroller>
</template>

<script>
import { mapState } from 'vuex'
import translate from '@/util/translate.tree.text.js'
export default {
  name: 'reader',
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ]),
    display () {
      return translate(this.SCAN_RESULT)
    }
  }
}
</script>
