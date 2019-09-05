<style lang="scss">
.setting-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  .setting-component {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
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
