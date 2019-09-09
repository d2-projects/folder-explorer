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
        icon="text-tree"
        color="green"
        title="树型文本"
        desc=".txt"
        @click="() => { EXPORT_TREE_TEXT(); close(); }"/>
      <export-action
        icon="json"
        color="blue"
        title="JSON 数据"
        desc=".json"
        @click="() => { EXPORT_TREE_JSON(); close(); }"/>
      <export-action
        icon="xmind"
        color="red"
        title="XMind 脑图"
        desc=".xmind"
        @click="() => { EXPORT_TREE_XMIND(); close(); }"/>
      <export-action
        icon="xml"
        color="violet"
        title="XML 可扩展标记"
        desc=".xml"
        @click="() => { EXPORT_TREE_XML(); close(); }"/>
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
      'EXPORT_TREE_JSON',
      'EXPORT_TREE_XMIND',
      'EXPORT_TREE_XML'
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
