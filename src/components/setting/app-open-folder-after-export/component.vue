<template>
  <div class="setting-component">
    <a-switch
      :checked="SETTING.APP.OPEN_FOLDER_AFTER_EXPORT"
      @change='onChange'/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'setting-app-open-folder-after-export',
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
        path: 'APP.OPEN_FOLDER_AFTER_EXPORT',
        value
      })
    }
  }
}
</script>
