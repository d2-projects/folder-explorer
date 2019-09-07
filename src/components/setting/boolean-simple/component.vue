<template>
  <div class="setting-component">
    <a-switch
      :checked="currentValue"
      @change='onChange'/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import get from 'lodash.get'
export default {
  name: 'setting-boolean-simple',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    ...mapState([
      'SETTING'
    ]),
    currentValue () {
      return get(this.SETTING, this.path, false)
    }
  },
  methods: {
    ...mapMutations([
      'SETTING_UPDATE'
    ]),
    onChange (value) {
      this.SETTING_UPDATE({
        path: this.path,
        value
      })
    }
  }
}
</script>
