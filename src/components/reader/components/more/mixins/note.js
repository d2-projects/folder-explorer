import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      note: {
        editing: false,
        currentNote: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'SCAN_RESULT_FLAT'
    ])
  },
  methods: {
    ...mapMutations([
      'SCAN_RESULT_FLAT_UPDATE_ITEM',
      'SCAN_RESULT_FLAT_NOTE_CLEAR'
    ]),
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
      this.SCAN_RESULT_FLAT_UPDATE_ITEM({
        index: this.index,
        item: {
          ...this.SCAN_RESULT_FLAT[this.index],
          note: this.note.currentNote
        }
      })
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
          this.SCAN_RESULT_FLAT_NOTE_CLEAR()
        },
        onCancel: () => {
          this.$message.info('放心，什么都没有发生')
        }
      })
    }
  }
}
