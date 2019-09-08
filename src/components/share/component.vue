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
      <export-action
        icon="tree"
        color="green"
        title="树型文本"
        desc=".txt"
        @click="() => { EXPORT_TREE_TEXT(); close(); }"/>
      <export-action
        icon="json"
        color="blue"
        title="JSON"
        desc=".json"
        @click="() => { EXPORT_TREE_JSON(); close(); }"/>
    </a-drawer>
  </span>
</template>

<script>
import { mapMutations } from 'vuex'
import exportAction from './components/export-action'
export default {
  name: 'share',
  components: {
    exportAction
  },
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
