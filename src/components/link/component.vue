<style lang="scss" scoped>
.a-link {
  cursor: pointer;
  color: #1890ff;
  &:hover {
    color: darken(#1890ff, 20%);
  }
}
</style>

<template>
  <span class="a-link" @click="onClick">
    <slot/>
  </span>
</template>

<script>
import { shell } from 'electron'
export default {
  name: 'a-link',
  props: {
    href: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    link () {
      return this.href || this.$slots.default[0].text
    }
  },
  methods: {
    onClick () {
      shell.openExternal(this.link)
    }
  }
}
</script>
