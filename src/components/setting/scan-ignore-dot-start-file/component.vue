<template>
  <div class="setting-component">
    <a-switch
      :checked="SETTING.SCAN.IGNORE_DOT_START_FILE"
      @change='onChange'/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'setting-scan-ignore-dot-start-file',
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
        path: 'SCAN.IGNORE_DOT_START_FILE',
        value
      })
    }
  }
}
</script>
