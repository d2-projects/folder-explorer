<style lang="scss" scoped>
#app {
  position: relative;
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
        opacity: isDraging ? '0.1' : '1'
      }">
      <router-view/>
    </div>
    <transition name="fade-scale">
      <div
        v-show="isDraging"
        class="app--layer"
        style="z-index: 101;">
        <draging/>
      </div>
    </transition>
  </div>
</template>

<script>
import reply from './ipc/reply'
export default {
  data () {
    return {
      isDraging: false
    }
  },
  created () {
    reply()
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
      console.log(event.dataTransfer.files)
      this.isDraging = false
    }
    this.$refs.app.onmouseout = event => {
      event.preventDefault()
      this.isDraging = false
    }
  }
}
</script>

<style lang="scss">
html, body, #app, #app {
  height: 100%;
  background-color: transparent;
}
</style>
