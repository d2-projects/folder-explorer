<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #FAFAFA;
  .container--header {
    padding: 5px;
    padding-bottom: 0px;
  }
  .container--body {
    overflow: auto;
    position: relative;
    margin: 5px;
    background-color: #FFF;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
  }
  .container--footer {
    padding: 5px;
    padding-top: 0px;
  }
}
</style>

<template>
  <div
    class="container"
    flex="dir:top main:justify">
    <div
      v-if="$slots['header-left'] || $slots['header-center'] || $slots['header-right']"
      flex="main:justify cross:center box:mean"
      class="container--header">
      <div flex="cross:center"><slot name="header-left"></slot></div>
      <div flex="main:right cross:center"><slot name="header-right"></slot></div>
    </div>
    <div class="container--body" flex-box="1">
      <slot></slot>
    </div>
    <div
      v-if="$slots['footer-left'] || $slots['footer-center'] || $slots['footer-right']"
      flex="main:justify cross:center box:mean"
      class="container--footer">
      <div flex="cross:center"><slot name="footer-left"></slot></div>
      <div flex="main:right cross:center"><slot name="footer-right"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'result-container'
}
</script>
