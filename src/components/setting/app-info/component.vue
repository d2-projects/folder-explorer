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
      flex="dir:top main:center cross:center"
      class="is-mb-20">
      <img
        src="@/assets/icon/logo/128.png"
        class="setting-app-info--logo"
        draggable="false">
      <span>version {{appInfo.version}}</span>
    </div>
    <a-card>
      <p>
        软件在 <a-link>{{appInfo.repository.url}}</a-link> 开源
      </p>
      <p class="is-mb-0">
        由 <a-link :href="appInfo.Author.url">@{{appInfo.Author.name}}</a-link> 开发
      </p>
    </a-card>
  </div>
</template>

<script>
import appInfo from '@root/package.json'
export default {
  name: 'setting-app-info',
  data () {
    return {
      appInfo
    }
  }
}
</script>
