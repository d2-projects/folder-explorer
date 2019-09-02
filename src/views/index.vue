<style lang="scss" scoped>
.page {
  height: 100%;
  .page--selector {
    padding: 5px;
    .ant-input {
      margin-right: 5px;
    }
  }
  .page--tabbar {
    margin-bottom: 5px;
  }
  .page--router-view {
    overflow: auto;
    border-top: 1px solid #D9D9D9;
  }
}
</style>

<template>
  <div flex="dir:top" class="page">
    <div flex="dir:left" class="page--selector">
      <a-input
        placeholder="选择目录"
        :value="SCAN_FOLDER_PATH"/>
      <a-button
        type="primary"
        @click="IPC_DIR_SELECT">
        选择目录
      </a-button>
    </div>
    <div flex="dir:left main:center" class="page--tabbar">
      <a-radio-group
        :defaultValue="$route.name"
        buttonStyle="solid"
        @change="e => $router.replace({ name: e.target.value })">
        <a-radio-button v-for="type of scanResultDisplayTypesMenu" :key="type.name" :value="type.name">{{type.title}}</a-radio-button>
      </a-radio-group>
    </div>
    <div flex-box="1" class="page--router-view">
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
