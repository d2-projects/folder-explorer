<style lang="scss" scoped>
.setting-app-info {
  .setting-app-info--logo {
    width: 128px;
  }
}
</style>

<template>
  <div class="setting-app-info">
    <div
      flex="main:center cross:center"
      class="is-mb-20">
      <img
        src="@/assets/icon/logo/128.png"
        class="setting-app-info--logo"
        draggable="false">
    </div>
    <a-card>
      {{packageInfo.name}} v{{packageInfo.version}}
    </a-card>
  </div>
</template>

<script>
import packageInfo from '../../../../package.json'
export default {
  name: 'setting-app-info',
  data () {
    return {
      packageInfo
    }
  }
}
</script>
