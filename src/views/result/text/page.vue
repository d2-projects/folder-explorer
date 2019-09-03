<style lang="scss" scoped>
.page {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 5px;
}
</style>

<template>
  <container>
    <div class="page">
      <reader/>
    </div>
    <template slot="footer">
      <div flex="main:center">
        <!-- <copy :value="display"/> -->
      </div>
    </template>
  </container>
</template>

<script>
export default {
  name: 'doc',
  title: '文本'
}
</script>
