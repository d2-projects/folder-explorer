<style lang="scss" scoped>
.highlight {
  margin: 0px;
  font-size: 12px;
}
</style>

<template>
  <pre class="highlight hljs" v-html="highlightHTML"></pre>
</template>

<script>
// 相关文档
// https://highlightjs.org/usage/
// http://highlightjs.readthedocs.io/en/latest/api.html#configure-options
import highlight from 'highlight.js'
import './styles/github-gist.css'
export default {
  name: 'highlight',
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      highlightHTML: ''
    }
  },
  mounted () {
    this.highlight()
  },
  watch: {
    value () {
      this.highlight()
    }
  },
  methods: {
    highlight () {
      this.highlightHTML = highlight.highlightAuto(this.value, [ 'json' ]).value
    }
  }
}
</script>
