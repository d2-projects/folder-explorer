<template>
  <span>
    <a-button size="small" icon="export" @click="start">
      {{ title }}
    </a-button>
    <a-drawer
      title="导出"
      placement="right"
      :visible="active"
      :closable="false"
      :mask-closable="true"
      :destroy-on-close="true"
      @close="close">
      <a-button block class="is-mb-10" @click="() => { EXPORT_TREE_TEXT(); close(); }">树形文本</a-button>
      <a-button block class="is-mb-10" @click="() => { EXPORT_TREE_JSON(); close(); }">JSON</a-button>
    </a-drawer>
  </span>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'share',
  data () {
    return {
      active: false
    }
  },
  props: {
    title: {
      type: String,
      default: '导出',
      required: false
    }
  },
  methods: {
    ...mapMutations([
      'EXPORT_TREE_TEXT',
      'EXPORT_TREE_JSON'
    ]),
    start () {
      this.active = true
    },
    close () {
      this.active = false
    }
  }
}
</script>
