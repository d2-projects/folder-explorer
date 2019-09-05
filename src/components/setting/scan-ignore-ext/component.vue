<template>
  <div>
    <a-select
      :value="SETTING.SCAN.IGNORE_EXT"
      mode="tags"
      style="width: 100%"
      :tokenSeparators="[',']"
      @change="handleChange">
      <a-select-option v-for="option of SETTING_SCAN_IGNORE_EXT_OPTIONS" :key="option">
        {{option}}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'setting-scan-ignore-ext',
  computed: {
    ...mapState([
      'SETTING'
    ]),
    ...mapGetters([
      'SETTING_SCAN_IGNORE_EXT_OPTIONS'
    ])
  },
  methods: {
    ...mapMutations([
      'SETTING_UPDATE'
    ]),
    handleChange(value) {
      this.SETTING_UPDATE({
        path: 'SCAN.IGNORE_EXT',
        value
      })
    }
  }
}
</script>
