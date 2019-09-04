<style lang="scss" scoped>
.setting-container {
  max-width: 500px;
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
  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
