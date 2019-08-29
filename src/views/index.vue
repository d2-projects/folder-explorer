<template>
  <div>
    <a-button type="primary" @click="onSelectDir">选择目录</a-button>
    <p>{{path}}</p>
  </div>
</template>

<script>
import { IPC_RENDER_DIR_SELECT } from '@/ipc/render.js'
export default {
  data () {
    return {
      path: ''
    }
  },
  methods: {
    onSelectDir () {
      this.path = IPC_RENDER_DIR_SELECT()
    }
  }
}
</script>
