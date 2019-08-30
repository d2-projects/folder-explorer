<style lang="scss" scoped>
.draging {
  height: 100%;
  user-select: none;
  cursor: pointer;
}
</style>

<template>
  <div class="draging" flex="main:center cross:center">
    拖动至此开始扫描目录
  </div>
</template>

<script>
export default {
  name: 'draging'
}
</script>
