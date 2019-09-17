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
      this.$emit('note-clear')
    }
  }
}
