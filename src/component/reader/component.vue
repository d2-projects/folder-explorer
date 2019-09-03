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
    :items="display"
    :item-size="18"
    key-field="id"
    v-slot="{ item }"
    class="reader">
    <pre>{{item.text}}</pre>
  </recycle-scroller>
</template>

<script>
import translate from '@/util/translate.tree.data.js'
export default {
  name: 'reader',
  props: {
    value: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  computed: {
    display () {
      return translate(this.value)
    }
  }
}
</script>
