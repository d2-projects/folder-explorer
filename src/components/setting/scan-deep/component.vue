<template>
  <div class="setting-component">
    <a-input-number
      :min="0"
      :max="10"
      :value="SETTING.SCAN.DEEP"
      @change="onChange"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'setting-scan-deep',
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
        path: 'SCAN.DEEP',
        value
      })
    }
  }
}
</script>
