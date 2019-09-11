import { shell } from 'electron'

export default {
  methods: {
    openFileInFolder () {
      shell.showItemInFolder(this.value.filePathFull)
    },
    openFile () {
      shell.openItem(this.value.filePathFull)
    }
  }
}
