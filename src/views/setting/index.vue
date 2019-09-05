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
      h2 {
        font-size: 16px;
        color: #606266;
      }
      p {
        color: #909399;
      }
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
          主界面
        </a-button>
      </div>
      <b>偏好设置</b>
      <div style="width: 30px;"></div>
    </div>
    <div class="page--main" flex="box:first">
      <div class="page--main-side">
        <a-anchor :get-container="getContainer">
          <a-anchor-link href="#section-scan" title="扫描"/>
        </a-anchor>
      </div>
      <div class="page--main-content" ref="container">
        <setting-container id="section-scan" title="扫描">
          <h2>忽略的文件 / 文件夹</h2>
          <p>不必要的文件夹扫描会导致性能损失甚至程序失去响应，例如 node_modules</p>
          <setting-scan-ignore-path class="is-mb-20"/>
          <h2>忽略的文件类型</h2>
          <p>设置您希望过滤掉的文件类型</p>
          <setting-scan-ignore-ext class="is-mb-20"/>
          <h2>扫描深度</h2>
          <p>设置扫描目录的层级数，设置为 0 等于无限</p>
          <setting-scan-deep class="is-mb-20"/>
          <h2>扫描文件</h2>
          <p>如果关闭，将只扫描目录</p>
          <setting-scan-file/>
        </setting-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getContainer () {
      return this.$refs.container
    }
  }
}
</script>