<style lang="scss" scoped>
#app {
  position: relative;
  overflow: hidden;
  user-select: none;
  .app--layer {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
}
</style>

<template>
  <div id="app" ref="app">
    <div 
      class="app--layer"
      style="z-index: 100;"
      :style="{
        opacity: ($route.meta.draggable && isDraging) ? '0.1' : '1'
      }">
      <router-view/>
    </div>
    <transition name="fade-scale">
      <div
        v-show="$route.meta.draggable && isDraging"
        class="app--layer"
        style="z-index: 101;">
        <draging/>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import reply from './ipc/reply'
export default {
  data () {
    return {
      isDraging: false
    }
  },
  created () {
    reply(this)
  },
  mounted () {
    // 处理文件拖拽
    this.$refs.app.ondragenter = event => {
      event.preventDefault()
      this.isDraging = true
    }
    this.$refs.app.ondragover = event => {
      event.preventDefault()
      this.isDraging = true
    }
    this.$refs.app.ondrop = event => {
      event.preventDefault()
      if (this.$route.meta.draggable && event.dataTransfer.files.length > 0) {
        this.SCAN_FOLDER_PATH_UPDATE(event.dataTransfer.files[0].path)
        this.IPC_FOLDER_SCAN()
      }
      this.isDraging = false
    }
    this.$refs.app.onmouseout = event => {
      event.preventDefault()
      this.isDraging = false
    }
  },
  methods: {
    ...mapMutations([
      'SCAN_FOLDER_PATH_UPDATE',
      'IPC_FOLDER_SCAN'
    ])
  }
}
</script>

<style lang="scss">
html, body, #app, #app {
  height: 100%;
  background-color: transparent;
}
</style>
