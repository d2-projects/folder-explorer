export default {
  data () {
    return {
      noteEdit: {
        editing: false,
        currentNote: ''
      }
    }
  },
  methods: {
    noteEditOnEdit () {
      this.noteEdit.currentNote = this.value.note
      this.noteEdit.editing = true
      this.$nextTick(() => {
        this.$refs.noteEditInput.focus()
      })
    },
    noteEditOnOk ({ note }) {
      if (note !== undefined) {
        this.noteEdit.currentNote = note
      }
      this.$emit('note-change', this.noteEdit.currentNote)
      this.noteEdit.editing = false
    }
  }
}
