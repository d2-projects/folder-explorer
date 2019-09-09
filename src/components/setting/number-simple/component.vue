<template>
  <div class="setting-component">
    <a-input-number
      v-bind="$attrs"
      :value="currentValue"
      @change="onChange"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import get from 'lodash.get'
export default {
  name: 'setting-number-simple',
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
      return get(this.SETTING, this.path, 0)
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
