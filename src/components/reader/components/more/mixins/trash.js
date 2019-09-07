import { shell } from 'electron'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'SETTING'
    ])
  },
  methods: {
    ...mapMutations([
      'IPC_FOLDER_SCAN'
    ]),
    moveItemToTrash () {
      const trash = () => {
        const result = shell.moveItemToTrash(this.value.data.filePathFull)
        if (result) {
          this.IPC_FOLDER_SCAN()
          this.$message.success('已经将文件移动到废纸篓并开始重新扫描')
        } else {
          this.$message.warning('出了点问题')
        }
      }
      if (this.SETTING.APP.DELETE_CONFIRM) {
        this.$confirm({
          title: '确认',
          content: `删除${this.value.data.isFile ? '文件' : '文件夹'} ${this.value.data.base}`,
          cancelText: '取消',
          okText: '删除',
          okType: 'danger',
          onOk: trash,
          onCancel: () => {
            this.$message.info('放心，什么都没有发生')
          }
        })
      } else {
        trash()
      }
    }
  }
}
