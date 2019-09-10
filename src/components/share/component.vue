<template>
  <span>
    <a-button size="small" icon="export" :disabled="!HAS_SCAN_DATA" @click="start">
      {{ title }}
    </a-button>
    <a-drawer
      title="导出"
      placement="right"
      width="280px"
      :visible="active"
      :closable="false"
      :mask-closable="true"
      :destroy-on-close="true"
      @close="close">
      <export-action
        icon="text"
        color="yellow"
        title="树型文本"
        desc=".txt"
        anchor="section-export-text"
        @click="() => { EXPORT_TREE_TEXT(); close(); }"/>
      <export-action
        icon="json"
        color="blue"
        title="JSON 数据"
        desc=".json"
        anchor="section-export-json"
        @click="() => { EXPORT_TREE_JSON(); close(); }"/>
      <export-action
        icon="xmind"
        color="red"
        title="XMind 脑图"
        desc=".xmind"
        anchor="section-export-xmind"
        @click="() => { EXPORT_TREE_XMIND(); close(); }"/>
      <export-action
        icon="xml"
        color="violet"
        title="XML 可扩展标记"
        desc=".xml"
        anchor="section-export-xml"
        @click="() => { EXPORT_TREE_XML(); close(); }"/>
    </a-drawer>
  </span>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import exportAction from './components/export-action'
export default {
  name: 'share',
  components: {
    exportAction
  },
  props: {
    title: {
      type: String,
      default: '导出',
      required: false
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    ...mapGetters([
      'HAS_SCAN_DATA'
    ])
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
