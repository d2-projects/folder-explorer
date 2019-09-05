<template>
  <div>
    <a-switch :checked="SETTING.SCAN.IGNORE_FILE" @change='onChange'/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'setting-scan-file',
  computed: {
    ...mapState([
      'SETTING'
    ])
  },
  methods: {
    ...mapMutations([
      'SETTING_UPDATE'
    ]),
    onChange (value) {
      this.SETTING_UPDATE({
        path: 'SCAN.IGNORE_FILE',
        value
      })
    }
  }
}
</script>
