export default {
  data () {
    return {
      note: {
        editing: false,
        currentNote: ''
      }
    }
  },
  methods: {
    noteOnEdit () {
      this.note.currentNote = this.value.note
      this.note.editing = true
      this.$nextTick(() => {
        this.$refs.noteInput.focus()
      })
    },
    noteOnOk ({ note }) {
      if (note !== undefined) {
        this.note.currentNote = note
      }
      this.$emit('note-change', this.note.currentNote)
      this.note.editing = false
    },
    noteOnClear () {
      this.$confirm({
        title: '确认',
        content: '此操作将不可逆地删除列出的所有备注',
        cancelText: '取消',
        okText: '删除',
        okType: 'danger',
        onOk: () => {
          this.$emit('note-clear')
        },
        onCancel: () => {
          this.$message.info('放心，什么都没有发生')
        }
      })
    }
  }
}
