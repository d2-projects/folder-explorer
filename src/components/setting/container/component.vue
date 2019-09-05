<style lang="scss" scoped>
.setting-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>

<template>
  <div class="setting-container">
    <h1>{{title}}</h1>
    <a-card>
      <slot/>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'setting-container',
  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
