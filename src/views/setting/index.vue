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
          <a-anchor-link href="#section-app" title="通用"/>
          <a-anchor-link href="#section-scan" title="扫描"/>
          <a-anchor-link href="#section-export-import" title="备份和恢复"/>
          <a-anchor-link href="#section-restore" title="重置"/>
        </a-anchor>
      </div>
      <div class="page--main-content" ref="container">
        <setting-container id="section-app" title="通用" icon="home">
          <h2>导出后打开</h2>
          <p>每次导出文件后自动打开</p>
          <setting-boolean-simple path="APP.OPEN_AFTER_EXPORT"/>
          <h2>导出后打开文件夹</h2>
          <p>每次导出文件后自动打开所在目录（如果开启了“导出后打开”，此设置将忽略）</p>
          <setting-boolean-simple path="APP.OPEN_FOLDER_AFTER_EXPORT"/>
          <h2>删除确认</h2>
          <p>在每次删除文件之前弹出确认框</p>
          <setting-boolean-simple path="APP.DELETE_CONFIRM"/>
        </setting-container>
        <setting-container id="section-scan" title="扫描" icon="file-search">
          <h2>忽略的文件 / 文件夹</h2>
          <p>不必要的文件夹扫描会导致性能损失甚至程序失去响应，例如 node_modules</p>
          <setting-scan-ignore-path/>
          <h2>忽略的文件类型</h2>
          <p>设置您希望过滤掉的文件类型</p>
          <setting-scan-ignore-ext/>
          <h2>扫描深度</h2>
          <p>设置扫描目录的层级数，设置为 0 等于无限</p>
          <setting-scan-deep/>
          <h2>忽略文件</h2>
          <p>如果打开，将只扫描目录</p>
          <setting-boolean-simple path="SCAN.IGNORE_FILE"/>
          <h2>忽略以 " . " 开头的文件</h2>
          <p>这类文件在 Linux 和 MacOS 上是默认隐藏的文件</p>
          <setting-boolean-simple path="SCAN.IGNORE_DOT_START_FILE"/>
          <h2>忽略以 " . " 开头的文件夹</h2>
          <p>这类文件夹在 Linux 和 MacOS 上是默认隐藏的文件夹</p>
          <setting-boolean-simple path="SCAN.IGNORE_DOT_START_FOLDER"/>
        </setting-container>
        <setting-container id="section-export-import" title="备份和恢复" icon="sync">
          <h2>导出</h2>
          <p>将软件当前的状态导出为文件</p>
          <setting-export/>
          <h2>导入数据</h2>
          <p>导入您之前导出的备份</p>
          <setting-import/>
        </setting-container>
        <setting-container id="section-restore" title="重置" icon="rocket">
          <h2>重置软件</h2>
          <p>恢复软件为初始状态</p>
          <setting-retore/>
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