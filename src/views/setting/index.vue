<style lang="scss" scoped>
.page {
  height: 100%;
  .page--tabbar {
    margin: 5px;
  }
  .page--main {
    border-top: 1px solid #D9D9D9;
    .page--main-side {
      width: 200px;
      border-right: 1px solid #D9D9D9;
      overflow: auto;
      padding: 10px;
    }
    .page--main-content {
      overflow: auto;
      background-color: #FAFAFA;
      padding: 20px 0;
    }
  }
}
</style>

<template>
  <div class="page" flex="dir:top main:justify box:first">
    <div class="page--tabbar" flex="main:justify cross:center">
      <div style="width: 30px;">
        <a-button
          size="small"
          icon="home"
          type="primary"
          @click="$router.replace('/')">
        </a-button>
      </div>
      <b>偏好设置</b>
      <div style="width: 30px;"></div>
    </div>
    <div class="page--main" flex="box:first">
      <div class="page--main-side">
        <a-anchor :get-container="getContainer">
          <a-anchor-link href="#section-scan" title="扫描"/>
          <a-anchor-link href="#1" title="文本导出"/>
          <a-anchor-link href="#1" title="JSON导出"/>
          <a-anchor-link href="#1" title="表格导出"/>
          <a-anchor-link href="#1" title="重置"/>
        </a-anchor>
      </div>
      <div class="page--main-content" ref="container">
        <setting-container id="section-scan" title="扫描">
          扫描
        </setting-container>
      </div>
    </div>
  </div>
</template>

<script>
import settingContainer from './component/setting-container'
export default {
  components: {
    settingContainer
  },
  methods: {
    getContainer () {
      return this.$refs.container
    }
  }
}
</script>