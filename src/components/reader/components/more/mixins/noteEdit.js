export default {
  data () {
    return {
      noteEdit: {
        editing: false,
        currentNote: ''
      }
    }
  },
  watch: {
    note: {
      handler (value) {
        this.currentNote = value
      },
      immediate: true
    }
  },
  methods: {
    noteEditOnEdit () {
      this.noteEdit.editing = true
      this.$nextTick(() => {
        this.$refs.noteEditInput.focus()
      })
    },
    noteEditOnOk () {
      this.$emit('note-change', this.noteEdit.currentNote)
      this.noteEdit.editing = false
    }
  }
}
