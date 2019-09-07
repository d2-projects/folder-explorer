<template>
  <a-button
    size="small"
    icon="export">
    {{ title }}
  </a-button>
</template>

<script>
export default {
  name: 'share',
  props: {
    title: {
      type: String,
      default: '导出',
      required: false
    }
  }
}
</script>
