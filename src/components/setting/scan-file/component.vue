<template>
  <div>
    <a-switch :checked="SETTING.SCAN.SCAN_FILE" @change='onChange'/>
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
        path: 'SCAN.SCAN_FILE',
        value
      })
    }
  }
}
</script>
