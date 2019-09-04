<style lang="scss" scoped>
.page {
  height: 100%;
  .page--tabbar {
    margin: 5px;
    user-select: none;
  }
  .page--router-view {
    overflow: auto;
    border-top: 1px solid #D9D9D9;
  }
}
</style>

<template>
  <div flex="dir:top" class="page">
    <div flex="dir:left main:justify" class="page--tabbar">
      <!-- left -->
      <div style="width: 70px;" flex="main:left">
        <a-button
          size="small"
          icon="folder-open"
          type="primary"
          @click="IPC_DIR_SELECT">
          打开
        </a-button>
      </div>
      <!-- center -->
      <a-radio-group
        size="small"
        :defaultValue="$route.name"
        buttonStyle="solid"
        @change="e => $router.replace({ name: e.target.value })">
        <a-radio-button v-for="type of scanResultDisplayTypesMenu" :key="type.name" :value="type.name">{{type.title}}</a-radio-button>
      </a-radio-group>
      <!-- right -->
      <div style="width: 70px;" flex="main:right">
        <a-button
          size="small"
          icon="setting"
          @click="$router.replace('/setting')">
        </a-button>
      </div>
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
