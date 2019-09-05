<template>
  <div>
    <a-switch :checked="SETTING.SCAN.IGNORE_DOT_START" @change='onChange'/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'setting-scan-ignore-dot-start',
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
        path: 'SCAN.IGNORE_DOT_START',
        value
      })
    }
  }
}
</script>
