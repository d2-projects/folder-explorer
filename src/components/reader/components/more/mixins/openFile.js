import { shell } from 'electron'

export default {
  methods: {
    openFileInFolder () {
      shell.showItemInFolder(this.value.data.filePathFull)
    },
    openFile () {
      shell.openItem(this.value.data.filePathFull)
    }
  }
}
