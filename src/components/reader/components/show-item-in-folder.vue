<template>
  <span
    class="row-info-button"
    flex="main:center cross:center"
    @click="showItemInFolder">
    打开目录
  </span>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  props: {
    path: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    showItemInFolder () {
      ipcRenderer.send('IPC_SHOW_ITEM_IN_FOLDER', {
        itemPath: this.path
      })
    }
  }
}
</script>
