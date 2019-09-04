<template>
  <span
    class="row-info-icon"
    flex="main:center cross:center"
    @click="edit">
    <a-icon type="tag"/>
    <a-modal
      :title="`添加注释到 ${fileName}`"
      cancel-text="取消"
      ok-text="确定"
      :closable="false"
      :mask-closable="false"
      centered
      v-model="editing"
      :onOk="onOk"
    >
      <a-input
        v-model="currentValue"
        placeholder="注释内容 回车确认"
        ref="input"
        @pressEnter="onOk">
        <a-icon slot="prefix" type="tag" />
      </a-input>
    </a-modal>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
      required: false
    },
    fileName: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      editing: false,
      currentValue: ''
    }
  },
  methods: {
    edit () {
      this.editing = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    onOk () {
      this.$emit('input', this.currentValue)
      this.editing = false
    }
  }
}
</script>
