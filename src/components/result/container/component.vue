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
      v-if="$slots['header-left'] || $slots['header-right']"
      flex="main:justify cross:center"
      class="container--header">
      <div class="container--header-left">
        <slot name="header-left"></slot>
      </div>
      <div class="container--header-right">
        <slot name="header-right"></slot>
      </div>
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
  name: 'result-container'
}
</script>
