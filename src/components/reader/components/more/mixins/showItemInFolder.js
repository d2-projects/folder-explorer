import { ipcRenderer } from 'electron'

export default {
  methods: {
    showItemInFolder () {
      ipcRenderer.send('IPC_SHOW_ITEM_IN_FOLDER', {
        itemPath: this.path
      })
    }
  }
}