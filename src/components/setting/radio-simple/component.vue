<template>
  <div class="setting-component" flex>
    <a-radio-group
      :value="currentValue"
      @change="onChange"
      buttonStyle="solid">
      <a-radio-button
        v-for="option of options"
        :key="option.value"
        :value="option.value">
        {{ option.label }}
      </a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import get from 'lodash.get'
export default {
  name: 'setting-radio-simple',
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
    },
    options () {
      return get(this.SETTING, `${this.path}_OPTIONS`, [])
    }
  },
  methods: {
    ...mapMutations([
      'SETTING_UPDATE'
    ]),
    onChange (value) {
      this.SETTING_UPDATE({
        path: this.path,
        value: value.target.value
      })
    }
  }
}
</script>
