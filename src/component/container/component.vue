<style lang="scss" scoped>
.container {
  height: 100%;
  .container--header {
    padding: 5px;
    border-bottom: 1px solid #D9D9D9;
  }
  .container--body {
    overflow: auto;
    position: relative;
  }
  .container--footer {
    padding: 5px;
    border-top: 1px solid #D9D9D9;
  }
}
</style>

<template>
  <div
    class="container"
    flex="dir:top main:justify">
    <div
      v-if="$slots.header"
      class="container--header">
      <slot name="header"></slot>
    </div>
    <div class="container--body" flex-box="1">
      <slot></slot>
    </div>
    <div
      v-if="$slots.footer"
      class="container--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'container'
}
</script>
