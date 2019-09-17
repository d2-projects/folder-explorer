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
    border-radius: 2px;
    &.container--body__border {
      border: 1px solid #D9D9D9;
    }
  }
  .container--footer {
    padding: 5px;
    padding-top: 0px;
    .app-logo-footer {
      height: 20px;
    }
  }
}
</style>

<template>
  <div
    class="container"
    flex="dir:top main:justify">
    <div v-if="$slots['header']" class="container--header" flex="cross:center">
      <slot name="header"></slot>
    </div>
    <div
      class="container--body"
      :class="{
        'container--body__border': border
      }"
      flex-box="1">
      <slot></slot>
    </div>
    <div flex="main:justify cross:center" class="container--footer">
      <div flex="cross:center">
        <slot name="footer"></slot>
      </div>
      <div flex="main:right cross:center">
        <img
          class="app-logo-footer"
          src="@/assets/icon/logo/footer.png"
          draggable="false">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'result-container',
  props: {
    border: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
