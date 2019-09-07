<style lang="scss">
.setting-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 10px;
  h1 {
    .anticon {
      color: #606266;
      margin-right: 5px;
    }
  }
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
    <h1>
      <a-icon :type="icon" />
      {{title}}
    </h1>
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
    },
    icon: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
