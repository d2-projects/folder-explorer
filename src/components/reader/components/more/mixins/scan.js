import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'SCAN_FOLDER_PATH_UPDATE',
      'IPC_FOLDER_SCAN'
    ]),
    scanFolder () {
      this.SCAN_FOLDER_PATH_UPDATE(this.value.filePathFull)
      this.IPC_FOLDER_SCAN()
    }
  }
}
