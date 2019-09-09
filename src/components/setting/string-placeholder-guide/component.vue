<style lang="scss">
.setting-string-placeholder-guide {
  margin: -4px;
  .setting-string-placeholder-guide--row {
    cursor: pointer;
    user-select: none;
    padding: 4px;
    margin-bottom: 5px;
    border: 1px solid #FFF;
    border-radius: 4px;
    &:hover {
      background-color: #FAFAFA;
      border-color: #E8E8E8;
    }
  }
}
</style>

<template>
  <p flex="main:justify cross:center">
    {{note}}
    <a-button
      type="dashed"
      size="small"
      icon="book"
      @click="active = true">
      占位符
    </a-button>
    <a-drawer
      title="占位符指南"
      placement="right"
      :closable="false"
      :visible="active"
      @close="active = false"
    >
      <a-alert
        message="点击复制"
        type="success"
        class="is-mb-20"/>
      <div class="setting-string-placeholder-guide">
        <p
          v-for="placeholder of placeholders"
          :key="placeholder.name"
          flex="cross:center"
          class="setting-string-placeholder-guide--row"
          @click="onCopy(placeholder.name)">
          <a-tag color="blue">
            <code>{{ '{' + placeholder.name + '}' }}</code>
          </a-tag>
          <span>
            {{ placeholder.description }}
          </span>
        </p>
      </div>
    </a-drawer>
  </p>
</template>

<script>
import { placeholders } from '@/util/stringReplace.js'
export default {
  name: 'setting-string-placeholder-guide',
  props: {
    note: { type: String, default: '', required: true }
  },
  data () {
    return {
      placeholders,
      active: false
    }
  },
  methods: {
    onCopy (name) {
      this.$copyText('{' + name + '}')
        .then(() => {
          this.$message.success('已经复制到剪贴板')
        }, () => {
          this.$message.error('出现了一些小错误')
        })
    }
  }
}
</script>
