<style lang="scss" scoped>
.page-index {
  height: 100%;
  .page-index--selector {
    padding: 10px;
    .ant-input {
      margin-right: 10px;
    }
  }
  .page-index--tabbar {
    margin-bottom: 10px;
  }
  .page-index--router-view {
    overflow: auto;
    border-top: 1px solid #D9D9D9;
  }
}
</style>

<template>
  <div flex="dir:top" class="page-index">
    <div flex="dir:left" class="page-index--selector">
      <a-input
        placeholder="选择目录"
        :value="SCAN_FOLDER_PATH"/>
      <a-button
        type="primary"
        @click="IPC_DIR_SELECT">
        选择目录
      </a-button>
    </div>
    <div flex="dir:left main:center" class="page-index--tabbar">
      <a-radio-group
        :defaultValue="$route.name"
        buttonStyle="solid"
        @change="e => $router.replace({ name: e.target.value })">
        <a-radio-button v-for="type of scanResultDisplayTypesMenu" :key="type.name" :value="type.name">{{type.title}}</a-radio-button>
      </a-radio-group>
    </div>
    <div flex-box="1" class="page-index--router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { scanResultDisplayTypesMenu } from '@/router.js'
export default {
  data () {
    return {
      // 支持的显示方式
      scanResultDisplayTypesMenu
    }
  },
  computed: {
    ...mapState([
      'SCAN_FOLDER_PATH'
    ]),
  },
  methods: {
    ...mapMutations([
      'IPC_DIR_SELECT'
    ])
  }
}
</script>
